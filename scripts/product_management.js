const {ProductCategory, ProductModel, Product} = require("../models/product");

async function add_category(name, description) {
    return ProductCategory.create({
        id: name,
        description: description,
    });
}

async function add_model(name, description, cautionAmount, category) {
    return ProductModel.create({
        id: name,
        description: description,
        cautionAmount: cautionAmount,
        ProductCategory: category,
    });
}

async function add_product(name, model) {
    return Product.create({
        id: name,
        ProductModel: model,
    })
}

module.exports = {add_category, add_model, add_product}