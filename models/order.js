const {DataTypes} = require("sequelize");

const {sequelize} = require("../config/database");

const Orders = sequelize.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    date_client_pickup: {
        type: DataTypes.DATE,
        allowNull: true
    },
    date_client_return: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_payed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    is_archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /**comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },*/
    productId: {
        //https://stackoverflow.com/questions/41860792/how-can-i-have-a-datatype-of-array-in-mysql-sequelize-instance
        type: DataTypes.STRING,
        get() {
            return this.getDataValue("productId").split(';')
        },
        set(ids) {
            this.setDataValue("productId", ids.join(';'))
        }
    }
});


module.exports = {Orders};