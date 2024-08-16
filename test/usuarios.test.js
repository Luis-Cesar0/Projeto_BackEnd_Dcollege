const app = require('../src/app');
const request = require('supertest');
const  usuarios = require('../src/models/tabelaUsuarios')
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');




let server
let token

describe('testes de usuarios',()=>{

    jest.mock('../src/models/tabelaUsuarios')

    beforeAll(async () =>{
        server = await app.listen(4001)

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

     //limpando os mocks
     beforeEach(() => {
        jest.resetAllMocks(); 
      });
    
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

     
     test('Criando um novo usuario', async () => {
        usuarios.create = jest.fn();
        
       
        usuarios.create.mockResolvedValue({
            id: 1,
            firstname: 'Maria',
            surname: 'Eduarda',
            email: 'maria.eduarda@example.com',
            password: await bcrypt.hash('123456', 10)
        })
    
        
        
        const response = await request(app)
        .post('/v1/usuarios')
        .set('Authorization', token) 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
            email: 'maria.eduarda@example.com',
            password: '123456'
        })
        
       expect(response.status).toBe(201)
        expect(response.body).toEqual({
            status: "201",
            mensagem: "usuario criando com sucesso",
            detalhes: {
                firstname: "Maria",
                surname: "Eduarda",
                email: 'maria.eduarda@example.com'
            }
        })

      });

//Teste do metodo PUT
      test('Atualizando usuario com token invalido', async ()=>{
        const response = await request(app)
        .put('/v1/usuarios/1')
        .set('Authorization', 'tokenInvalido') 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
        })

        expect(response.status).toBe(401)
        expect(response.body).toEqual({
            status: "401",
            mensagem: "Token invalido"
        })

      })


      test('Atualizando sem enviar informações', async ()=>{
        const response = await request(app)
        .put('/v1/usuarios/1')
        .set('Authorization', token) 
        .send({  })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({
            status: "400",
            mensagem: "todos os campos não podem esta vazio"
        })

      })


      test('Atualizando informações com usuario invalido', async ()=>{
        const response = await request(app)
        .put('/v1/usuarios/41235')
        .set('Authorization', token) 
        .send({ 
            firstname: 'Maria' ,
            surname: 'Eduarda',
         })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            status: "404",
            mensagem: "Usario não encotrado"
        })

      })

      test('Atualizando sem enviar informações', async ()=>{
        const response = await request(app)
        .put('/v1/usuarios/1')
        .set('Authorization', token) 
        .send({  })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({
            status: "400",
            mensagem: "todos os campos não podem esta vazio"
        })

      })


      test('Atualizando  informações', async ()=>{
        usuarios.update = jest.fn();
        
       
        usuarios.update.mockResolvedValue({
            firstname: 'Eduarda',
            surname: 'Maria',
            email: 'eduarda@example.com',
        })

        const response = await request(app)
        .put('/v1/usuarios/22')
        .set('Authorization', token) 
        .send({ 
            firstname: 'Eduarda',
            surname: 'Maria',
            email: 'eduarda@example.com'
        })

        expect(response.status).toBe(204)

      })


// Teste metodos de DELET
      test('Deletando usuario sem', async ()=>{
        const response = await request(app)
        .delete('/v1/usuarios/22')
        .set('Authorization', 'tokenInvalido') 

        expect(response.status).toBe(401)
        expect(response.body).toEqual({ 
            status: '401', 
            mensagem: 'Token invalido' 
        })
      })

      test('Deletando Usuario invalido', async ()=>{
        const response = await request(app)
        .delete('/v1/usuarios/123473')
        .set('Authorization', token) 

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ 
            status: '404', 
            mensagem: 'Usuario com id= 123473 não foi encotrado' 
        })
      })

      test('Deletando Usuario', async ()=>{
        usuarios.destroy = jest.fn();

        usuarios.destroy.mockResolvedValue(4); // Simula uma deleção bem-sucedida
        const response = await request(app)
          .delete('/v1/usuarios/4')
          .set('Authorization', token);
    
        expect(response.status).toBe(204);
        
      })

})
