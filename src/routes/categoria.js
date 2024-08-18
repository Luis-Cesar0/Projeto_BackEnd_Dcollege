
const express=require('express');
const {getCategorias, getCategoriaId, postCategoria, putCategoria, deleteCategoria} = require('../controllers/controllerCategoria');
const authorization = require('../middleware/authentication')
const categoriaRoutes = express.Router()

categoriaRoutes.get('/v1/categorias/search', getCategorias)

categoriaRoutes.get('/v1/categorias/:id', getCategoriaId)

categoriaRoutes.post('/v1/categorias',authorization, postCategoria)

categoriaRoutes.put('/v1/categorias/:id',authorization, putCategoria)

categoriaRoutes.delete('/v1/categorias/:id',authorization, deleteCategoria)

module.exports= categoriaRoutes

