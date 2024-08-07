const sequelize =require('../config/conexao')
const { DataTypes } = require('sequelize')

// Definindo o modelo Usuario
const usuario = sequelize.define('usuarios', {
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

module.exports = usuario