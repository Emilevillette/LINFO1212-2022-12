const {DataTypes, Model} = require("sequelize");

const {sequelize} = require("../config/database");

class Recu extends Model {
}

Recu.init({
    n_commande: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    commande: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Commandes,
            key: 'commandeID'
        }
    }
}, ({sequelize}));