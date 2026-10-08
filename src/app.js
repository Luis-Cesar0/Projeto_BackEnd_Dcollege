require('dotenv').config();
const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario');
const categoriaRoutes = require('./routes/categoria');
const loginRoutes = require('./routes/login');
const produtosRoutes = require('./routes/produtos');
const cors = require('cors');

app.disable('x-powered-by');
app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : true,
}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo',
  });
});

app.use('/v1/usuarios', usuarioRoutes);
app.use('/v1/categorias', categoriaRoutes);
app.use('/v1/user', loginRoutes);
app.use('/v1/produtos', produtosRoutes);

app.use((req, res) => res.status(404).json({ status: '404', mensagem: 'Rota não encontrada.' }));

app.use((error, req, res, next) => {
  if (error && error.type === 'entity.too.large') {
    return res.status(413).json({ status: '413', mensagem: 'Corpo da requisição muito grande.' });
  }
  if (error && error.type === 'entity.parse.failed') {
    return res.status(400).json({ status: '400', mensagem: 'JSON inválido.' });
  }
  if (res.headersSent) return next(error);
  return res.status(500).json({ status: '500', mensagem: 'Erro interno do servidor.' });
});

module.exports = app;
