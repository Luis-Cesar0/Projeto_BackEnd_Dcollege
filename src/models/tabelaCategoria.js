const sequelize =require('../config/conexao')
const { DataTypes } = require('sequelize')

// Definindo o modelo Usuario
const categoria = sequelize.define('categorias', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN
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
      console.log('Tabelas categoria sincronizadas.');
    })
    .catch(err => {
      console.error('Erro ao sincronizar tabelas:', err);
    });

    module.exports= categoria