const express = require('express');
const app = express();
const usuarioRoutes = require('./func/getUser')

app.use(express.json())

//rotas

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.send('teste')
})

app.use('/usuarios', usuarioRoutes);

// exportatnado a aplicação Express
module.exports = app;