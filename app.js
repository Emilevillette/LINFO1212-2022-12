const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const urlencodedParser = bodyparser.urlencoded({extended: true});
const path = require('path');

const https = require('https');
const fs = require('fs');

const app = express();
const public_dir = path.join(__dirname, 'public');

const {sequelize} = require("./config/database");

const {initDB} = require("./models/global");

const Order_mgmt = require("./scripts/order_management");
const Product_mgmt = require("./scripts/product_management");
const Account_mgmt = require("./scripts/account_management");

app.set('view engine', 'ejs');
app.set('views', 'views');

initDB(sequelize).then(() => {
    console.log("databse startup process complete");
});

app.use(express.static(public_dir));

//Setup express-session
app.use(session({
    secret: "df7p+9i+y&;qE<9G_MosjTN?$</#p3", //THIS SHOULD BE IN A CONFIG FILE AND NOT COMMITTED, used here for the sake of the project
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 86400000
    }
}));

app.use(express.static('content'));

/*********************************** Admin only pages ***********************************/

/**
 * Admin main page
 */
/*
app.get('/main_admin', function (req,res){
    res.render('pages/main_admin');
});*/

/********* Account related *********/

/**
 * Super Admin creates an admin account
 */

app.get('/admin_signup', function (req, res) {
    if (req.session.is_main_admin === true) {
        res.render("pages/admin_signup");
    } else {
        res.redirect("/login");
    }

});

app.post('/create_admin', urlencodedParser, function (req, res) {
    if (req.session.is_main_admin === true) {
        Account_mgmt.create_account(req.body.email, req.body.password, false);
    }
    res.redirect("/login");
});


/**
 * Admin tries to connect to his account
 */

app.post('/connect_admin', urlencodedParser, async function (req, res) {
    //Check if admin exist and check if password is correct
    const feedback = await Account_mgmt.get_account(req.body.email, req.body.password);
    if (feedback["pass"] === true) {
        req.session.email = feedback["data"].email;
        req.session.is_main_admin = feedback["data"].is_main_admin;
        res.redirect("/order_history");
    } else {
        // Add here warning message
        res.redirect("/login");
    }
});

app.get('/login', function (req, res) {
    if (!req.session.email) {
        res.render("pages/admin_login");
    } else {
        res.redirect("/order_history");
    }
});

/********* Inventory related *********/

/**
 * Admin can choose which stock page he wants to access
 */

app.get('/stock', function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.render('pages/index_stock');
    }
});

/**
 * Admin can add item to inventory
 */

app.get('/add_to_stock', function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.render('pages/admin_stock_manage');
    }
});

app.post('/add_product', urlencodedParser, async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        //If product already in stock, just increase quantity.
        //Otherwise, create a new product
        await Product_mgmt.add_to_inventory(req)
        res.redirect('/visualise_stock');
    }
});

/**
 * Admin can see what items are in stock and delete items from stock
 */

app.get('/visualise_stock', function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.render('pages/admin_stock');
    }
});

app.get('/get_stock', async function (req, res) {
    let retval = await Product_mgmt.get_all_products();
    res.json(retval);
})

/**
 * Admin has entered the order number
 */

app.get('/check_order', function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    }
    let order_number = req.query.order_number;
    res.render('pages/admin_order', {order_number: order_number});
});

/**
 * Admin can check all finished orders
 */

app.get('/order_history', async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        //Get all FINISHED orders from database
        let orders = await Order_mgmt.get_all_orders();
        res.render('pages/admin_order_log', {orders: orders});
    }
});

/****************************************************************************************/

/*********************************** Clients pages ***********************************/
/********* Checkout *********/

/**
 * Cart page
 */

app.get('/cart', function (req, res) {
    res.render('pages/cart');
});

/**
 * Checkout
 */

app.get('/checkout', function (req, res) {
    //User adds his information and clicks on the validate button
    res.render('pages/user_info');
});

/**
 * Create new order
 */

app.post('/new_order', urlencodedParser, async function (req, res) {
    //For all items in cart create an order of the same person then create a receipt with the order number
    await Order_mgmt.create_order(req);
    //req.session.order_number = await create_receipt();
    res.redirect('/order_completed');
});

//Order completed
/*
app.get('/order_completed',function (req,res){
    let order_number = req.session.order_number;
    res.render('order_completed',{order_number: order_number});
});*/
/*************************************************************************************/

/*********************************** Product pages ***********************************/

/**
 * Main page
 */

app.get('/', function (req, res) {
    res.render('pages/index');
});

/**
 * Products filtered by category
 */

app.get('/category', function (req, res) {
    res.render('pages/category');
});


/**
 * Selected product page e.g: when you select an item in amazon,ebay,etc
 */

app.get('/product', function (req, res) {
    let product_model = req.query.product_model;
    let product = Product_mgmt.find_product(product_model);
    res.render('pages/product.ejs', {product: product});
});
/*************************************************************************************/

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
}, app).listen(8080, () => {
    console.log("Server up at http://localhost:8080/")
});