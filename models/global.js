const {Product, ProductModel, ProductCategory} = require("./product");
const {Users} = require("./users");
const {Receipt} = require("./receipt");
const {Orders, Quantity} = require("./order");

//Initialize database
async function initDB(db) {
    console.log("Starting database:");
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        Product.belongsTo(ProductModel,);
        ProductModel.belongsTo(ProductCategory,);
        ProductModel.hasMany(Product,);
        ProductCategory.hasMany(ProductModel,);

        ProductModel.hasMany(Orders);
        Orders.belongsTo(ProductModel);

        Orders.belongsTo(Receipt);
        Receipt.hasMany(Orders);

        //Product.hasMany(Orders);
        //Orders.belongsTo(Product);
        //Product.hasMany(Quantity);
        //Orders.hasMany(Quantity);

        await db.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {initDB};