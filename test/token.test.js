const app = require('../src/app');
const request = require('supertest');
const usuarios = require('../src/models/tabelaUsuarios')
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

let server
let token

describe('testes de usuarios',()=>{

    jest.mock('../src/models/tabelaUsuarios')

    beforeAll(async () =>{
        server = await app.listen(9003)

        const response = await request(app)
        .post('/v1/user/token')
        .send({
                email: process.env.EMAIL_USER,
                password: process.env.SENHA_USER
            })
        expect(response.status).toBe(200)
        token = response.body.detalhes
         expect(token).toBeDefined()

    })
    afterAll(async () =>{
        server.close()
    })

    test('login validado com sucesso', async () => { 

        const response = await request(app)
        .post('/v1/user/token')
        .send({
                email: process.env.EMAIL_USER,
                password: process.env.SENHA_USER
            })
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            status: "200",
            mensagem: "token criado",
            detalhes: response.body.detalhes
        })
     })
     test('login com senha invalida', async () => { 

        const response = await request(app)
        .post('/v1/user/token')
        .send({
                email: process.env.EMAIL_USER,
                password: "senhainvalida291281"
            })
        expect(response.status).toBe(401)
        expect(response.body).toEqual({
            status: "401",
            mensagem: "senha inválido",
        })
     })

     test('login com email invalido', async () => { 

        const response = await request(app)
        .post('/v1/user/token')
        .send({
                email: "emailinvalido298192@email.com",
                password: process.env.SENHA_USER
            })
        expect(response.status).toBe(401)
        expect(response.body).toEqual({
            status: "401",
            mensagem: "email inválido",
        })
     })

    })
    