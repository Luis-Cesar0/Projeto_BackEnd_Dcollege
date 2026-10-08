
const { Sequelize } = require('sequelize');

require('dotenv').config();

const requiredVariables = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST', 'DB_DIALECT'];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0 && process.env.NODE_ENV !== 'test') {
  throw new Error(`Variáveis de banco ausentes: ${missingVariables.join(', ')}`);
}

const port = Number(process.env.DB_PORT || 3306);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DB_PORT deve ser um número entre 1 e 65535.');
}
if (process.env.DB_DIALECT && process.env.DB_DIALECT !== 'mysql') {
  throw new Error('DB_DIALECT deve ser mysql.');
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'auth_api_test',
  process.env.DB_USER || 'test',
  process.env.DB_PASS || 'test',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    port,
    logging: false,
  },
);

module.exports = sequelize;
