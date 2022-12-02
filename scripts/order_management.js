const {sequelize} = require("../config/database");
const {Orders} = require("../models/order");

async function get_all_orders() {
    return Orders.findAll({raw: true,});
}

async function create_order(req) {
    return Orders.create({
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
        name: req.body.name,
        items: req.body.items,
        quantity: req.body.quantity,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    })
}

module.exports = {get_all_orders, create_order}