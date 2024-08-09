const { json } = require("sequelize");
const tabelaUsuarios= require("../models/tabelaUsuarios")
const respostas = require('../responses')
const  bcrypt = require('bcrypt');



async function getUserId(req,res){
    const id = req.params.id
    try {
        const usuario = await tabelaUsuarios.findByPk(id)
        if(usuario){
            respostas.success(res,usuario)
        }else{
            respostas.notFound(res,usuario)
        }
    }catch(error){
       res.json(error)
    }
}

const postUser = async (req,res)=>{
    const {firstname,surname,email,password} = req.body
    if (!firstname || !surname || !email || !password) {
        return respostas.badRequest(res, 'Todos os campos são obrigatórios');
      }
    try {
        const salt =await bcrypt.genSalt(10)
        const hashedSenha = await bcrypt.hash(password,salt)

        const novoUsuario = await tabelaUsuarios.create({
            firstname: firstname ,
            surname:surname ,
            email: email,
            password: hashedSenha})

            if(!novoUsuario){
                 return respostas.badRequest(res, 'Erro ao criar usuário')
            }
            respostas.created(res,novoUsuario)
        }catch(error){
           res.json(error)
        }
}
const putUser = async(req,res)=>{ 
    const id = req.params.id
    const {firstname,surname,email} = req.body
    if (!firstname && !surname && !email) {
        return respostas.badRequest(res, 'Todos os campos são obrigatórios');
      }
    try {
        const AttUsuario = await tabelaUsuarios.update({
            firstname: firstname ,
            surname: surname,
            email: email
        },
        {where:{id:id}}
    )
    if(AttUsuario){
        respostas.noContent(res)
    }else{
        //falta 0 token para o 401
        respostas.notFound(res,AttUsuario)
    }
    respostas.success(res,usuario)
}catch(error){
   res.json(error) 
}
}
const deleteUser = async (req,res)=>{
        const id = req.params.id
        try {
            const usuario = await tabelaUsuarios.destroy({where:{id:id}})
            if(usuario){
                respostas.noContent(res)
            }else{
                //falta 0 token para o 401
                respostas.notFound(res,usuario)
            }
        }catch(error){
           res.json(error) 
        }
}


module.exports = {
    getUserId,
    postUser,
    putUser,
    deleteUser
}

;