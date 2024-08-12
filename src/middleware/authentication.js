const jwt = require('jsonwebtoken');
const respostas = require('../responses')

function validaToken(req, res, next) {
// resgatar o token da requisição
const retornaToken = req.header('Authorization');

// se não tiver token, retornar erro
if (!retornaToken)  return respostas.unauthorized(res, 'acesso negado');
// se tiver token, verificar se é valido
try {
    const tokenDecodado = jwt.verify(retornaToken, process.env.KEY_TOKEN);
    req.userId = tokenDecodado.userId;
    
    next();
 } catch (error) {
    return respostas.unauthorized(res, 'Token invalido')
 }
 };

module.exports = validaToken;