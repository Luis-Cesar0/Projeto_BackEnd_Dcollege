
const tabelaUsuarios= require("../models/tabelaUsuarios")
const respostas = require('../responses')
const  bcrypt = require('bcrypt');


// faz um get no usuario pelo ID
async function getUserId(req,res){
    const id = req.params.id
    try {
        const usuario = await tabelaUsuarios.findByPk(id)
        if(!usuario) return respostas.notFound(res,'Usario não encotrado')
        
        const showUser ={
            id: usuario.id,
            firstname: usuario.firstname,
            surname: usuario.surname,
            email: usuario.email,
            password: usuario.password,
            
        }
        respostas.success(res,'Usuario encontrado',showUser)

    }catch(erro){
       respostas.InternalServerError(res,'Ocorreu um erro ao procura um usuario')
    }   
}

// cria um novo usuario
const postUser = async (req,res)=>{
    const {firstname,surname,email,password} = req.body
    if (!firstname || !surname || !email || !password) {
        return respostas.badRequest(res, 'os campos são obrigatórios');
      }
    try {
         // Verificar se o e-mail já existe
         const usuarioExite = await tabelaUsuarios.findOne({ where: { email: email } });
         if (usuarioExite) {
             return respostas.badRequest(res , 'Email,já exite');
         }

        // Criptografar a senha
        const salt =await bcrypt.genSalt(10)
        const hashedSenha = await bcrypt.hash(password,salt)
        
        //cirando usuario
        const novoUsuario = await tabelaUsuarios.create({
            firstname: firstname ,
            surname:surname ,
            email: email,
            password: hashedSenha})

            if(!novoUsuario){
                 return respostas.badRequest(res, 'Erro ao criar usuário')
            }
            const exibeUsuario = {
                firstname: novoUsuario.firstname,
                surname: novoUsuario.surname,
                email: novoUsuario.email,
            }
            respostas.created(res,'usuario criando com sucesso', exibeUsuario)
        }catch(error){
            respostas.InternalServerError(res,'Ocorreu um erro na criação do usuario')
        }
}


// atualização do usuario
const putUser = async(req,res)=>{ 
    const id = req.params.id
    // verifica se os campos estão vazios
    const {firstname,surname,email} = req.body
    if (!firstname && !surname && !email) {
        return respostas.badRequest(res, 'todos os campos não podem esta vazio');
      }

    const usuario = await tabelaUsuarios.findByPk(id)
    if(!usuario) return respostas.notFound(res,'Usario não encotrado')
      
    try {
        
        
        const AttUsuario = await tabelaUsuarios.update({
            firstname: firstname ,
            surname: surname,
            email: email
        },
        {where:{id:id}}
    )
    respostas.noContent(res)
    
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