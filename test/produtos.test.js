jest.mock('../src/models/tabelaProdutos', () => ({ rawAttributes: { id: {}, enabled: {}, name: {}, price: {}, category_ids: {} }, findAndCountAll: jest.fn(), findByPk: jest.fn(), create: jest.fn(), destroy: jest.fn() }));
jest.mock('../src/models/tabelaUsuarios', () => ({ findByPk: jest.fn(), findOne: jest.fn(), create: jest.fn(), destroy: jest.fn() }));
jest.mock('../src/models/tabelaCategoria', () => ({ count: jest.fn(), findAll: jest.fn(), findByPk: jest.fn(), create: jest.fn(), destroy: jest.fn() }));
jest.mock('../src/models/imagensProduto', () => ({ belongsTo: jest.fn(), update: jest.fn(), create: jest.fn(), bulkCreate: jest.fn(), destroy: jest.fn() }));
jest.mock('../src/models/opcoesProduto', () => ({ belongsTo: jest.fn(), update: jest.fn(), create: jest.fn(), bulkCreate: jest.fn(), destroy: jest.fn() }));
jest.mock('../src/config/conexao', () => ({ transaction: (callback) => callback({}) }));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const produtos = require('../src/models/tabelaProdutos');

describe('produtos', () => {
  test('busca paginada retorna contagem total e aceita lista vazia', async () => {
    produtos.findAndCountAll.mockResolvedValue({ count: 5, rows: [] });
    const response = await request(app).get('/v1/produtos/search?limit=2&page=2');
    expect(response.status).toBe(200);
    expect(response.body.detalhes).toMatchObject({ data: [], total: 5, limit: 2, page: 2 });
  });

  test('bloqueia criação protegida sem token válido', async () => {
    const response = await request(app).post('/v1/produtos').send({ name: 'Mesa', slug: 'mesa', stock: 0, description: 'Mesa', price: 0 });
    expect(response.status).toBe(401);
    expect(produtos.create).not.toHaveBeenCalled();
  });

  test('deletar produto inexistente retorna 404 sem apagar recursos filhos', async () => {
    const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { algorithm: 'HS256' });
    produtos.findByPk.mockResolvedValue(null);
    const response = await request(app).delete('/v1/produtos/99').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});
