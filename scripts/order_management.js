const {Orders} = require("../models/order");
const {Product} = require("../models/product");
const {get_n_products} = require("./product_management");
const {extract_values} = require("./other_utils");
const {DataTypes} = require("sequelize");

/**
 * Get all orders from the database
 *
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_all_orders() {
    return Orders.findAll({raw: true});
}

async function get_order_by_number(order_number) {
    return Orders.findByPk(order_number, {raw: true});
}

/**
 * Creates a new client order
 *
 * @param req all the queries entered by the client
 * @param item
 * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
 */
async function create_order(req, item) {
    //console.log(extract_values(await get_n_products(item["name"], item["quantity"], true, ["id"]), "id"));
    return Orders.create({
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
        name: req.body.name,
        quantity: item["quantity"],
        start_date: item["start_date"],
        end_date: item["end_date"],
        productModelId: item["name"],
        productId:extract_values(await get_n_products(item["name"], item["quantity"], true, ["id"]), ["id"]),
    });
}

async function create_batch_orders(req) {
    for (let element in req.cookies.cart) {
        console.log(req.cookies.cart[element]);
        create_order(req, req.cookies.cart[element]);
    }
}

module.exports = {get_all_orders, create_order, get_order_by_number, create_batch_orders}