
const { controllerGetProdutos,controllerGetProdutosID, controllerPostProduct, controllerPutProduct, controllerDeleteProduct }= require('../controllers/controllerProdutos');
const authorization = require('../middleware/authentication')
const express = require('express');
const routerProduct = express.Router()
const validate = require('../middleware/validate');
const { productCreate, productUpdate, productQuery, idParams } = require('../validation/schemas');

routerProduct.get('/search', validate(productQuery, 'query'), controllerGetProdutos)
routerProduct.get('/:id', validate(idParams, 'params'), controllerGetProdutosID)
routerProduct.post('/', authorization, validate(productCreate),controllerPostProduct)
routerProduct.put('/:id', authorization, validate(idParams, 'params'), validate(productUpdate),controllerPutProduct)
routerProduct.delete('/:id', authorization, validate(idParams, 'params'),controllerDeleteProduct)

module.exports = routerProduct
