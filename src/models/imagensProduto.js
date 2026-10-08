const sequelize = require('../config/conexao'); // Certifique-se de que o caminho esteja correto
const { DataTypes } = require('sequelize');
const Produtos = require('./tabelaProdutos'); // Certifique-se de que o caminho esteja correto

const ImagensProduto = sequelize.define('imagensProdutos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produtos,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    path: {
        type: DataTypes.TEXT,
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

ImagensProduto.belongsTo(Produtos, { as: 'produto', foreignKey: 'product_id' });
Produtos.hasMany(ImagensProduto, { as: 'imagensProdutos', foreignKey: 'product_id' });


module.exports = ImagensProduto;
