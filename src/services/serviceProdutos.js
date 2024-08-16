
const { Op } = require('sequelize')
const { map, options } = require("../app")
const tabelaProdutos = require("../models/tabelaProdutos")
const { query } = require("../config/conexao")
const usuario = require('../models/tabelaUsuarios')
const Categoria = require('../models/tabelaCategoria')
const respostas = require('../responses')

const getProductID = async (req, res) => {
    const id = req.params.id
    try {
        const produtos = await tabelaProdutos.findByPk(id)
        if (!produtos) {
            return respostas.notFound(res, 'Produto não encontrado!')
        }

        respostas.success(res, 'Produto encontrado!', produtos)

    } catch (error) {
        respostas.InternalServerError(res, 'Ocorreu um erro na procura do produto!')
    }
}

const postProduct = async (req, res) => {
   

    try {

        const product = await tabelaProdutos.create({
            include: [
                {
                    model: Categoria,
                    attributes: ['id', 'nome', 'slug', 'use_in_menu']
                },
                {
                    model: tabelaProdutos,
                    attributes: ['id', 'enabled', 'name', 'slug', 'use_in_menu', 'stock', 'description', 'price', 'price_with_discount']
                },
                {
                    model: usuario,
                    attributes: ['id', 'firstname', 'surname', 'email', 'password']
                }
            ]
        });

        if (!product) {
            return respostas.badRequest(res, 'Produto não encontrado!');
        }
        respostas.created(res, 'Produto criado com sucesso!')

    } catch (error) {
        respostas.badRequest(res, 'Ocorreu um erro na criação do Produto')
    }
}

const putProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await tabelaProdutos.update({
            include: [
                {
                    model: tabelaProdutos,
                    attributes: ['id', 'enabled', 'name', 'slug', 'use_in_menu', 'stock', 'description', 'price', 'price_with_discount']
                },
                {
                    model: Categoria,
                    attributes: ['id', 'nome', 'slug', 'use_in_menu']
                },

                {
                    model: usuario,
                    attributes: ['id', 'firstname', 'surname', 'email', 'password']
                },
                { where: { id: id } }
            ]
        });

        if (!product) {
            return respostas.notFound(res, 'Produto não encontrado');
        }


    } catch (error) {
        respostas.InternalServerError(res, 'Ocorreu um erro na atulização de produtos')
    }

}

const deleteProdutos = async (req, res) => {
    const id = req.params.id
    try {
        const produtos = await tabelaProdutos.destroy({ where: { id: id } })
        if (!produtos) return respostas.notFound(res, `Produto com o id=${id} não foi encontrado`)

        respostas.noContent(res)
    } catch (error) {
        respostas.InternalServerError(res, 'Ocorreu um erro na remoção do produto')
    }

}

module.exports = {
    getProduct,
    getProductID,
    postProduct,
    putProduct,
    deleteProdutos
};