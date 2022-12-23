const {DataTypes} = require("sequelize");

const {sequelize} = require("../config/database");

const Admins = sequelize.define("admins", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
        primaryKey: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_main_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
}, {});

module.exports = {Admins};