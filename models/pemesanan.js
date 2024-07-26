const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('./index');

const Pemesanan = sequelize.define('pemesanan', {
    ID_Pemesanan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total_pesanan: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Pemesanan;