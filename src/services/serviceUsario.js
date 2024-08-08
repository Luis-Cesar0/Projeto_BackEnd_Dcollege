const { json } = require("sequelize");
const tabelaUsuarios= require("../models/tabelaUsuarios")
const resposta = require('../responses')
const  bcrypt = require('bcrypt');



async function getUserId(req,res){
    const id = req.params.id
    try {
        const usuario = await tabelaUsuarios.findByPk(id)
        res.json(usuario) 
        
    }catch(error){
        resposta.badRequest(res,error)
    }
}

const postUser = async (req,res)=>{
    const {firstname,surname,email,password} = req.body
    try {
        const salt =await bcrypt.genSalt(10)
        const hashedSenha = await bcrypt.hash(password,salt)

        const novoUsuario = await tabelaUsuarios.create({
            firstname: firstname ,
            surname:surname ,
            email: email,
            password: hashedSenha})

        res.json(novoUsuario)
        
    } catch (error) {
        
    }
}
const putUser = async(req,res)=>{
    const id = req.params.id
    const {firstname,surname,email} = req.body
    try {
        const AttUsuario = await tabelaUsuarios.update({
            firstname: firstname ,
            surname: surname,
            email: email
        },
        {where:{id:id}}
    )
    res.json(AttUsuario)
    } catch (error) {
        
    }
}


module.exports = {
    getUserId,
    postUser,
    putUser
}

;