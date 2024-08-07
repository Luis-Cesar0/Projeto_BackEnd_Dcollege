import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('railway', 'root', 'CIREobKtrYwudjCLeADoBehkUikHExdx', 
{
  host: 'monorail.proxy.rlwy.net',
  dialect: 'mysql'
}
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

export default sequelize