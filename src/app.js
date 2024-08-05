import express from 'express'
const app = express()

//rotas

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
    res.send('Bem vindo ao meu site!')
})

// exportatnado a aplicação Express
export default app