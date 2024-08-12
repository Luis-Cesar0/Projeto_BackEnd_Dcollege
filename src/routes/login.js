const express=require('express');
const loginUser = require('../controllers/controllerlogin.js')
const userRoutes = express.Router()


userRoutes.post('/token',(req,res)=>{
    loginUser(req,res)
})
module.exports = userRoutes