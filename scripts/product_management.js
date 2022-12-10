const {ProductCategory, ProductModel, Product} = require("../models/product");

/**
 * Adds a new category of products to the database
 *
 * @param name category's name
 * @param description product's description
 * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
 */
async function add_category(name, description) {
    return ProductCategory.create({
        id: name,
        description: description,
    });
}

/**
 * Adds a new model of products to the database
 *
 * @param name model's name
 * @param description product's description
 * @param cautionAmount
 * @param category
 * @param quantity
 * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
 */
async function add_model(name, description, cautionAmount, category, quantity) {
    return ProductModel.create({
        id: name,
        description: description,
        cautionAmount: cautionAmount,
        quantity: quantity,
        productCategoryId: category,
    });
}


/**
 * Adds a new product of the model given
 *
 * @param model product's model
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
async function add_product(model) {
    return await Product.create({
        productModelId: model,
    });
}

/**
 * Finds if a product exists
 *
 * @param name product's model
 * @returns {Promise<boolean>}
 */
async function find_product(name) {
    const product = await ProductModel.findByPk(name);
    return product !== null;
}

/**
 * Add mutiple products at a time
 * @param qty quantity
 * @param name model
 * @returns {Promise<Model<*, TModelAttributes>>}
 */
async function add_multiple_products(qty, name) {
    for (let i = 0; i < qty; i++) {
        await add_product(name);
    }
}

/**
 * Adds a new model of products the database
 *
 * @param req all queries entered by the admin
 * @returns {Promise<Model<*, TModelAttributes>|*>}
 */
async function add_to_inventory(req) {
    if (await find_product(req.body.name) === false) {
        await add_model(req.body.name, req.body.description, req.body.cautionAmount, req.body.category, req.body.quantity);
        return add_multiple_products(req.body.quantity, req.body.name);
    } else {
        await add_multiple_products(req.body.quantity, req.body.name);
        return ProductModel.increment('quantity', {
            by: req.body.quantity,
            where: {
                id: req.body.name,
            }
        });
    }
}

async function get_all_products(options) {
    return ProductModel.findAll({raw: true});
}

async function get_all_categories(options) {
    return ProductModel.findAll({raw: true});
}

module.exports = {add_category, add_model, add_product, add_to_inventory, get_all_products, find_product, get_all_categories}