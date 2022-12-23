const Order_mgmt = require("../scripts/order_management");
const {Receipt} = require("../models/receipt");

//https://codewithhugo.com/express-request-response-mocking/
const mockRequest = (body) => ({
    body
});


describe('Orders Testing',() => {
    beforeAll(async () => {
        //Creates an order for testing
        const req = mockRequest(
            {
                address: "Test",
                email: "test@test.com",
                phone_number: "012345678",
                name: "Test"
            }
        );
        const item = {
            id: 1,
            quantity: 1,
            start_date: "2022-12-25",
            end_date: "2022-12-31",
            name: "Test"
        }
        await Receipt.create()
        await Order_mgmt.create_order(req, item, 1);
    });

    afterAll(async () => {
        //Delete the order and receipt created for testing
        await Order_mgmt.delete_order(1);
        await Receipt.destroy({where: {id: 1}});
    });

    test('Get all orders',async () => {
        const order = await Order_mgmt.get_all_orders();
        expect(order).not.toBeNull();
    });
    test('Get order by number',async () => {
        //Table Orders in db
        const order = await Order_mgmt.get_order_by_number(1);
        expect(order).not.toBeNull();
    });
    test('Get the latest complete order created',async () => {
        //Table Receipt in db
        const order = await Order_mgmt.get_latest_order();
        expect(order["id"]).toBe(1);
    });
});