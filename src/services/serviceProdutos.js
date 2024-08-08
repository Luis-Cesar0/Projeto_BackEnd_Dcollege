
const tabelaProdutos = require("../models/tabelaProdutos")
const resposta = require('../responses')


const getProductID = async (req, res) => {
    const id = req.params.id
    try {
        const produtos = await tabelaProdutos.findByPk(id)
        res.json(produtos)
    }catch(error){
        resposta.badRequest(res, error)
    }
}

const postProduct = async (req, res) => {
    const {enabled, name, slug, use_in_menu, stock, description, price, price_with_discount} = req.body
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