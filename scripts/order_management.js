const {Orders} = require("../models/order");
const {Product, ProductModel} = require("../models/product");
const {get_n_products} = require("./product_management");
const {extract_values} = require("./other_utils");
const {DataTypes} = require("sequelize");
const {Receipt} = require("../models/receipt");

/**
 * Get all orders from the database
 *
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_all_orders() {
    return Orders.findAll({raw: true});
}


/** Find order by number
 *
 * @param order_number
 * @returns {Promise<Model<any, TModelAttributes> | null>}
 */
async function get_order_by_number(order_number) {
    return Orders.findByPk(order_number, {raw: true});
}

async function get_receipt_by_number(receipt_number) {
    return Receipt.findByPk(receipt_number, {raw: true});
}

/**
 * Creates a new client order
 *
 * @param req all the queries entered by the client
 * @param item
 * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
 */
async function create_order(req, item, receiptNo) {
    await Orders.create({
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
        name: req.body.name,
        quantity: item["quantity"],
        start_date: item["start_date"],
        end_date: item["end_date"],
        productModelId: item["name"],
        productId: extract_values(await get_n_products(item["name"], item["quantity"], true, ["id"]), ["id"]),
        receiptNCommande: receiptNo,
        is_archived: false,
        is_payed: false,
    });
    await ProductModel.decrement("quantity", {
        by: item["quantity"],
        where: {
            id: item["name"],
        }
    })
}


/** One order per product in cart
 *
 * @param req
 * @returns {Promise<void>}
 */
async function create_batch_orders(req) {
    let receipt = await Receipt.create();
    for (let element in req.cookies.cart) {
        create_order(req, req.cookies.cart[element], receipt["n_commande"]);
    }
}

/**
 * Get all receipts from the database
 *
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_all_receipts() {
    return Receipt.findAll({raw: true});
}


async function get_orders_by_receipt_number(receiptno) {
    return Orders.findAll({
        raw: true, where: {
            receiptNCommande: receiptno,
        }
    });
}

async function mark_archived(orderno) {
    let order = await Orders.findByPk(orderno);
    order.is_archived = !order.is_archived;
    if(order.is_archived === true) {
        await ProductModel.increment("quantity", {
            by: order["quantity"],
            where: {
                id: order["productModelId"],
            }
        });
    } else {
        await ProductModel.decrement("quantity", {
            by: order["quantity"],
            where: {
                id: order["productModelId"],
            }
        });
    }
    return order.save();
}

async function mark_payed(orderno) {
    let order = await Orders.findByPk(orderno);
    order.is_payed = !order.is_payed;
    return order.save();
}

async function mark_picked_up(orderno, date) {
    let order = await Orders.findByPk(orderno);
    order.date_client_pickup = new Date(date);
    return order.save();
}

async function mark_dropped_off(orderno, date) {
    let order = await Orders.findByPk(orderno);
    order.date_client_return = new Date(date);
    return order.save();
}

module.exports = {
    get_all_orders,
    create_order,
    get_order_by_number,
    get_receipt_by_number,
    create_batch_orders,
    get_all_receipts,
    get_orders_by_receipt_number,
    mark_archived,
    mark_payed,
    mark_picked_up,
    mark_dropped_off
}