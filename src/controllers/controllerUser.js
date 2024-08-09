const serviceLogin = require('../services/serviceUser.js')
const controllerLogin = (req,res) => {
    serviceLogin(req,res)
}

module.exports = controllerLogin