const jwt = require('jsonwebtoken');
const respostas = require('../responses')

function validaToken(req, res, next) {
  const authorization = req.get('Authorization');
  const match = authorization && authorization.match(/^Bearer\s+(.+)$/i);

  if (!match) return respostas.unauthorized(res, 'Token ausente ou inválido');

  const secret = process.env.JWT_SECRET || process.env.KEY_TOKEN;
  if (!secret || Buffer.byteLength(secret, 'utf8') < 32) {
    return respostas.InternalServerError(res, 'Autenticação não configurada.');
  }

  try {
    const decoded = jwt.verify(match[1], secret, { algorithms: ['HS256'] });
    if (!decoded || typeof decoded === 'string' || !decoded.userId) {
      return respostas.unauthorized(res, 'Token inválido');
    }
    req.userId = decoded.userId;
    return next();
  } catch {
    return respostas.unauthorized(res, 'Token ausente ou inválido');
  }
}

module.exports = validaToken;
