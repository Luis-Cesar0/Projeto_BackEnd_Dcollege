import express from 'express'
import objTeste from './objTeste.js'
import responses from './responses.js'
const app = express()

app.use(express.json())

//rotas

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.send('deu certo')
    
})

// exportatnado a aplicação Express
export default app