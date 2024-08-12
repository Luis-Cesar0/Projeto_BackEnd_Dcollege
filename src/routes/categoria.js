
const express=require('express');
const {getCategorias, getCategoriaId, postCategoria, putCategoria, deleteCategoria} = require('../controllers/controllerCategoria');
const authorization = require('../middleware/authentication')
const categoriaRoutes = express.Router()

categoriaRoutes.get('/',getCategorias)
categoriaRoutes.get('/:id',getCategoriaId)
categoriaRoutes.post('/',authorization ,postCategoria)
categoriaRoutes.put('/:id', authorization ,putCategoria)


categoriaRoutes.delete('/:id',authorization,(req,res)=>{
    deleteCategoria(req,res)
})

module.exports= categoriaRoutes

