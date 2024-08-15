const app = require('../src/app');
const request = require('supertest');
// const usuarios = require('../src/models/tabelaUsuarios')
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// jest.mock('../src/models/tabelaUsuarios')

let server
let token

describe('testes de usuarios',()=>{
    beforeAll(async () =>{
        server = await app.listen(4000)
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
    
    // teste do metodo GET
    test('Usuario não encontrado', async () => { 


        const response = await request(app).get('/v1/usuarios/123')
    
        expect(response.status).toBe(404)
     })
    
    test('Usuario  encontrado', async () => { 
        const response = await request(app).get('/v1/usuarios/14')
    
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            status: "200",
            mensagem: "Usuario encontrado",
            detalhes: {
                id: 14,
                firstname: "Luis",
                surname: "Cesar",
                email: "luiscesar@example.com",
                password: "$2b$10$I3gbxzSQ85Taq0ADmWFR4.mKGTb/d4XcbhXiEWjXWM26/zcKer8cC",
            }
        })
     })

    // teste do metodo POST
     test('Tentado cria usuario com email exixtente',async ()=>{

        const senhaCriptografada = await bcrypt.hash('123456', 10)
        
        const response = await request(app).post('/v1/usuarios')
        .set('Authorization', token) 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
            email: process.env.EMAIL_USER,
            password: senhaCriptografada
        })

        expect(response.status).toBe(400)
        console.log(response.body)
        expect(response.body).toEqual({
            status: "400",
            mensagem: "Email,já exite"
        })
     })

     test('Tentado cria usuario com um token invalido',async ()=>{

        const senhaCriptografada = await bcrypt.hash('123456', 10)
        
        const response = await request(app).post('/v1/usuarios')
        .set('Authorization', `tokenInvalido`) 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
            email: process.env.EMAIL_USER,
            password: senhaCriptografada
        })

        expect(response.status).toBe(401)
        expect(response.body).toEqual({
            status: "401",
            mensagem: "Token invalido"
            
        })
     })

     test('Tentado cria usuario com um infomação faltando',async ()=>{

        const senhaCriptografada = await bcrypt.hash('123456', 10)
        
        const response = await request(app).post('/v1/usuarios')
        .set('Authorization', token) 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
            password: senhaCriptografada
        })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({
            status: "400",
            mensagem: "os campos são obrigatórios"
            
        })
     })

})
