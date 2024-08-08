
const express=require('express');
const {getCategorias, getCategoriaId, postCategoria, putCategoria} = require('../controllers/controllerCategoria');
const categoriaRoutes = express.Router()

categoriaRoutes.get('/',getCategorias)
categoriaRoutes.get('/:id',getCategoriaId)
categoriaRoutes.post('/',postCategoria)
categoriaRoutes.put('/:id',putCategoria)

module.exports= categoriaRoutes

