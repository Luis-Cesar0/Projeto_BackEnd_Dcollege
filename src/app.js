import express from 'express'
import objTeste from './objTeste.js'
import responses from './responses.js'
const app = express()

app.use(express.json())

//rotas
app.get('/buscaId/:id',(req,res) => {
    let id = req.params.id
    let obj = objTeste.find((obj) => obj.id == id)
    if(obj){
        res.send({message: responses.success, obj})
    }else{
        res.send({message: responses.badRequest})
    }
})

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.send('deu certo')
    
})

// exportatnado a aplicação Express
export default app