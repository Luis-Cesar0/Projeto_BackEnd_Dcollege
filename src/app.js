require('dotenv').config()
const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario')
const categoriaRoutes = require('./routes/categoria')
const userTokenRoutes = require('./routes/user.js')
app.use(express.json())

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.send('teste')
})

app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/user',userTokenRoutes)

// exportatnado a aplicação Express
module.exports = app;