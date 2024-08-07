import express from 'express'
import objTeste from './objTeste.js'
import Usuario from './models/tabelaUsuarios.js'
import Produtos from './models/tabelaProdutos.js'
import Categoria from './models/tabelaCategoria.js'
import buscaId from './config/buscaId.js'
import responses from './responses.js'
const app = express()

app.use(express.json())

// //rota para buscar por id usuario
// app.get('/usuarios/:id', (req, res) => {
//   let id = req.params.id
//   let obj = buscaId(Usuario,id)
//   res.send(obj)
// })

// //rota para buscar por id produto
// app.get('/produtos/:id', (req, res) => {
//   let id = req.params.id
//   let obj = buscaId(Produtos,id)
//   res.send(obj)
// })

// // Criar endpoint para obter informações da categoria pelo ID
// app.get('/categorias/:id', (req, res) => {
//   let id = req.params.id
//   let obj = buscaId(Categoria,id)
//   res.send(obj)
// })

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.send('deu certo')
    
})

// exportatnado a aplicação Express
export default app