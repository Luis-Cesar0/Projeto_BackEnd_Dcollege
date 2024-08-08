
const tabelaUsuarios= require("../models/tabelaUsuarios")
const resposta = require('../responses')



const getUserId = async (req,res)=>{
    const id = req.params.id
    try {
        const usuario = await tabelaUsuarios.findByPk(id)
        res.json(usuario)
        
    }catch(error){
        resposta.badRequest(res,error)
    }
}



module.exports = getUserId;