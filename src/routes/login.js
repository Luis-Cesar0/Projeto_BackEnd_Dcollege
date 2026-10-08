const express=require('express');
const loginUser = require('../controllers/controllerlogin.js')
const validate = require('../middleware/validate');
const { login } = require('../validation/schemas');
const userRoutes = express.Router()


userRoutes.post('/token', validate(login), (req,res)=>{
    loginUser(req,res)
})
module.exports = userRoutes
