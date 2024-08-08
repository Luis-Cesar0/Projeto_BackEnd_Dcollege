const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'CIREobKtrYwudjCLeADoBehkUikHExdx', 
{
  host: 'monorail.proxy.rlwy.net',
  dialect: 'mysql',
  port: 11097
}
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports= sequelize