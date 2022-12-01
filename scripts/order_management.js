const {sequelize} = require("../config/database");
const {Orders} = require("../models/order");

async function get_all_orders() {
    return Orders.findAll({raw: true,});
}

module.exports = {get_all_orders}