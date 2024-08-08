const tabelaCategoria = require('../models/tabelaCategoria');
const resposta = require('../responses');

// Criar endpoint para obter uma lista de categorias

const getCategorias = async (req, res) => {
    try {
        const categorias = await tabelaCategoria.findAll();
        res.json(categorias);
    } catch (error) {
        resposta.badRequest(res, error);
    }
}

//get por id 

const getCategoriaId = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await tabelaCategoria.findByPk(id);
        res.json(categoria);
    } catch (error) {
        resposta.badRequest(res, error);
    }
}

//post

const postCategoria = async (req, res) => {
    const { categoria } = req.body;
    try {
        const categoria = await tabelaCategoria.create({
            categoria
        });
        res.json(categoria);
    } catch (error) {
        resposta.badRequest(res, error);
    }
}

//put

const putCategoria = async (req, res) => {
    const id = req.params.id;
    const { categoria } = req.body;
    try {
        await tabelaCategoria.update({
            categoria
        }, {
            where: {
                id
            }
        });
        res.json({ message: `Categoria ${categoria} atualizada com sucesso` });
    } catch (error) {
        resposta.badRequest(res, error);
    }
}

module.exports = {
    getCategorias,
    getCategoriaId,
    postCategoria,
    putCategoria
}