const tabelaUsuarios = require('../models/tabelaUsuarios');
const respostas = require('../responses');
const bcrypt = require('bcrypt');

function publicUser(usuario) {
  return {
    id: usuario.id,
    firstname: usuario.firstname,
    surname: usuario.surname,
    email: usuario.email,
  };
}

function isDuplicateEmail(error) {
  return error?.name === 'SequelizeUniqueConstraintError';
}

async function getUserId(req, res) {
  try {
    const usuario = await tabelaUsuarios.findByPk(req.params.id, {
      attributes: ['id', 'firstname', 'surname', 'email'],
    });
    if (!usuario) return respostas.notFound(res, 'Usuário não encontrado.');
    return respostas.success(res, 'Usuário encontrado', publicUser(usuario));
  } catch {
    return respostas.InternalServerError(res, 'Não foi possível consultar o usuário.');
  }
}

const postUser = async (req, res) => {
  const { firstname, surname, email, password } = req.body;
  try {
    const existingUser = await tabelaUsuarios.findOne({ where: { email }, attributes: ['id'] });
    if (existingUser) return respostas.conflict(res, 'E-mail já cadastrado.');
    const hashedPassword = await bcrypt.hash(password, 12);
    const novoUsuario = await tabelaUsuarios.create({
      firstname,
      surname,
      email,
      password: hashedPassword,
    });
    return respostas.created(res, 'Usuário criado com sucesso.', publicUser(novoUsuario));
  } catch (error) {
    if (isDuplicateEmail(error)) return respostas.conflict(res, 'E-mail já cadastrado.');
    return respostas.InternalServerError(res, 'Não foi possível criar o usuário.');
  }
};

const putUser = async (req, res) => {
  try {
    const usuario = await tabelaUsuarios.findByPk(req.params.id);
    if (!usuario) return respostas.notFound(res, 'Usuário não encontrado.');
    await usuario.update(req.body);
    return respostas.noContent(res);
  } catch (error) {
    if (isDuplicateEmail(error)) return respostas.conflict(res, 'E-mail já cadastrado.');
    return respostas.InternalServerError(res, 'Não foi possível atualizar o usuário.');
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await tabelaUsuarios.destroy({ where: { id: req.params.id } });
    if (!deleted) return respostas.notFound(res, 'Usuário não encontrado.');
    return respostas.noContent(res);
  } catch {
    return respostas.InternalServerError(res, 'Não foi possível remover o usuário.');
  }
};

module.exports = { getUserId, postUser, putUser, deleteUser };
