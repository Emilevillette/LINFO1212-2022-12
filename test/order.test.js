const Order_mgmt = require("../scripts/order_management");

describe('Orders Testing',() => {
    /*beforeAll(() => {
        //Creates an order for testing
        Order_mgmt.create_order()
    })*/
    test('Get all orders',() => {
        const order = Order_mgmt.get_all_orders();
        expect(order).not.toBeNull();
    });
    test('Get order by number',() => {
        const order = Order_mgmt.get_order_by_number(1);
        expect(order).not.toBeNull();
    });
});