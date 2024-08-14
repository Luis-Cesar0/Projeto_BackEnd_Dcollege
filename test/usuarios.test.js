const app = require('../src/app');
const request = require('supertest');

let server
let token

describe('testes de usuarios',()=>{
    beforeAll(async () =>{
        server = await app.listen(4000)
        test('fazendo login',async ()=>{
            const response = await request(app).post('/v1/user/token')
            .send({
                email: process.env.EMAIL_USER,
                password: process.env.SENHA_USER
            })
            expect(response.status).toBe(200)
            token = response.body.mensagem
            console.log(token)

        })
    })
    afterAll(async () =>{
        server.close()
    })
    
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

})
