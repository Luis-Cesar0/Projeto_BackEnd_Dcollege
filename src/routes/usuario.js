
const getUser= require('../controllers/contollerUsuarios');
const express=require('express');
const routerUser = express.Router()

 
routerUser.get('/:id',getUser)
// routerUser.post('/',postUser)
// routerUser.put('/:id',putUser)
// routerUser.delete('/:id',deleteUser)

module.exports= routerUser


