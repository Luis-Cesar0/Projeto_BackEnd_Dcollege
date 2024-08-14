const {getUserId,postUser,putUser,deleteUser} = require('../services/serviceUsario')



const controllergetUserId =(req,res) =>{
    getUserId(req,res)
}
const controllerPostUser =(req,res) =>{
    postUser(req,res)
}
const controllerPutUser =(req,res) =>{
    putUser(req,res)
}
const controllergetDeleteUser =(req,res)=>{
    deleteUser(req,res)
}

module.exports= {
    controllergetUserId,
    controllerPostUser,
    controllerPutUser,
    controllergetDeleteUser
}