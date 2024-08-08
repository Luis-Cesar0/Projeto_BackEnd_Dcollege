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
    const { name, slug } = req.body.categoria; 
    try {
        const novaCategoria = await tabelaCategoria.create({
            name,
            slug
        });
        res.json(novaCategoria);
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

const deleteCategoria = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await tabelaCategoria.findByPk(id);
        if (!categoria) {
            resposta.notFound(res, 'Categoria não encontrada');
        } else {
            await tabelaCategoria.destroy({
                where: {
                    id
                }
            });
            resposta.success(res, 'Categoria deletada com sucesso');
        }
    } catch (error) {
        resposta.badRequest(res, error);
    }
}

module.exports = {
    getCategorias,
    getCategoriaId,
    postCategoria,
    putCategoria,
    deleteCategoria
}