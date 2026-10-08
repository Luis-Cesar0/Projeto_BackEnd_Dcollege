
const {controllergetUserId,controllerPostUser,controllerPutUser,controllergetDeleteUser}= require('../controllers/controllerUsuarios');
const express=require('express');
const routerUsuario = express.Router()
const authorization = require('../middleware/authentication')
const validate = require('../middleware/validate');
const { idParams, userCreate, userUpdate } = require('../validation/schemas');


 
routerUsuario.get('/:id', authorization, validate(idParams, 'params'), (req,res)=>{
    controllergetUserId(req,res)
})
routerUsuario.post('/',authorization, validate(userCreate),(req,res)=>{
    controllerPostUser(req,res)
})
routerUsuario.put('/:id',authorization, validate(idParams, 'params'), validate(userUpdate),(req,res)=>{
    controllerPutUser(req,res)
})
routerUsuario.delete('/:id',authorization, validate(idParams, 'params'),(req,res)=>{
    controllergetDeleteUser(req,res)
})

module.exports= routerUsuario


