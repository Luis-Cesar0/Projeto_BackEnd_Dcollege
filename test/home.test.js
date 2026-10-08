const request = require('supertest');
jest.mock('../src/models/tabelaUsuarios', () => ({ findByPk: jest.fn(), findOne: jest.fn(), create: jest.fn(), destroy: jest.fn() }));
const app = require('../src/app');

test('retorna mensagem de boas-vindas sem abrir conexão de banco', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: 'Bem-vindo' });
});
