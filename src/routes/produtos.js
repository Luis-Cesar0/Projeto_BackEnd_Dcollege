
const { controllerGetProdutosID, controllerPostProduct, controllerPutProduct, controllerDelete, controllerDeleteProduct }= require('../controllers/controllerProdutos');
const express = require('express');
const routerProduct = express.Router()

routerProduct.get('/:id', controllerGetProdutosID)
routerProduct.post('/', controllerPostProduct)
routerProduct.put('./:id', controllerPutProduct)
routerProduct.delete('./:id', controllerDeleteProduct)

module.exports = routerProduct