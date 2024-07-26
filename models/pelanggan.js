const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const Pelanggan = sequelize.define('pelanggan', {
    ID_Pelanggan: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'User_ID'
        }
    },
    Nama_Pelanggan: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    Telepon: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Pelanggan.belongsTo(User, { foreignKey: 'User_ID' });
User.hasOne(Pelanggan, { foreignKey: 'User_ID' });

module.exports = Pelanggan;