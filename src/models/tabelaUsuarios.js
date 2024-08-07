import sequelize from '../config/conexao.js'
import { DataTypes } from('sequelize');

// Definindo o modelo Usuario
const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  // Sincronizando o modelo com o banco de dados
  sequelize.sync()
    .then(() => {
      console.log('Tabelas usuario  sincronizadas.');
    })
    .catch(err => {
      console.error('Erro ao sincronizar tabelas:', err);
    });

export default Usuario