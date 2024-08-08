const express=require('express');
const {getUserId,postUser,putUser} = require('../services/serviceUsario')



const controlergetUserId =(req,res) =>{
    getUserId(req,res)
}
const controllerPostUser =(req,res) =>{
    postUser(req,res)
}
const controllerPutUser =(req,res) =>{
    putUser(req,res)
}

module.exports= {
    controlergetUserId,
    controllerPostUser,
    controllerPutUser
}