const {DataTypes} = require("sequelize");

const {sequelize} = require("../config/database");

const Receipt = sequelize.define("receipt", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = {Receipt};