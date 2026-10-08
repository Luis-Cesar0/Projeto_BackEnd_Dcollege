
const express=require('express');
const {getCategorias, getCategoriaId, postCategoria, putCategoria, deleteCategoria} = require('../controllers/controllerCategoria');
const authorization = require('../middleware/authentication')
const validate = require('../middleware/validate');
const { category, categoryUpdate, categoryQuery, idParams } = require('../validation/schemas');
const categoriaRoutes = express.Router()

categoriaRoutes.get('/search', validate(categoryQuery, 'query'), getCategorias)

categoriaRoutes.get('/:id', validate(idParams, 'params'), getCategoriaId)

categoriaRoutes.post('/',authorization, validate(category), postCategoria)

categoriaRoutes.put('/:id',authorization, validate(idParams, 'params'), validate(categoryUpdate), putCategoria)

categoriaRoutes.delete('/:id',authorization, validate(idParams, 'params'), deleteCategoria)

module.exports= categoriaRoutes

