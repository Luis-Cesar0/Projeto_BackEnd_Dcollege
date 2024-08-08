const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario')
const routerProduct = require('./routes/produtos')

app.use(express.json())


// rota padrão para testar as configurações 
app.get('/',(req,res) => {
  res.send('teste')
})

app.use('/usuarios', usuarioRoutes)
app.use('/categorias', routerProduct)

// exportatnado a aplicação Express
module.exports = app;