const Order_mgmt = require("../scripts/order_management");
const {Receipt} = require("../models/receipt");
const Product_mgmt = require("../scripts/product_management");

//https://codewithhugo.com/express-request-response-mocking/
const mockRequest = (body) => ({
    body
});


describe('Orders Testing',() => {
    beforeAll(async () => {
        /*//Creates a test product
        const req = mockRequest(
            {
                name: 'Test',
                description: 'Testing product',
                cautionAmount: 3000,
                category: 'Des PC portable et des tours',
                quantity: 1,
                imgLink: null
            }
        );
        await Product_mgmt.add_to_inventory(req);*/

        //Creates an order for testing
        const req2 = mockRequest(
            {
                address: "Test",
                email: "test@test.com",
                phone_number: "012345678",
                name: "Test"
            }
        );
        const item = {
            quantity: 1,
            start_date: "2022-12-25",
            end_date: "2022-12-31",
            name: "Test"
        }

        await Receipt.create();
        await Order_mgmt.create_order(req2, item, 1);
    });

    afterAll(async () => {
        //Delete the order ,receipt and product created for testing
        await Order_mgmt.delete_order(1);
        await Receipt.destroy({where: {id: 1}});
        // await Product_mgmt.delete_product('Test');
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
    /*
    This test requires to create a product but we got a race condition problem and I don't know how to fix it AHHH

    test('Mark an order as archived', async () => {
        const order = await Order_mgmt.mark_archived(1);
        expect(order["is_archived"]).toBeTruthy();
    });*/
    test('Mark an order as paid', async () => {
        const order = await Order_mgmt.mark_paid(1);
        expect(order["is_paid"]).toBeTruthy();
    });
    test('Set client pick up date', async () => {
        const order = await Order_mgmt.mark_picked_up(1,"2022-12-26");
        const date = new Date("2022-12-26");
        expect(order["date_client_pickup"]).toStrictEqual(date);
    });
    test('Set client drop off date', async () => {
        const order = await Order_mgmt.mark_dropped_off(1,"2022-12-31");
        const date = new Date("2022-12-31");
        expect(order["date_client_return"]).toStrictEqual(date);
    });
});