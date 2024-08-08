const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario')

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
  res.send('teste')
})

app.use('/usuarios', usuarioRoutes);

// exportatnado a aplicação Express
module.exports = app;