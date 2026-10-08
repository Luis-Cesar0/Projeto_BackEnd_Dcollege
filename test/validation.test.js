jest.mock('../src/models/tabelaUsuarios', () => ({ findByPk: jest.fn(), findOne: jest.fn(), create: jest.fn(), destroy: jest.fn() }));
jest.mock('../src/models/tabelaCategoria', () => ({ count: jest.fn(), findAll: jest.fn(), findByPk: jest.fn(), create: jest.fn(), destroy: jest.fn() }));
jest.mock('../src/models/tabelaProdutos', () => ({ rawAttributes: { id: {}, enabled: {}, name: {}, price: {}, category_ids: {} }, findAndCountAll: jest.fn(), findByPk: jest.fn(), create: jest.fn(), destroy: jest.fn() }));
jest.mock('../src/models/imagensProduto', () => ({ belongsTo: jest.fn(), update: jest.fn(), create: jest.fn(), bulkCreate: jest.fn() }));
jest.mock('../src/models/opcoesProduto', () => ({ belongsTo: jest.fn(), update: jest.fn(), create: jest.fn(), bulkCreate: jest.fn() }));
jest.mock('../src/config/conexao', () => ({ transaction: (callback) => callback({}) }));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const produtos = require('../src/models/tabelaProdutos');
const categorias = require('../src/models/tabelaCategoria');
const token = () => jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { algorithm: 'HS256' });

describe('validação e CRUD', () => {
  beforeEach(() => jest.resetAllMocks());

  test('valida payload do login antes de consultar o banco', async () => {
    const response = await request(app).post('/v1/user/token').send({ email: 'not-an-email' });
    expect(response.status).toBe(400);
    expect(response.body.erros).toEqual(expect.arrayContaining([expect.objectContaining({ campo: 'email' })]));
  });

  test('JSON malformado retorna 400 sem detalhes internos', async () => {
    const response = await request(app).post('/v1/user/token').set('Content-Type', 'application/json').send('{"email":');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ status: '400', mensagem: 'JSON inválido.' });
  });

  test('valida IDs e paginação numérica', async () => {
    const badId = await request(app).get('/v1/categorias/not-a-number');
    const badPagination = await request(app).get('/v1/categorias/search?limit=doze');
    expect(badId.status).toBe(400);
    expect(badPagination.status).toBe(400);
    expect(categorias.findByPk).not.toHaveBeenCalled();
    expect(categorias.findAll).not.toHaveBeenCalled();
  });

  test('contagem de categorias respeita filtro aplicado', async () => {
    categorias.count.mockResolvedValue(2);
    categorias.findAll.mockResolvedValue([{ id: 1, name: 'Roupas' }]);
    const response = await request(app).get('/v1/categorias/search?use_in_menu=true&limit=10&page=2');
    expect(response.status).toBe(200);
    expect(categorias.count).toHaveBeenCalledWith({ where: { use_in_menu: true } });
    expect(categorias.findAll.mock.calls[0][0]).toMatchObject({ where: { use_in_menu: true }, offset: 10, limit: 10 });
    expect(response.body.total).toBe(2);
  });

  test('atualização de produto preserva false e zero', async () => {
    const update = jest.fn();
    produtos.findByPk.mockResolvedValue({ update });
    const response = await request(app).put('/v1/produtos/4').set('Authorization', `Bearer ${token()}`).send({ enabled: false, stock: 0, price: 0 });
    expect(response.status).toBe(200);
    expect(update).toHaveBeenCalledWith({ enabled: false, stock: 0, price: 0 }, { transaction: {} });
  });
});
