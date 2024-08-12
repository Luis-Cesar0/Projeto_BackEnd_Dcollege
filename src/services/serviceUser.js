require('dotenv').config()
const jwt = require('jsonwebtoken')
const respostas = require('../responses.js')
const tabelaUsuario = require('../models/tabelaUsuarios.js')
const login = async(req, res) => {
    try {
    const { email, password } = req.body;

    const usuario = await tabelaUsuario.findOne({ where: { email: email },  attributes: ['id', 'firstname', 'surname', 'email', 'password', 'createdAt', 'updateAt'] })

		//caso não exista ocorrência relacionada ao email
    if (!usuario) {
        return respostas.unauthorized(res,'email inválido')
    }

    //caso o email esteja correto verificar a password
    //bycrypt.compare retorna true ou false
    const passwordCorreta = await bcrypt.compare(password, usuario.dataValues.password)

    // caso passwordCorreta seja armazene false
    if (!passwordCorreta) {
        return respostas.unauthorized(res,'senha inválido')
    }

    //caso password esteja correta, gerar o token
    //jwt.sign( Payload, chaveSecreta, opcoes)
    const token = jwt.sign(
		    { id: usuario.dataValues.id, email: usuario.dataValues.email },
		    process.env.KEY_TOKEN,
		    { expiresIn: '1h' }
    )
    
    respostas.success(res,'token criado',token)
        
    } catch (error) {
        // respostas.InternalServerError(res,'erro ao fazer login')
        res.json(error)
    }
}
module.exports = login