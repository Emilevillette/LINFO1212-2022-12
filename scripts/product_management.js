const {ProductCategory, ProductModel, Product} = require("../models/product");
const {sequelize} = require("../config/database");

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
async function add_model(name, description, cautionAmount, category, quantity, imgLink) {
    return ProductModel.create({
        id: name,
        description: description,
        cautionAmount: cautionAmount,
        quantity: quantity,
        productCategoryId: category,
        imgLink: imgLink,
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
        await add_model(req.body.name, req.body.description, req.body.cautionAmount, req.body.category, req.body.quantity, req.body.imgLink);
        return add_multiple_products(req.body.quantity, req.body.name);
    } else {
        await add_multiple_products(req.body.quantity, req.body.name);
        return ProductModel.increment("quantity", {
            by: req.body.quantity,
            where: {
                id: req.body.name,
            }
        });
    }
}


/** Returns all product models
 *
 * @param options
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_all_products(options) {
    return ProductModel.findAll({raw: true});
}

/** Returns all categories
 *
 * @param options
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_all_categories(options) {
    return ProductCategory.findAll({raw: true});
}


/** Returns all product models in category
 *
 * @param categoryId
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_all_products_in_category(categoryId) {
    console.log(categoryId);
    return ProductModel.findAll({where: {productCategoryId: categoryId}, raw: true});
}

/** Returns quantity in stock for a given product model
 *
 * @param productModel
 * @returns {Promise<*>}
 */
async function get_available_quantity(productModel) {
    return (await ProductModel.findByPk(productModel)).quantity;
}


/** Returns n products from products model
 *
 * @param productModel
 * @param quantity how many
 * @param random randomize ?
 * @param attributes which attributes to select
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_n_products(productModel, quantity, random = false, attributes = undefined) {
    return Product.findAll({
        where: {"productModelId": productModel},
        limit: quantity,
        order: random ? sequelize.random() : undefined,
        raw: true,
        attributes: attributes
    })
}

async function delete_product(produitmodel){
    await ProductModel.destroy({
        where: {id : produitmodel}
    });
};

module.exports = {
    add_category,
    add_model,
    add_product,
    add_to_inventory,
    get_all_products,
    find_product,
    get_all_categories,
    get_all_products_in_category,
    get_available_quantity,
    delete_product,
    get_n_products
};