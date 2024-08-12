const serviceLogin = require('../services/serviceLogin.js')

const controllerLogin = (req,res) => {
    serviceLogin(req,res)
}

module.exports = controllerLogin