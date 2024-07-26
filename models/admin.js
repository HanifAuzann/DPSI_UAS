const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 
const User = require('./user');

const Admin = sequelize.define('Admin', {
    ID_Admin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
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
    Nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

Admin.belongsTo(User, { foreignKey: 'User_ID' });
User.hasOne(Admin, { foreignKey: 'User_ID' });
module.exports = Admin;