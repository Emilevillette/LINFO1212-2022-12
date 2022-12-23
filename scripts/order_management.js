const {Orders} = require("../models/order");
const {ProductModel} = require("../models/product");
const {get_n_products} = require("./product_management");
const {extract_values} = require("./other_utils");
const {Receipt} = require("../models/receipt");

/**
 * Get all orders from the database
 *
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_all_orders() {
    return await Orders.findAll({raw: true});
}


/**
 * Find order by number
 *
 * @param order_number
 * @returns {Promise<Model<any, TModelAttributes> | null>}
 */
async function get_order_by_number(order_number) {
    return await Orders.findByPk(order_number, {raw: true});
}

async function get_receipt_by_number(receipt_number) {
    return await Receipt.findByPk(receipt_number, {raw: true});
}

/**
 * Creates a new client order
 *
 * @param req all the queries entered by the client
 * @param item the item that the client is trying to rent
 * @param receiptNo receipt number
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
        receiptId: receiptNo,
        is_archived: false,
        is_paid: false,
    });
    await ProductModel.decrement("quantity", {
        by: item["quantity"],
        where: {
            id: item["name"],
        }
    })
}

/**
 * Creates a complete order with all items in cart
 *
 * @param cart
 * @returns {Promise<void>}
 */
async function create_batch_orders(cart) {
    let receipt = await Receipt.create();
    for (let element in cart.cookies.cart) {
        await create_order(cart, cart.cookies.cart[element], receipt["id"]);
    }
}

/**
 * Gets the latest order
 *
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
async function get_latest_order() {
    return await Receipt.findOne({
        order: [ [ 'id', 'DESC' ]]
    });
}

/**
 * Get all receipts from the database
 *
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_all_receipts() {
    return await Receipt.findAll({raw: true});
}

/**
 * Get all orders with the given receipt number
 *
 * @param receiptno the receipt number
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function get_orders_by_receipt_number(receiptno) {
    return await Orders.findAll({
        raw: true,
        where: {
            receiptId: receiptno
        }
    });
}

/**
 * Mark an order as archived
 *
 * @param orderno order number
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
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

/**
 * Mark an order as paid
 *
 * @param orderno order number
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
async function mark_paid(orderno) {
    let order = await Orders.findByPk(orderno);
    order.is_paid = !order.is_paid;
    return order.save();
}

/**
 * Mark the order as picked up
 *
 * @param orderno order number
 * @param date date that the client picks up his orders
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
async function mark_picked_up(orderno, date) {
    let order = await Orders.findByPk(orderno);
    order.date_client_pickup = new Date(date);
    return order.save();
}

/**
 * Mark the order as dropped off
 *
 * @param orderno order number
 * @param date date that the client drops off his rented items
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
async function mark_dropped_off(orderno, date) {
    let order = await Orders.findByPk(orderno);
    order.date_client_return = new Date(date);
    return order.save();
}

async function delete_order(orderno){
    await Orders.destroy({
        where: {
            id : orderno
        }
    });
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
    mark_paid,
    mark_picked_up,
    mark_dropped_off,
    get_latest_order,
    delete_order
}