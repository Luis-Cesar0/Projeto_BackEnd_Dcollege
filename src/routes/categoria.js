
const express=require('express');
const {getCategorias, getCategoriaId, postCategoria, putCategoria, deleteCategoria} = require('../controllers/controllerCategoria');
const categoriaRoutes = express.Router()

categoriaRoutes.get('/',getCategorias)
categoriaRoutes.get('/:id',getCategoriaId)
categoriaRoutes.post('/',postCategoria)
categoriaRoutes.put('/:id',putCategoria)
categoriaRoutes.delete('/:id',deleteCategoria)

module.exports= categoriaRoutes

