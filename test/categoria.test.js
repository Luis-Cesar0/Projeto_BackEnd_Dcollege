const request = require('supertest');
const app = require('../src/app');
const categoria = require('../src/models/tabelaCategoria');
const bcrypt = require('bcrypt');


let server;
let token;



  // Teste do método GET

describe('Testando a rota de categorias', () => {
  jest.mock('../src/models/tabelaCategoria');

  beforeAll(async () => {
    server = app.listen(9001);
    const response = await request(app)
    .post('/v1/user/token')
    .send({
            email: process.env.EMAIL_USER,
            password: process.env.SENHA_USER
        })
     expect(response.status).toBe(200)
          token = response.body.detalhes
           expect(token).toBeDefined()
  });
  
  afterAll(async () => {
    server.close();
  }
  );

  test('Teste do método GET', async () => {
    const response = await request(app).get('/v1/categorias/search')

    expect(response.status).toBe(200);

  });

  test('Teste do metodo GET dados da requisição  incorretos', async () => {

    const response = await request(app).get('/v1/categorias/search?limit=doze')

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'dados incorretos' });
    });
  
  


  //teste do metodo get por id
  test('Teste do método GET por id', async () => {''
    const response = await request(app).get('/v1/categorias/1')
    expect(response.status).toBe(200);
  });


  test('Teste do método GET por id - Recurso não encontrado', async () => {

    const response = await request(app).get('/v1/categorias/123');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Categoria inexistente ' });
  });



  // Teste do método POST
  
  test('Teste do método POST dados da requisição estiverem incorretos', async () => {
     
    const response = await request(app)
      .post('/v1/categorias')
      .set('Authorization', token)
      .send({
        name: 'Roupas',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      statusCode: 400,
      message: 'Dados incorretos',
    });

  });

  test('Tentando criar categoria com token inválido', async () => {

    const response = await request(app)
      .post('/v1/categorias')
      .set('Authorization', 'tokenInvalido')
      .send({
        name: 'Roupas',
        slug: 'roupas',
      });

      expect(response.status).toBe(401)
      expect(response.body).toEqual({
          status: "401",
          mensagem: "Token invalido"
          
      })
   });

  test('Criando uma nova categoria', async () => {
    categoria.create = jest.fn();
    categoria.create.mockResolvedValue({
      id: 20,
      name: 'Roupas',
      slug: 'roupas',
      use_in_menu: true,
    });

    const response = await request(app)
      .post('/v1/categorias')
      .set('Authorization', token)
      .send({
        name: 'Roupas',
        slug: 'roupas',
        use_in_menu: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      statusCode: 201,
      name: 'Roupas',
      slug: 'roupas',
      use_in_menu: true,
    });
  });



  // Teste do método PUT
  test('Atualizando categoria com token invalido', async () => {
    const response = await request(app)
      .put('/v1/categorias/20')
      .set('Authorization', 'tokenInvalido')
      .send({
        name: 'Roupas',
        slug: 'roupas-modificadas',
        use_in_menu: true,
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: '401',
      mensagem: 'Token invalido',
    });
  });

  test('Atualizando categoria', async () => {
    categoria.update = jest.fn();

    categoria.update.mockResolvedValue([1]);

    const response = await request(app)
      .put('/v1/categorias/20')
      .set('Authorization', token)
      .send({
        name: 'Roupas',
        slug: 'roupas-modificadas',
        use_in_menu: true,
      });

    expect(response.status).toBe(200);
  });


  // Teste do método DELETE
  test('Deletando categoria com token inválido', async () => {
    const response = await request(app)
      .delete('/v1/categorias/20')
      .set('Authorization', 'tokenInvalido');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: '401',
      mensagem: 'Token invalido',
    });
  });

  test('Deletando categoria', async () => {
    categoria.destroy = jest.fn();
    categoria.destroy.mockResolvedValue(1);

    const response = await request(app)
      .delete('/v1/categorias/20')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      statusCode: 200,
      message: 'Categoria deletada com sucesso',

  });
});

});

