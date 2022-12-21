const Order_mgmt = require("../scripts/order_management");

//https://codewithhugo.com/express-request-response-mocking/
const mockRequest = (body) => ({
    body
});

//Not done

describe('Orders Testing',() => {
    beforeAll(async () => {
        //Creates an order for testing
        const req = mockRequest(
            {
                adress: "Test",
                email: "test@test.com",
                phone_number: "000000000",
                name: "Test"
            }
        );
        const item = {
            quantity: 1,
            start_date: "22-12-2022",
            end_date: "25-12-2022",
            name: "Test"
        }
        await Order_mgmt.create_order(req, item,1);
    })
    test('Get all orders',async () => {
        const order = await Order_mgmt.get_all_orders();
        expect(order).toBeDefined();
    });
    test('Get order by number',async () => {
        const order = await Order_mgmt.get_order_by_number(1);
        expect(order).toBeDefined();
    });
});