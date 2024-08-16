
const { Op } = require('sequelize')
const { map, options } = require("../app")
const tabelaProdutos = require("../models/tabelaProdutos")
const { query } = require("../config/conexao")
const usuario = require('../models/tabelaUsuarios')
const Categoria = require('../models/tabelaCategoria')
const respostas = require('../responses')

const getProduct = async (req, res) => {
    try {
        const { limit = 12, page = 1, fields, match, category_ids, price_range, option = {} } = req.query;

        let queryOptions = {};
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
            return respostas.notFound(res, 'Nenhum produto encontrado!')
        }

        return respostas.success(res, 'Produtos encontrados!', produtos);

    } catch (error) {
        respostas.InternalServerError(res, 'Ocorreu um erro ao buscar os produtos!')
    }

}



const getProductID = async (req, res) => {
    const id = req.params.id
    try {
        const produtos = await tabelaProdutos.findByPk(id)
        if (!produtos) {
            return resposta.notFound(res, 'Produto não encontrado!')
        }

        resposta.success(res, 'Produto encontrado!', produtos)

    } catch (error) {
        resposta.InternalServerError(res, 'Ocorreu um erro na procura do produto!')
    }
}

const postProduct = async (req, res) => {
    const id = req.params.id;

    try {
        
        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Categoria,
                    attributes: ['id', 'nome', 'slug', 'use_in_menu'] 
                },
                {
                    model: produtos, 
                    attributes: ['id', 'enabled', 'name', 'slug', 'use_in_menu', 'stock', 'description', 'price', 'price_with_discount' ] 
                },
                {
                    model: usuario, 
                    attributes: ['id', 'firstname', 'surname', 'email', 'password' ] 
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
    const camposFaltando = Object.keys(obrigatorios).filter(key => !obrigatorios[key]);

    if (!name || !slug || !price || !price_with_discount) {
        return resposta.badRequest(res, `Há campos obrigatórios não preenchidos! Campos faltando: ${camposFaltando.join(', ')}`
        )
    }
    // Fazer consts para retornar o conteúdo dentro de "images" e "options"


    try {
        const createProdutos = await tabelaProdutos.create({
            enabled: enabled,
            name: name,
            slug: slug,
            use_in_menu: use_in_menu,
            stock: stock,
            description: description,
            price: price,
            price_with_discount: price_with_discount,
            // Adaptar images e options para informar o conteúdo dentro deles
            images: images,
            options: options


        })
        resposta.created(res, 'Produto criado com sucesso!')
    } catch (error) {
        resposta.badRequest(res, 'Ocorreu um erro na criação do Produto')
    }
}

const putProduct = async (req, res) => {
    const id = req.params.id;

    try {
        
        const product = await product.findByPk(id, {
            include: [
                {
                    model: Categoria,
                    attributes: ['id', 'nome', 'slug', 'use_in_menu'] 
                },
                {
                    model: produtos, 
                    attributes: ['id', 'enabled', 'name', 'slug', 'use_in_menu', 'stock', 'description', 'price', 'price_with_discount' ] 
                },
                {
                    model: usuario, 
                    attributes: ['id', 'firstname', 'surname', 'email', 'password' ] 
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

    const camposFaltando = Object.keys(obrigatorios).filter(key => !obrigatorios[key]);
    if (!name || !slug || !price || !price_with_discount) {
        return resposta.badRequest(res, `Há campos obrigatórios não preenchidos! Campos faltando: ${camposFaltando.join(', ')}`
        )
    }
    try {
        const produtoAtualizado = await tabelaProdutos.update({
            // testar o putProduct no app.js, utilizando o postman ou qualquer um que funcione como o postman

        },
            { where: { id: id } }
        );
        if (!AttUsuario) return resposta.notFound(res, 'Produto não encontrado')
        resposta.noContent(res)

        return resposta.success(res, produtoAtualizado);
    } catch (error) {
        resposta.InternalServerError(res, 'Ocorreu um erro na atulização de produtos')
    }

}

const deleteProdutos = async (req, res) => {
    const id = req.params.id
    try {
        const produtos = await tabelaProdutos.destroy({ where: { id: id } })
        if (!produtos) return resposta.notFound(res, `Produto com o id=${id} não foi encontrado`)

        resposta.noContent(res)
    } catch (error) {
        resposta.InternalServerError(res, 'Ocorreu um erro na remoção do produto')
        
    }
    
}





module.exports = {
    getProductID,
    postProduct,
    putProduct,
    deleteProdutos
};}}
