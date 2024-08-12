
const { map } = require("../app")
const tabelaProdutos = require("../models/tabelaProdutos")
const resposta = require('../responses')
const produtos = require("../models/tabelaProdutos")



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
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount } = req.body
    const obrigatorios = { name, slug, price, price_with_discount }

    const camposFaltando = Object.keys(obrigatorios).filter(key => !obrigatorios[key]);

    if (!name || !slug || !price || !price_with_discount) {
        return resposta.badRequest(res, `Há campos obrigatórios não preenchidos! Campos faltando: ${camposFaltando.join(', ')}`
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
        resposta.created(res, 'Produto criado com sucesso!')
    } catch (error) {
        resposta.badRequest(res, 'Ocorreu um erro na criação do Produto')
    }
}

const putProduct = async (req, res) => {
    const id = req.params.id
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, images, options } = req.body
    const obrigatorios = { name, slug, price, price_with_discount }
    const camposFaltando = Object.keys(obrigatorios).filter(key => !obrigatorios[key]);
    if (!name || !slug || !price || !price_with_discount) {
        return resposta.badRequest(res, `Há campos obrigatórios não preenchidos! Campos faltando: ${camposFaltando.join(', ')}`
        )
    }
    try {
        const produtoAtualizado = await tabelaProdutos.update({
            enabled,
            name,
            slug,
            use_in_menu,
            stock,
            description,
            price,
            price_with_discount,
            images,
            options
        },
        {where:{id:id}}
    );  
    if(!AttUsuario)  return resposta.notFound(res,'Produto não encontrado')
        resposta.noContent(res)
    
        return resposta.success(res, produtoAtualizado);
    }catch(error){
        resposta.InternalServerError(res,'Ocorreu um erro na atulização de produtos')
    }
    
}
const deleteProdutos = async(req,res) => {
    const id = req.params.id
    try{
        const produtos = await tabelaProdutos.destroy({where:{id:id}})
        if(!produtos) return resposta.notFound(res, `Produto com o id=${id} não foi encontrado`)
           
         resposta.noContent(res) 
        }catch(error){
            resposta.InternalServerError(res,'Ocorreu um erro na remoção do produto')
        }
}



module.exports = {
    getProductID,
    postProduct,
    putProduct,
    deleteProdutos
};