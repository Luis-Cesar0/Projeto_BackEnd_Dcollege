const tabelaCategoria = require('../models/tabelaCategoria');
const resposta = require('../responses');


const getCategorias = async (req, res) => {
    try {
        const categorias = await tabelaCategoria.findAll();
        if(!categorias) return resposta.badRequest(res,'campo vazio')

        resposta.success(res,'Categorias encontradas',categorias)
            
    } catch (error) {
        resposta.InternalServerError(res,'Ocorreu um erro ao procura as categorias')
    }
}

const getCategoriaId = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await tabelaCategoria.findByPk(id);
        if(!categoria) return resposta.notFound(res,'Categorias não encotrada')

        resposta.success(res,'Categoria encontrada',categoria)
            
    } catch (error) {
        resposta.InternalServerError(res,'Ocorreu um erro ao procura a categoria')
    }
}

//post

const postCategoria = async (req, res) => {
    const { name,slug,use_in_menu } = req.body;
    if(!name || !slug|| !use_in_menu) return resposta.badRequest(res,'Categorias não encotrada')
    try {
        const novaCategoria = await tabelaCategoria.create({
            name: name,
            slug: slug,
            use_in_menu: use_in_menu,
        });

        resposta.success(res,'Categoria cadastrada com sucesso',categoria)
            
    } catch (error) {
        resposta.InternalServerError(res,'Ocorreu um erro na criação de uma nova categoria')
    }
}

//put

const putCategoria = async (req, res) => {
    const id = req.params.id;
    const { name, slug, use_in_menu } = req.body;
        //FALTA O TOKEN PARA O 401

    try {
        const AttCategoria = await tabelaCategoria.update({
            name: name,
            slug: slug,
            use_in_menu: use_in_menu,
            
        }, {
            where: {
                id:id
            }
        });
        if(AttCategoria) return resposta.notFound(res,'Categoria não encontrada')
        resposta.noContent(res)
            //falta o token para o 401

    } catch (error) {
        resposta.InternalServerError(res,'Ocorreu um erro na atuaçozação da categoria')
    }
}

const deleteCategoria = async (req, res) => {
    const id = req.params.id;
    //FALTA O TOKEN PARA O 401
    try {
            const categoriaDelet = await tabelaCategoria.destroy({
                where: {
                    id:id
                }
            });
            if(categoriaDelet) return resposta.notFound(res,`categoria com id= ${id} não foi encotrado`)
            resposta.noContent(res)
 
                //falta 0 token para o 401

    } catch (error) {
        resposta.InternalServerError(res,'Ocorreu um erro na exclusão da categoria categoria')
    }
}

module.exports = {
    getCategorias,
    getCategoriaId,
    postCategoria,
    putCategoria,
    deleteCategoria
}