const sequelize = require('../config/conexao')
const { DataTypes } = require('sequelize')
const produtos = require('./tabelaProdutos')

const imagensProduto = sequelize.define('imagensProduto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }

});

imagensProduto.belongsTo(produtos);
produtos.hasMany(imagensProduto);

sequelize.sync()
    .then(() => {
        console.log('Tabelas imagensProduto sincronizadas.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar tabelas:', err);
    });

module.exports = imagensProduto