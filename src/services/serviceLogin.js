const jwt = require('jsonwebtoken');
const respostas = require('../responses');
const tabelaUsuario = require('../models/tabelaUsuarios');
const bcrypt = require('bcrypt');

const INVALID_CREDENTIALS = 'E-mail ou senha inválidos.';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await tabelaUsuario.findOne({
      where: { email },
      attributes: ['id', 'email', 'password'],
    });

    const passwordCorreta = usuario
      ? await bcrypt.compare(password, usuario.password)
      : false;
    if (!passwordCorreta) return respostas.unauthorized(res, INVALID_CREDENTIALS);

    const secret = process.env.JWT_SECRET || process.env.KEY_TOKEN;
    if (!secret || Buffer.byteLength(secret, 'utf8') < 32) {
      return respostas.InternalServerError(res, 'Autenticação não configurada.');
    }

    const token = jwt.sign(
      { userId: usuario.id, email: usuario.email },
      secret,
      { algorithm: 'HS256', expiresIn: '1h' },
    );
    return respostas.success(res, 'token criado', token);
  } catch {
    return respostas.InternalServerError(res, 'Não foi possível concluir o login.');
  }
};

module.exports = login;
