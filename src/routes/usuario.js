
const usuariosControllers= require('../controllers/contollerUsuarios');
const express=require('express');
const routerUser = express.Router()


 
routerUser.get('/:id',usuariosControllers.getUser)
routerUser.post('/',usuariosControllers.postUser)
// routerUser.put('/:id',putUser)
// routerUser.delete('/:id',deleteUser)

module.exports= routerUser


