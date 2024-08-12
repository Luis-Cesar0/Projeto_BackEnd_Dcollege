const express = require('express');
const { getProductID, postProduct } = require('../services/serviceProdutos')
const tabelaProdutos = require("../models/tabelaProdutos")

const controllerGetProdutosID = (req,res) => {
    getProductID(req, res)
}

const controllerPostProduct = (req,res) => {
    postProduct(req, res)
}

module.exports = { controllerGetProdutosID, controllerPostProduct }