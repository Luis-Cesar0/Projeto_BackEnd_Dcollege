const express=require('express');
const userservice = require('../services/serviceUsario')



const getUserId =(req,res) =>{
    userservice(req,res)
}

module.exports= getUserId