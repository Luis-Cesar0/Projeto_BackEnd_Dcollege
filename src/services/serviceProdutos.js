
const { map } = require("../app")
const tabelaProdutos = require("../models/tabelaProdutos")
const resposta = require('../responses')


const getProductID = async (req, res) => {
    const id = req.params.id
    try {
        const produtos = await tabelaProdutos.findByPk(id)
        if (!produtos) {
            return resposta.notFound(res,'Produto não encontrado!')
        }

        resposta.success(res, 'Produto encontrado!', produtos)

    }catch(error){
        resposta.InternalServerError(res, 'Ocorreu um erro na procura do produto!')
    }
}

const postProduct = async (req, res) => {
    const {enabled, name, slug, use_in_menu, stock, description, price, price_with_discount} = req.body
    const obrigatorios = {name, slug, price, price_with_discount}

    const camposFaltando = Object.keys(obrigatorios).filter(key => !obrigatorios[key]);

    if (!name || !slug || !price || !price_with_discount) {
        return resposta.badRequest(res, 'Há campos obrigatórios não preenchidos!', `Campos faltando: ${camposFaltando.join(', ')}`
        )
    }

    try {
        const createProdutos = await tabelaProdutos.create({
            enabled: enabled,
            name: name,
            slug: slug,
            use_in_menu: use_in_menu,
            stock: stock,
            description: description,
            price: price,
            price_with_discount: price_with_discount
        })
        res.json(createProdutos)
    }catch(error){
        resposta.badRequest(res, error)
    }
}

module.exports = {
    getProductID,
    postProduct
};