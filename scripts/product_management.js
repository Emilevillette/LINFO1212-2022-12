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
        ProductCategory: category,
    });
}


/**
 * Adds a new product of the model given
 *
 * @param name product's name
 * @param model product's model
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
async function add_product(name, model) {
    return await Product.create({
        id: name,
        ProductModel: model,
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
    return product !== undefined;
}

/**
 * Adds a new model of products the database
 *
 * @param req all queries entered by the admin
 * @returns {Promise<Model<*, TModelAttributes>|*>}
 */
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