jest.mock('../src/models/tabelaUsuarios', () => ({ findByPk: jest.fn(), findOne: jest.fn(), create: jest.fn(), destroy: jest.fn() }));

const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const usuarios = require('../src/models/tabelaUsuarios');

describe('autenticação e usuários', () => {
  beforeEach(() => jest.resetAllMocks());

  test('login válido emite JWT com payload userId e usa segredo de ambiente', async () => {
    const password = await bcrypt.hash('SenhaSegura123!', 4);
    usuarios.findOne.mockResolvedValue({ id: 7, email: 'luis@example.com', password });
    const response = await request(app).post('/v1/user/token').send({ email: 'luis@example.com', password: 'SenhaSegura123!' });
    expect(response.status).toBe(200);
    expect(jwt.verify(response.body.detalhes, process.env.JWT_SECRET).userId).toBe(7);
  });

  test('login inválido responde genericamente para e-mail ausente ou senha incorreta', async () => {
    usuarios.findOne.mockResolvedValue(null);
    const unknownEmail = await request(app).post('/v1/user/token').send({ email: 'missing@example.com', password: 'SenhaSegura123!' });
    usuarios.findOne.mockResolvedValue({ id: 7, email: 'luis@example.com', password: await bcrypt.hash('other', 4) });
    const wrongPassword = await request(app).post('/v1/user/token').send({ email: 'luis@example.com', password: 'SenhaSegura123!' });
    expect(unknownEmail.status).toBe(401);
    expect(unknownEmail.body).toEqual(wrongPassword.body);
    expect(unknownEmail.body.mensagem).toBe('E-mail ou senha inválidos.');
  });

  test('rota protegida exige Authorization Bearer e retorna usuário sem hash', async () => {
    const token = jwt.sign({ userId: 7 }, process.env.JWT_SECRET, { algorithm: 'HS256' });
    usuarios.findByPk.mockResolvedValue({ id: 7, firstname: 'Luis', surname: 'Cesar', email: 'luis@example.com', password: 'hash' });
    const missingPrefix = await request(app).get('/v1/usuarios/7').set('Authorization', token);
    const response = await request(app).get('/v1/usuarios/7').set('Authorization', `Bearer ${token}`);
    expect(missingPrefix.status).toBe(401);
    expect(response.status).toBe(200);
    expect(response.body.detalhes).not.toHaveProperty('password');
    expect(usuarios.findByPk).toHaveBeenCalledWith(7, { attributes: ['id', 'firstname', 'surname', 'email'] });
  });

  test('cadastro com token hasheia a senha e não a devolve', async () => {
    const token = jwt.sign({ userId: 7 }, process.env.JWT_SECRET, { algorithm: 'HS256' });
    usuarios.create.mockImplementation(async (data) => ({ id: 8, ...data }));
    const response = await request(app).post('/v1/usuarios').set('Authorization', `Bearer ${token}`).send({ firstname: 'Ana', surname: 'Silva', email: 'ana@example.com', password: 'SenhaSegura123!' });
    expect(response.status).toBe(201);
    expect(usuarios.create.mock.calls[0][0].password).not.toBe('SenhaSegura123!');
    expect(response.body.detalhes).not.toHaveProperty('password');
  });
});
