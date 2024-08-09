const tabelaCategoria = require('../models/tabelaCategoria');
const resposta = require('../responses');

// Criar endpoint para obter uma lista de categorias

const getCategorias = async (req, res) => {
    try {
        const categorias = await tabelaCategoria.findAll();
        if(categorias){
            resposta.success(res,categorias)
        }else{
            resposta.notFound(res,'Categorias não encotrada')
        }
    } catch (error) {
        res.json(error);
    }
}

//get por id 

const getCategoriaId = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await tabelaCategoria.findByPk(id);
        if(categoria){
            resposta.success(res,categoria)
        }else{
            resposta.notFound(res,'Categorias não encotrada')
        }
    } catch (error) {
        res.json(error);
    }
}

//post

const postCategoria = async (req, res) => {
    const { name,slug,use_in_menu } = req.body;
    try {
        const categoria = await tabelaCategoria.create({
            name: name,
            slug: slug,
            use_in_menu: use_in_menu,

        });
        if(categoria){
            resposta.created(res,categoria)
        }else{
            resposta.badRequest(res,'Categorias não encotrada')
        }
    } catch (error) {
        res.json(error);
    }
}

//put

const putCategoria = async (req, res) => {
    const id = req.params.id;
    const { name,slug,use_in_menu } = req.body;
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
        if(AttCategoria){
            resposta.noContent(res)
        }else{
            //falta o token para o 401
            resposta.notFound(res,AttUsuario)
        }
    } catch (error) {
        res.json(error) 
    }
}

const deleteCategoria = async (req, res) => {
    const id = req.params.id;
    try {
            const categoriaDelet = await tabelaCategoria.destroy({
                where: {
                    id:id
                }
            });
            if(categoriaDelet){
                resposta.noContent(res)
            }else{
                //falta 0 token para o 401
                resposta.notFound(res,`categoria com id= ${id} não foi encotrado`)
            }
    } catch (error) {
        res.json(error) 
    }
}

module.exports = {
    getCategorias,
    getCategoriaId,
    postCategoria,
    putCategoria,
    deleteCategoria
}