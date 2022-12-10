const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const ProductCategory = sequelize.define(
    "productCategory", {
        id: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey:true,
            defaultValue: "Other"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "No description for this product category",
        }
    }
);

const ProductModel = sequelize.define(
    "productModel", {
        id: {
            type: DataTypes.STRING, //https://sequelize.org/docs/v7/other-topics/other-data-types/ TEXT is equivalent to STRING
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "No description for this product type",
        },
        cautionAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
);

const Product = sequelize.define(
    "product", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false,
            validate: {
                isUUID: 1,
            }
        },
    }
);

module.exports = {Product, ProductModel, ProductCategory}
