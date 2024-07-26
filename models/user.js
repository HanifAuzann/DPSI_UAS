const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    User_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true, 
        unique: true
    },
    Nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'pelanggan'),
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

module.exports = User;