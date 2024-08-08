const express=require('express');
const userservice = require('../services/serviceUsuario')



const getUserId =(req,res) =>{
    userservice(req,res)
}

module.exports= getUserId