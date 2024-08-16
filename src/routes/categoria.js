
const express=require('express');
const {getCategorias, getCategoriaId, postCategoria, putCategoria, deleteCategoria} = require('../controllers/controllerCategoria');
const authorization = require('../middleware/authentication')
const categoriaRoutes = express.Router()

categoriaRoutes.get('/v1/category/search', getCategorias)

categoriaRoutes.get('/v1/category/:id', getCategoriaId)

categoriaRoutes.post('/v1/category',authorization, postCategoria)

categoriaRoutes.put('/v1/category/:id',authorization, putCategoria)

categoriaRoutes.delete('/v1/category/:id',authorization, deleteCategoria)

module.exports= categoriaRoutes

