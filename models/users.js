const {DataTypes} = require("sequelize");

const {sequelize} = require("../config/database");

const Users = sequelize.define("users", {
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
    }
}, {});

module.exports = Users;