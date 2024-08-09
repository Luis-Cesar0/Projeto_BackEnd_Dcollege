
const {controlergetUserId,controllerPostUser,controllerPutUser,controlergetDeleteUser}= require('../controllers/contollerUsuarios');
const express=require('express');
const routerUser = express.Router()


 
routerUser.get('/:id',(req,res)=>{
    controlergetUserId(req,res)
})
routerUser.post('/',(req,res)=>{
    controllerPostUser(req,res)
})
routerUser.put('/:id',(req,res)=>{
    controllerPutUser(req,res)
})
routerUser.delete('/:id',(req,res)=>{
    controlergetDeleteUser(req,res)
})

module.exports= routerUser


