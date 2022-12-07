const {ProductCategory, ProductModel, Product} = require("../models/product");

async function add_category(name, description) {
    return ProductCategory.create({
        id: name,
        description: description,
    });
}

async function add_model(name, description, cautionAmount, category, quantity) {
    return ProductModel.create({
        id: name,
        description: description,
        cautionAmount: cautionAmount,
        quantity: quantity,
        ProductCategory: category,
    });
}

async function add_product(name, model) {
    return Product.create({
        id: name,
        ProductModel: model,
    })
}

async function find_product(name) {
    const product = await ProductModel.findByPk(name);
    if (product === undefined) {
        return false;
    } else {
        return true;
    }
}

async function add_to_inventory(req) {
    if (await find_product(req.body.Mod) === false) {
        return add_model(req.body.Mod, req.body.Description, req.body.CautionAmount, req.body.Category);
    } else {
        return ProductModel.increment('quantity', {
            by: req.body.quantity,
            where: {
                id: req.body.Mod,
            }
        });
    }
}

module.exports = {add_category, add_model, add_product, add_to_inventory}