const sequelize = require('../config/conexao');
const { DataTypes } = require('sequelize');
const Produtos = require('./tabelaProdutos'); // Caminho correto

const OpcoesProduto = sequelize.define('opcoesProduto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produtos_id: { // Nome da coluna no banco de dados
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produtos,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        defaultValue: 'square'
    },
    radius: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        defaultValue: 'text'
    },
    values: {
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
}, {
    tableName: 'opcoesProduto' // Aqui você força o Sequelize a usar o nome correto da tabela
});


OpcoesProduto.belongsTo(Produtos, { as: 'produto', foreignKey: 'produtos_id' });
Produtos.hasMany(OpcoesProduto, { as: 'opcoesProduto', foreignKey: 'produtos_id' });


module.exports = OpcoesProduto;
