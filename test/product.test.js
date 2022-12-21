const Product_mgmt = require("../scripts/product_management");

//https://codewithhugo.com/express-request-response-mocking/
const mockRequest = (body) => ({
    body
});

describe('Find products', () => {
    beforeAll(async () => {
        //Creates a test product
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
        await Product_mgmt.add_to_inventory(req);
    });

    afterAll(async () => {
        //Deletes the test product
        await Product_mgmt.delete_product('Test');
    });

    test('Find a non existent product', async () => {
        const product = await Product_mgmt.find_product('RTX 4090'); // :c
        expect(product).toBeFalsy();
    });

    test('Find a product that exists', async () => {
        const product = await Product_mgmt.find_product('Test');
        expect(product).toBeTruthy();
    });
});

describe("Add a product to inventory",() => {
    afterAll(() => {
        //Deletes the test product
        Product_mgmt.delete_product('RTX 4090');
    });
    test('Add a product', async () => {
        const req = mockRequest(
            {
                name: 'RTX 4090',
                description: 'The most wanted',
                cautionAmount: 3000,
                category: 'Des PC portable et des tours',
                quantity: 1,
                imgLink: null
            }
        );
        await Product_mgmt.add_to_inventory(req);
        // We try to find the new product to make sure its added
        const product = await Product_mgmt.find_product('RTX 4090');
        expect(product).toBeTruthy();
    })
});