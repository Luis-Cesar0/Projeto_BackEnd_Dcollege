const categorias = require('../models/tabelaCategoria');
const categoriaService = require('../services/serviceCategoria');

const getCategorias  =(req,res) =>{
    categoriaService.getCategorias(req,res,categorias)
}

const getCategoriaId =(req,res) =>{
    categoriaService.getCategoriaId(req,res,categorias)
}

const postCategoria =(req,res) =>{
    categoriaService.postCategoria(req,res,categorias)
}

const putCategoria =(req,res) =>{
    categoriaService.putCategoria(req,res,categorias)
}

const deleteCategoria = (req,res) =>{
    categoriaService.deleteCategoria(req,res,categorias)
}






module.exports = {
    getCategorias,
    getCategoriaId,
    postCategoria,
    putCategoria,
    deleteCategoria
}