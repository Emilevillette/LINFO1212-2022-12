const {DataTypes, Model} = require("sequelize");

const {sequelize} = require("../config/database");

const Receipt = sequelize.define("receipt", {
    n_commande: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }
});

module.exports = {Receipt};