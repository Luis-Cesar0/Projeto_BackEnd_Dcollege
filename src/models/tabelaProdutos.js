const sequelize =require('../config/conexao')
const { DataTypes } = require('sequelize')
// Definindo o modelo Usuario
const produtos = sequelize.define('produtos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    enabled: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price_with_discount:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  });
  
  // Sincronizando o modelo com o banco de dados
  sequelize.sync()
    .then(() => {
      console.log('Tabelas produtos sincronizadas.');
    })
    .catch(err => {
      console.error('Erro ao sincronizar tabelas:', err);
    });

    module.exports= produtos