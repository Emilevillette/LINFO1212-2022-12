const {Orders} = require("../models/order");

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
 * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
 */
async function create_order(req) {
    return Orders.create({
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
        name: req.body.name,
        items: req.body.items,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    });
}

module.exports = {get_all_orders, create_order, get_order_by_number}