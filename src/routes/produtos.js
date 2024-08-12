
const { controllerGetProdutosID, controllerPostProduct }= require('../controllers/controllerProdutos');
const express = require('express');
const routerProduct = express.Router()

routerProduct.get('/:id', controllerGetProdutosID)
routerProduct.post('/', controllerPostProduct)

module.exports = routerProduct