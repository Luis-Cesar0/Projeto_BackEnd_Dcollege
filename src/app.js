require('dotenv').config()
const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario')
<<<<<<< HEAD
const routerProduct = require('./routes/produtos')

=======
const categoriaRoutes = require('./routes/categoria')
>>>>>>> main
app.use(express.json())

// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.send('teste')
})

<<<<<<< HEAD
app.use('/usuarios', usuarioRoutes)
app.use('/categorias', routerProduct)
=======
app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
>>>>>>> main

// exportatnado a aplicação Express
module.exports = app;