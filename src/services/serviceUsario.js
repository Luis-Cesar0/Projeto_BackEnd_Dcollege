
const tabelaUsuarios= require("../models/tabelaUsuarios")
const resposta = require('../responses')
const const bcrypt = require('bcrypt');



const getUserId = async (req,res)=>{
    const id = req.params.id
    try {
        const usuario = await tabelaUsuarios.findByPk(id)
        res.json(usuario)
        
    }catch(error){
        resposta.badRequest(res,error)
    }
}

const postUser = async (req,res)=>{
    const {firstname ,surname,email,password} = req.body
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    getUserId,
    postUser

};