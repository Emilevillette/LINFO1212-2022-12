const {Product, ProductModel, ProductCategory} = require("./product");
const {Receipt} = require("./receipt");
const {Orders} = require("./order");

//Initialize database
async function initDB(db) {
    console.log("Starting database:");
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        ProductModel.hasMany(Product, {
            //Upon ProductModel changing, all Product associated with that model get changed
            onUpdate: "cascade",
            onDelete: "set null" //Set null for security reasons
        });
        Product.belongsTo(ProductModel);

        ProductCategory.hasMany(ProductModel);
        ProductModel.belongsTo(ProductCategory, {
            //Upon ProductCategory changing, all ProductModel associated with that model get changed
            onUpdate: "cascade",
            onDelete: "set null" //Set null for security reasons
        });

        ProductModel.hasMany(Orders);
        Orders.belongsTo(ProductModel);

        Receipt.hasMany(Orders);
        Orders.belongsTo(Receipt);

        await db.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {initDB};