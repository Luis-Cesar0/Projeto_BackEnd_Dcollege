const express=require('express');
const userservice = require('../services/serviceUsario')
const tabelaUsuarios= require("../models/tabelaUsuarios")
const tabelaProdutos = require('../models/tabelaProdutos')


const getUserId =(req,res) =>{
    userservice(req,res,tabelaUsuarios)
}

module.exports= getUserId