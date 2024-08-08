
const { controllerProdutos }= require('../controllers/controllerProdutos');
const express = require('express');
const routerProduct = express.Router()

routerProduct.get('/:id', controllerProdutos)

module.exports = routerProduct