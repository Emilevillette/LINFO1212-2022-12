const Product_mgmt = require("../scripts/product_management");

describe('Find products', () => {
    test('Find a non existent product', () => {
        const product = Product_mgmt.find_product('RTX 4090'); // :c
        expect(product).toBeFalsy();
    });

    test('Find a product that exists', () => {
        const product = Product_mgmt.find_product('Souris');
        expect(product).toBeTruthy();
    });
});

/*describe("Add a product to inventory",() => {
    test('Add a product',() => {
        Product_mgmt.add_product();
        const product = Product_mgmt.find_product(); // We try to find the new product to make sure its added
        expect(product).toBeDefined();
    })
})*/