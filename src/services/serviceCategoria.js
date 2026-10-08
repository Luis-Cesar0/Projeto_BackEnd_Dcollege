const Categories = require('../models/tabelaCategoria');

const publicFields = ['id', 'name', 'slug', 'use_in_menu'];

const getCategorias = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields, use_in_menu } = req.query;
    const where = use_in_menu === undefined ? {} : { use_in_menu: use_in_menu === 'true' };
    const requestedFields = fields
      ? fields.split(',').filter((field) => publicFields.includes(field))
      : publicFields;
    if (requestedFields.length === 0) {
      return res.status(400).json({ statusCode: 400, message: 'Campos inválidos.' });
    }
    const queryLimit = Number(limit) === -1 ? null : Number(limit);
    const queryPage = Number(page);
    const [total, categories] = await Promise.all([
      Categories.count({ where }),
      Categories.findAll({
        where,
        limit: queryLimit,
        offset: queryLimit === null ? 0 : queryLimit * (queryPage - 1),
        attributes: requestedFields,
      }),
    ]);

    return res.status(200).json({ data: categories, total, limit: queryLimit, page: queryPage });
  } catch {
    return res.status(500).json({ statusCode: 500, message: 'Não foi possível consultar categorias.' });
  }
};

const getCategoriaId = async (req, res) => {
  try {
    const categoria = await Categories.findByPk(req.params.id, { attributes: publicFields });
    if (!categoria) return res.status(404).json({ error: 'Categoria inexistente.' });
    return res.status(200).json(categoria);
  } catch {
    return res.status(500).json({ statusCode: 500, message: 'Não foi possível consultar a categoria.' });
  }
};

const postCategoria = async (req, res) => {
  try {
    const newCategory = await Categories.create(req.body);
    return res.status(201).json({
      statusCode: 201,
      name: newCategory.name,
      slug: newCategory.slug,
      use_in_menu: newCategory.use_in_menu,
    });
  } catch {
    return res.status(500).json({ statusCode: 500, message: 'Não foi possível criar a categoria.' });
  }
};

const putCategoria = async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id);
    if (!category) return res.status(404).json({ statusCode: 404, message: 'Categoria não encontrada.' });
    await category.update(req.body);
    return res.status(200).json({
      statusCode: 200,
      message: 'Categoria atualizada com sucesso',
      data: { id: category.id, name: category.name, slug: category.slug, use_in_menu: category.use_in_menu },
    });
  } catch {
    return res.status(500).json({ statusCode: 500, message: 'Não foi possível atualizar a categoria.' });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const deleted = await Categories.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ statusCode: 404, message: 'Categoria não encontrada.' });
    return res.status(200).json({ statusCode: 200, message: 'Categoria deletada com sucesso' });
  } catch {
    return res.status(500).json({ statusCode: 500, message: 'Não foi possível remover a categoria.' });
  }
};

module.exports = { getCategorias, getCategoriaId, postCategoria, putCategoria, deleteCategoria };
