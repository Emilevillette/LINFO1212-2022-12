const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const Product = sequelize.define(
    "product", {
        "id" :{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
            allowNull: false,
            validate: {
                isUUID: 1,
            }
        },
        "description": {
            type: DataTypes.TEXT,
            defaultValue: "Pas de description",
            allowNull: true,
        },
    }
)