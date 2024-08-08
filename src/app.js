const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario')
const categoriaRoutes = require('./routes/categoria')
app.use(express.json())

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.send('teste')
})

app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);

// exportatnado a aplicação Express
module.exports = app;