const {DataTypes, Model} = require("sequelize");

const {sequelize} = require("../config/database");

class Receipt extends Model {
}

Receipt.init({
    n_commande: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    }
}, ({sequelize}));

module.exports = Receipt;