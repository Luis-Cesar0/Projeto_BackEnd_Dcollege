const express=require('express');
const {getUserId,postUser,putUser,deleteUser} = require('../services/serviceUsario')



const controlergetUserId =(req,res) =>{
    getUserId(req,res)
}
const controllerPostUser =(req,res) =>{
    postUser(req,res)
}
const controllerPutUser =(req,res) =>{
    putUser(req,res)
}
const controlergetDeleteUser =(req,res)=>{
    deleteUser(req,res)
}

module.exports= {
    controlergetUserId,
    controllerPostUser,
    controllerPutUser,
    controlergetDeleteUser
}