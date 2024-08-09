
const tabelaUsuarios= require("../models/tabelaUsuarios")
const respostas = require('../responses')
const  bcrypt = require('bcrypt');


// faz um get no usuario pelo ID
async function getUserId(req,res){
    const id = req.params.id
    try {
        const usuario = await tabelaUsuarios.findByPk(id)
        if(!usuario) return respostas.notFound(res,'Usario não encotrado')

        respostas.success(res,'Usuario encontrado',usuario)

    }catch(erro){
       respostas.InternalServerError(res,'Ocorreu um erro ao procura um usuario')
    }   
}

// cria um novo usuario
const postUser = async (req,res)=>{
    const {firstname,surname,email,password} = req.body
    if (!firstname || !surname || !email || !password) {
        return respostas.badRequest(res, 'Os campos estão vazio');
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
            respostas.created(res,'usuario criando com sucesso',novoUsuario)
        }catch(error){
            respostas.InternalServerError(res,'Ocorreu um erro na criação do usuario')
        }
}

// atualização do usuario
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
    if(!AttUsuario)  return respostas.notFound(res,'Usuario não encontrado')
    respostas.noContent(res)

        //falta o token para o 401

    
    }catch(error){
        respostas.InternalServerError(res,'Ocorreu um na atulização das informações do usuario')
    }
}

// remoção do usuario
const deleteUser = async (req,res)=>{
        const id = req.params.id
        try {
            const usuario = await tabelaUsuarios.destroy({where:{id:id}})
            if(!usuario) return respostas.notFound(res,`Usuario com id= ${id} não foi encotrado`)

            respostas.noContent(res)

        }catch(error){
            respostas.InternalServerError(res,'Ocorreu um errona remoção do usuario usuario') 
        }
}


module.exports = {
    getUserId,
    postUser,
    putUser,
    deleteUser
}