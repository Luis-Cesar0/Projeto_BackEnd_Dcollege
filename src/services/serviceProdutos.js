const { Op, fn, col, where: sqlWhere } = require('sequelize');
const sequelize = require('../config/conexao');
const respostas = require('../responses');
const tabelaProdutos = require('../models/tabelaProdutos');
const imagensProduto = require('../models/imagensProduto');
const opcoesProduto = require('../models/opcoesProduto');

const includeDetails = [
  { model: opcoesProduto, as: 'opcoesProduto', required: false },
  { model: imagensProduto, as: 'imagensProdutos', required: false },
];

function parseCategoryIds(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function serializeProduct(product) {
  return {
    id: product.id,
    enabled: product.enabled,
    name: product.name,
    slug: product.slug,
    use_in_menu: product.use_in_menu,
    stock: product.stock,
    description: product.description,
    price: product.price,
    price_with_discount: product.price_with_discount,
    category_ids: parseCategoryIds(product.category_ids),
    images: (product.imagensProdutos || []).filter((image) => image.enabled).map((image) => ({ id: image.id, content: image.path })),
    options: (product.opcoesProduto || []).map((option) => ({
      id: option.id,
      title: option.title,
      shape: option.shape,
      radius: option.radius,
      type: option.type,
      values: option.values,
    })),
  };
}

const getProduct = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields, match, category_ids, price_range, option = {} } = req.query;
    const queryLimit = Number(limit) === -1 ? null : Number(limit);
    const where = {};
    if (category_ids) {
      const categoryClauses = category_ids.split(',').map((id) => sqlWhere(
        fn('JSON_CONTAINS', col('category_ids'), JSON.stringify(Number(id))),
        1,
      ));
      where[Op.and] = [...(where[Op.and] || []), { [Op.or]: categoryClauses }];
    }
    if (price_range) {
      const [minPrice, maxPrice] = price_range.split('-').map(Number);
      where.price = { [Op.between]: [minPrice, maxPrice] };
    }
    if (match) {
      where[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } },
      ];
    }

    const includes = includeDetails.map((include) => ({ ...include }));
    const optionFilters = Object.entries(option);
    if (optionFilters.length) {
      const matchingProductSets = await Promise.all(optionFilters.map(async ([title, value]) => {
        const rows = await opcoesProduto.findAll({
          attributes: ['produtos_id'],
          where: { title, values: { [Op.like]: `%${value}%` } },
        });
        return new Set(rows.map((row) => row.produtos_id));
      }));
      const matchingIds = [...matchingProductSets[0]].filter((id) => matchingProductSets.every((set) => set.has(id)));
      where.id = { [Op.in]: matchingIds };
    }

    const attributes = fields
      ? [...new Set(['id', ...fields.split(',').filter((field) => Object.hasOwn(tabelaProdutos.rawAttributes, field))])]
      : undefined;
    if (fields && (!attributes || attributes.length === 0)) {
      return respostas.badRequest(res, 'Campos de produto inválidos.');
    }

    const result = await tabelaProdutos.findAndCountAll({
      where,
      include: includes,
      distinct: true,
      attributes,
      limit: queryLimit,
      offset: queryLimit === null ? 0 : queryLimit * (Number(page) - 1),
      order: [['id', 'ASC']],
    });
    const total = Array.isArray(result.count) ? result.count.length : result.count;
    return respostas.success(res, 'Produtos encontrados!', {
      data: result.rows.map(serializeProduct),
      total,
      limit: queryLimit,
      page: Number(page),
    });
  } catch {
    return respostas.InternalServerError(res, 'Ocorreu um erro ao buscar os produtos.');
  }
};

const getProductID = async (req, res) => {
  try {
    const produto = await tabelaProdutos.findByPk(req.params.id, { include: includeDetails });
    if (!produto) return respostas.notFound(res, 'Produto não encontrado!');
    return respostas.success(res, 'Produto encontrado!', serializeProduct(produto));
  } catch {
    return respostas.InternalServerError(res, 'Ocorreu um erro ao buscar o produto.');
  }
};

const postProduct = async (req, res) => {
  const { images = [], options = [], ...productData } = req.body;
  try {
    await sequelize.transaction(async (transaction) => {
      const product = await tabelaProdutos.create({
        ...productData,
        category_ids: productData.category_ids || [],
      }, { transaction });

      if (images.length) {
        await imagensProduto.bulkCreate(images.map((image) => ({
          product_id: product.id,
          path: image.content,
          enabled: true,
        })), { transaction });
      }
      if (options.length) {
        await opcoesProduto.bulkCreate(options.map((option) => ({
          produtos_id: product.id,
          title: option.title,
          shape: option.shape,
          radius: option.radius === undefined ? 0 : Number.parseInt(option.radius, 10),
          type: option.type,
          values: JSON.stringify(option.values || []),
        })), { transaction });
      }
    });
    return respostas.created(res, 'Produto criado com sucesso!');
  } catch {
    return respostas.InternalServerError(res, 'Ocorreu um erro na criação do produto.');
  }
};

const putProduct = async (req, res) => {
  const { images, options, category_ids, ...productFields } = req.body;
  const id = req.params.id;
  try {
    const product = await tabelaProdutos.findByPk(id);
    if (!product) return respostas.notFound(res, 'Produto não encontrado.');

    await sequelize.transaction(async (transaction) => {
      const updates = { ...productFields };
      if (category_ids !== undefined) updates.category_ids = category_ids;
      if (Object.keys(updates).length) await product.update(updates, { transaction });

      for (const image of images || []) {
        if (image.id) {
          const values = {};
          if (image.deleted !== undefined) values.enabled = !image.deleted;
          if (image.content !== undefined) values.path = image.content;
          if (Object.keys(values).length) {
            await imagensProduto.update(values, { where: { id: image.id, product_id: id }, transaction });
          }
        } else {
          await imagensProduto.create({ product_id: id, path: image.content, enabled: true }, { transaction });
        }
      }

      for (const option of options || []) {
        const values = {
          title: option.title,
          shape: option.shape,
          radius: option.radius === undefined ? undefined : Number.parseInt(option.radius, 10),
          type: option.type,
          values: option.values === undefined ? undefined : JSON.stringify(option.values),
        };
        Object.keys(values).forEach((key) => values[key] === undefined && delete values[key]);
        if (option.id) {
          await opcoesProduto.update(values, { where: { id: option.id, produtos_id: id }, transaction });
        } else {
          await opcoesProduto.create({ ...values, produtos_id: id }, { transaction });
        }
      }
    });
    return respostas.success(res, 'Produto atualizado com sucesso!');
  } catch {
    return respostas.InternalServerError(res, 'Ocorreu um erro na atualização do produto.');
  }
};

const deleteProdutos = async (req, res) => {
  try {
    const deleted = await sequelize.transaction(async (transaction) => {
      const product = await tabelaProdutos.findByPk(req.params.id, { transaction });
      if (!product) return false;
      await opcoesProduto.destroy({ where: { produtos_id: req.params.id }, transaction });
      await imagensProduto.destroy({ where: { product_id: req.params.id }, transaction });
      await product.destroy({ transaction });
      return true;
    });
    if (!deleted) return respostas.notFound(res, `Produto com o id=${req.params.id} não foi encontrado.`);
    return respostas.noContent(res);
  } catch {
    return respostas.InternalServerError(res, 'Ocorreu um erro na remoção do produto.');
  }
};

module.exports = { getProduct, getProductID, postProduct, putProduct, deleteProdutos };
