const Product_mgmt = require("../scripts/product_management");

describe('Find products', () => {
    test('Find a non existent product', async () => {
        const product = await Product_mgmt.find_product('RTX 4090'); // :c
        expect(product).toBeFalsy();
    });

    test('Find a product that exists', async () => {
        const product = await Product_mgmt.find_product('Souris');
        expect(product).toBeTruthy();
    });
});

//https://codewithhugo.com/express-request-response-mocking/
const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body
});

describe("Add a product to inventory",() => {
    afterAll(() => {
        //Deletes the test product
        Product_mgmt.delete_product('RTX 4090');
    });
    test('Add a product', async () => {
        const req = mockRequest(
            {},
            {
                name: 'RTX 4090',
                description: 'The most wanted',
                cautionAmount: 3000,
                category: 'Des PC portable et des tours',
                quantity: 1,
                imgLink: 'rtx.png',
            }
        );
        await Product_mgmt.add_to_inventory(req);
        const product = await Product_mgmt.find_product('RTX 4090'); // We try to find the new product to make sure its added
        expect(product).toBeTruthy();
    })
});