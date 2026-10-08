const app = require('./app');
const sequelize = require('./config/conexao');

const port = Number(process.env.PORT || 3000);

async function start() {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT deve ser um número entre 1 e 65535.');
  }
  const jwtSecret = process.env.JWT_SECRET || process.env.KEY_TOKEN;
  if (!jwtSecret || Buffer.byteLength(jwtSecret, 'utf8') < 32) {
    throw new Error('JWT_SECRET deve conter pelo menos 32 bytes.');
  }

  await sequelize.authenticate();
  // Sem alter/force: cria apenas tabelas ausentes e preserva tabelas existentes.
  await sequelize.sync();

  const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await sequelize.close();
      process.exit(0);
    });
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}

start().catch((error) => {
  console.error('Falha ao iniciar a aplicação. Verifique banco e configuração.');
  console.error(error.message);
  process.exitCode = 1;
});
