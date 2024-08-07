
const getUser= require('../func/getUser');
const express=require('express');
const router = express.Router()

 
router.get('/',getUser)

module.exports= router


