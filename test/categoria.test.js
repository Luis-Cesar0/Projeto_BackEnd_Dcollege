const request = require('supertest');
const app = require('../src/app');
const categoria = require('../src/models/tabelaCategoria');
const bcrypt = require('bcrypt');


let server;
let token;

beforeAll(async () => {
  server = app.listen(4000);
  token = await
  bcrypt.hash('123456', 10);
});

afterAll(async () => {
  server.close();
}
);

jest.mock('../src/models/tabelaCategoria');
  // Teste do método GET

describe('Testando a rota de categorias', () => {

  test('Teste do método GET', async () => {
    categoria.findAll.mockResolvedValue([
      {
        id: 16,
        name: 'Nova categoria',
        slug: 'nova-categoria',
        use_in_menu: true,
      },
      {
        id: 17,
        name: 'Outra categoria',
        slug: 'outra-categoria',
        use_in_menu: false,
      },
    ]);

    const response = await request(app)
      .get('/v1/category/search')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 16,
        name: 'Nova categoria',
        slug: 'nova-categoria',
        use_in_menu: true,
      },
      {
        id: 17,
        name: 'Outra categoria',
        slug: 'outra-categoria',
        use_in_menu: false,
      },
    ]);
  });
  

  //teste do metodo get por id
  test('Teste do método GET por id', async () => {
    categoria.findByPk.mockResolvedValue({
      id: 16,
      name: 'Nova categoria',
      slug: 'nova-categoria',
      use_in_menu: true,
    });

    const response = await request(app)
      .get('/v1/category/16')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 16,
      name: 'Nova categoria',
      slug: 'nova-categoria',
      use_in_menu: true,
    });
  });

  test('Teste do método GET por id - Recurso não encontrado', async () => {
    categoria.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .get('/v1/category/16')
      .set('Authorization', token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: '404',
      mensagem: 'Recurso não encontrado',
    });
  });

  // Teste do método POST
  test('Tentando criar categoria com nome existente', async () => {
    const response = await request(app)
      .post('/v1/category')
      .set('Authorization', token)
      .send({
        name: 'Nova Categoria',
        slug: ' nova-categoria',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: '400',
      mensagem: 'Categoria já existe',
    });
  });

  test('Tentando criar categoria com token inválido', async () => {
    const response = await request(app)
      .post('/v1/category')
      .set('Authorization', 'tokenInvalido')
      .send({
        name: 'Roupas',
        slug: 'roupas',
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: '401',
      mensagem: 'Token inválido',
    });
  });

  test('Criando uma nova categoria', async () => {
    categoria.create.mockResolvedValue({
      id: 20,
      name: 'Roupas',
      slug: 'roupas',
    });

    const response = await request(app)
      .post('/v1/category')
      .set('Authorization', token)
      .send({
        name: 'Roupas',
        slug: 'roupas',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      status: '201',
      mensagem: 'Categoria criada com sucesso',
      detalhes: {
        id: 20,
        name: 'Roupas',
        slug: 'roupas',
      },
    });
  });

  // Teste do método PUT
  test('Atualizando categoria com token inválido', async () => {
    const response = await request(app)
      .put('/v1/category/20')
      .set('Authorization', 'tokenInvalido')
      .send({
        name: 'Roupas',
        slug: 'roupas-modificadas',
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: '401',
      mensagem: 'Token inválido',
    });
  });

  test('Atualizando categoria', async () => {
    categoria.update.mockResolvedValue([1]);

    const response = await request(app)
      .put('/v1/category/20')
      .set('Authorization', token)
      .send({
        name: 'Roupas',
        slug: 'roupas-modificadas',
      });

    expect(response.status).toBe(204);
  });

  // Teste do método DELETE
  test('Deletando categoria com token inválido', async () => {
    const response = await request(app)
      .delete('/v1/category/20')
      .set('Authorization', 'tokenInvalido');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: '401',
      mensagem: 'Token inválido',
    });
  });

  test('Deletando categoria', async () => {
    categoria.destroy.mockResolvedValue(1);

    const response = await request(app)
      .delete('/v1/category/20')
      .set('Authorization', token);

    expect(response.status).toBe(204);
  });
});

