require('dotenv').config()
const express = require('express');
const app = express()
const usuarioRoutes = require('./routes/usuario')
const categoriaRoutes = require('./routes/categoria')
const loginRoutes = require('./routes/login.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.json({
    message: 'Bem-vindo',
});
})

app.use('/usuarios', usuarioRoutes);
app.use(categoriaRoutes);
app.use('/user',loginRoutes)

// exportatnado a aplicação Express
module.exports = app;