const { Op } = require('sequelize');
const app = require("../app");
const respostas = require('../responses');
const tabelaProdutos = require('../models/tabelaProdutos');
const imagensProduto = require('../models/imagensProduto');
const opcoesProduto = require('../models/opcoesProduto');

const getProduct = async (req, res) => {
    try {
        const { limit = 12, page = 1, fields, match, category_ids, price_range, option = {} } = req.query;
        if(isNaN(Number(limit))){
           return respostas.badRequest(res,'limit aceita apensa numeros')
        }
        let queryOptions = {
            include: [
                {
                    model: opcoesProduto,
                    as: 'opcoesProduto'
                },
                {
                    model: imagensProduto,
                    as: 'imagensProdutos',
                    required: false
                }
            ]
        };
        let where = {};

        let queryLimit = parseInt(limit);
        if (queryLimit === -1) {
            queryLimit = null;
        } else if (isNaN(queryLimit) || queryLimit <= 0) {
            queryLimit = 12;
        }

        const queryOffset = queryLimit && queryLimit !== -1 ? (parseInt(page) - 1) * queryLimit : null;

        if (fields) {
            queryOptions.attributes = fields.split(',');
        }

        if (category_ids) {
            const categoryIdsArray = category_ids.split(',').map(id => parseInt(id));
            where.category_ids = { [Op.in]: categoryIdsArray };
        }

        if (price_range) {
            const [minPrice, maxPrice] = price_range.split('-').map(price => parseFloat(price));
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                where.price = { [Op.between]: [minPrice, maxPrice] };
            }
        }

        if (match) {
            where[Op.or] = [
                { name: { [Op.like]: `%${match}%` } },
                { description: { [Op.like]: `%${match}%` } },
            ];
        }

        if (Object.keys(option).length > 0) {
            const optionFilters = [];
            for (const [key, value] of Object.entries(option)) {
                const valuesArray = value.split(',');
                optionFilters.push({
                    [`options.${key}`]: { [Op.in]: valuesArray }
                });
            }
            where[Op.and] = optionFilters;
        }

        queryOptions.where = where;
        queryOptions.limit = queryLimit;
        queryOptions.offset = queryOffset;

        // Executando a consulta
        const produtos = await tabelaProdutos.findAll(queryOptions);

        if (produtos.length === 0) {
            return respostas.notFound(res, 'Nenhum produto encontrado!');
        }

        // Formatando a resposta
        const formattedResponse = {
            data: produtos.map(produto => ({
                id: produto.id,
                enabled: produto.enabled,
                name: produto.name,
                slug: produto.slug,
                stock: produto.stock,
                description: produto.description,
                price: produto.price,
                price_with_discount: produto.price_with_discount,
                category_ids: produto.category_ids,
                images: produto.imagensProdutos.map(image => ({
                    id: image.id,
                    content: image.path
                })),
                options: produto.opcoesProduto.map(option => ({
                    id: option.id,
                    title: option.title,
                    shape: option.shape,
                    radius: option.radius,
                    type: option.type,
                    values: option.values
                }))
            })),
            total: produtos.length,
            limit: queryLimit,
            page: parseInt(page)
        };

        return respostas.success(res, 'Produtos encontrados!', formattedResponse);

    } catch (error) {
        return respostas.InternalServerError(res, 'Ocorreu um erro ao buscar os produtos!');
    }
}

const getProductID = async (req, res) => {
    try {
        const { id } = req.params;

        const queryOptions = {
            include: [
                {
                    model: opcoesProduto,
                    as: 'opcoesProduto'
                },
                {
                    model: imagensProduto,
                    as: 'imagensProdutos',
                    required: false
                }
            ]
        };

        // Executando a consulta
        const produto = await tabelaProdutos.findByPk(id, queryOptions);

        if (!produto) {
            return respostas.notFound(res, 'Produto não encontrado!');
        }

        // Formatando a resposta
        const formattedResponse = {
            id: produto.id,
            enabled: produto.enabled,
            name: produto.name,
            slug: produto.slug,
            stock: produto.stock,
            description: produto.description,
            price: produto.price,
            price_with_discount: produto.price_with_discount,
            category_ids: produto.category_ids,
            images: produto.imagensProdutos.map(image => ({
                id: image.id,
                content: image.path
            })),
            options: produto.opcoesProduto.map(option => ({
                id: option.id,
                title: option.title,
                shape: option.shape,
                radius: option.radius,
                type: option.type,
                values: option.values
            }))
        };

        return respostas.success(res, 'Produto encontrado!', formattedResponse);

    } catch (error) {
        return respostas.InternalServerError(res, 'Ocorreu um erro ao buscar o produto!');
    }
}

const postProduct = async (req, res) => {
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
    const obrigatorios = { name, slug, price, price_with_discount };

    // Verifica campos obrigatórios
    const camposFaltando = Object.keys(obrigatorios).filter(key => !obrigatorios[key]);
    if (camposFaltando.length > 0) {
        return respostas.badRequest(res, 'Há campos obrigatórios não preenchidos!');
    }

    try {
        // Cria o produto principal
        const createProduto = await tabelaProdutos.create({
            enabled,
            name,
            slug,
            use_in_menu,
            stock,
            description,
            price,
            price_with_discount,
            category_ids: JSON.stringify(category_ids)
        });
        
        console.log('Produto criado com sucesso:', createProduto);

        // Cria as imagens relacionadas
        if (images && images.length > 0) {
            const imagensData = images.map(image => ({
                product_id: createProduto.id,
                path: image.content,
                enabled: true
            }));
            await imagensProduto.bulkCreate(imagensData);
            console.log('Imagens criadas com sucesso:', imagensData);
        }

        // Cria as opções relacionadas
        if (options && options.length > 0) {
            const opcoesData = options.map(option => ({
                produtos_id: createProduto.id,
                title: option.title,
                shape: option.shape,
                radius: option.radius ? parseFloat(option.radius) : null,
                type: option.type,
                values: JSON.stringify(option.values || [])
            }));
            await opcoesProduto.bulkCreate(opcoesData);
            console.log('Opções criadas com sucesso:', opcoesData);
        }

        return respostas.created(res, 'Produto criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        return respostas.badRequest(res, 'Ocorreu um erro na criação do produto.');
    }
};


const putProduct = async (req, res) => {
    const id = req.params.id;
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

    // Verifica se pelo menos um campo foi preenchido
    if (!enabled && !name && !slug && !use_in_menu && !stock && !description && !price && !price_with_discount && !category_ids && !images && !options) {
        return respostas.badRequest(res, 'Pelo menos um campo deve ser preenchido para atualizar o produto.');
    }

    try {
        const usuario = await tabelaProdutos.findByPk(id)
        if(!usuario) return respostas.notFound(res,'Produto não encotrado')


        await tabelaProdutos.update(
            {
                enabled,
                name,
                slug,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount
            },
            { where: { id: id } }
        );

        if (images && images.length > 0) {
            await Promise.all(images.map(async (img) => {
                if (img.id) {
                    await imagensProduto.update(
                        {
                            enabled: img.deleted,
                            path: img.content
                        },
                        { where: { id: img.id } }
                    );
                } else {
                    console.log('ID da imagem não fornecido:', img);
                }
            }));
        }

        if (options && options.length > 0) {
            await Promise.all(options.map(async (opt) => {
                if (opt.id) {
                    const radius = isNaN(opt.radius) ? 0 : opt.radius;
                    await opcoesProduto.update(
                        {
                            title: opt.title,
                            shape: opt.shape,
                            radius: radius,
                            type: opt.type,
                            values: opt.values
                        },
                        { where: { id: opt.id } }
                    );
                } else {
                    console.log('ID da opção não fornecido:', opt);
                }
            }));
        }

        return respostas.success(res, 'Produto atualizado com sucesso!');
    } catch (error) {
        
        return respostas.InternalServerError(res, 'Ocorreu um erro na atualização do produto.');
    }
};

const deleteProdutos = async (req, res) => {
    const id = req.params.id;

    if (!id) {
       
        return respostas.badRequest(res, 'ID do produto não fornecido.');
    }

    try {
        // Código de exclusão
        await opcoesProduto.destroy({ where: { produtos_id: id } });
        await imagensProduto.destroy({ where: { product_id: id } });

        // Finalmente, exclua o produto
        const produto = await tabelaProdutos.destroy({ where: { id: id } });

        if (!produto) {
            return respostas.notFound(res, `Produto com o id=${id} não foi encontrado.`);
        }

        return respostas.noContent(res);
    } catch (error) {
        
        return respostas.InternalServerError(res, 'Ocorreu um erro na remoção do produto.');
    }
};

module.exports = {
    getProduct,
    getProductID,
    postProduct,
    putProduct,
    deleteProdutos
};
