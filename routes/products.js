const express = require("express");
const router = express.Router();

const Product_mgmt = require("../scripts/product_management");

/*********************************** Product pages ***********************************/

/**
 * Categories
 */

router.get("/category", async function (req, res) {
    let categories = await Product_mgmt.get_all_categories();
    res.render("pages/category", {categories: categories});
});
/*
//useless ?
router.get("/get_all_categories", async function (req, res) {
    let categories = await Product_mgmt.get_all_categories();
    res.json(categories);
});*/

/**
 * products filtered by category
 */

router.get("/product", async function (req, res) {
    let products = await Product_mgmt.get_all_products_in_category(req.query.category);
    console.log(products);
    res.render("pages/products", {products: products, category: req.query.category});
});

module.exports = router;