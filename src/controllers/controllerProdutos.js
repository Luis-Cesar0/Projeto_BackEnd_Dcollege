const express = require('express');
const { getProductID, postProduct } = require('../services/serviceProdutos')
const tabelaProdutos = require("../models/tabelaProdutos")

const controllerProdutos = (req,res) => {
    getProductID(req, res)
}

module.exports = { controllerProdutos }