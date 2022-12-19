const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const urlencodedParser = bodyparser.urlencoded({extended: true});

const Order_mgmt = require("../scripts/order_management");

router.use(cookieParser());
/*********************************** Clients pages ***********************************/
/********* Checkout *********/

/**
 * Cart page
 */

router.get("/cart", function (req, res) {
    res.render("pages/cart", {cart: req.cookies.cart});
});

/**
 * Add product to cart
 */
router.post("/add_to_cart", urlencodedParser, function (req, res) {
    if (!req.cookies.cart) {
        req.cookies.cart = {};
    }
    req.cookies.cart[req.body.product_model] = {
        name: req.body.product_model,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        quantity: req.body.quantity,
    };
    res.cookie("cart", req.cookies.cart, {secure: true, maxAge: 86400000, httpOnly: true, sameSite: "strict"});
    res.redirect("back"); // redirect to the same page
});

/**
 * Removes element from the cart cookie
 */
router.post("/remove_from_cart", urlencodedParser, function (req, res) {
    if (req.body.product in req.cookies.cart) {
        delete req.cookies.cart[req.body.product];
        res.cookie("cart", req.cookies.cart, {secure: true, maxAge: 86400000, httpOnly: true, sameSite: "strict"});
    }
    res.redirect("/cart");
});

/**
 * Checkout
 */

router.get("/checkout", function (req, res) {
    //User adds his information and clicks on the validate button
    res.render("pages/user_info");
});

/**
 * Create new order
 */

router.post("/new_order", urlencodedParser, async function (req, res) {
    //For all items in cart create an order of the same person then create a receipt with the order number
    let receiptid = await Order_mgmt.create_batch_orders(req);

    res.clearCookie("cart");
    res.redirect(`/order_completed?receiptno=${receiptid}`);
});

router.get("/next_order_no", urlencodedParser, async function(req, res){
    res.json({orderno: (await Order_mgmt.get_latest_order())["n_commande"]});
});

//Order completed
router.get('/order_completed',function (req,res){
    let order_number = req.session.order_number;
    res.render('pages/order',{order_number: req.query.receiptno});
});



/**
 * Main page
 */

router.get("/", function (req, res) {
    if (req.session.cart === undefined) req.session.cart = [];
    res.render("pages/index");
});

module.exports = router;