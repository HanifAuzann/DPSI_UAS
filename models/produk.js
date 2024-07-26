const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Produk = sequelize.define('produk', {
    kode_produk: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_produk: {
        type: DataTypes.STRING,
        allowNull: false
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stok: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Produk;