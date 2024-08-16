const express = require('express');
const { getProductID, postProduct, putProduct, deleteProdutos, getProduct } = require('../services/serviceProdutos')
const tabelaProdutos = require("../models/tabelaProdutos")



const controllerGetProduct = (req,res) => {
    getProduct(req,res)
}

const controllerGetProdutosID = (req,res) => {
    getProductID(req, res)
}

const controllerPostProduct = (req,res) => {
    postProduct(req, res)
}

const controllerPutProduct = (req,res) => {
    putProduct(req,res)
}

const controllerDeleteProduct = (req,res) => {
    deleteProdutos(req,res)
}


module.exports = { controllerGetProdutosID, controllerPostProduct, controllerPutProduct, controllerDeleteProduct, controllerGetProduct }