const express = require('express');
const session = require('express-session');

const bodyparser = require('body-parser');
const cookieParser = require("cookie-parser");
const urlencodedParser = bodyparser.urlencoded({extended: true});
const path = require('path');

const backendThumbPath = './public/img/productThumbnail/'
const frontThumbPath = 'img/productThumbnail/'
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, backendThumbPath)
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage});


const https = require('https');
const fs = require('fs');

const app = express();
app.use(cookieParser());

const public_dir = path.join(__dirname, 'public');

const {sequelize} = require("./config/database");
const {initDB} = require("./models/global");
const Order_mgmt = require("./scripts/order_management");
const Product_mgmt = require("./scripts/product_management");
const Account_mgmt = require("./scripts/account_management");
const {get_all_products_in_category} = require("./scripts/product_management");

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

app.get('/logout', function (req, res) {
    if (req.session.email) {
        req.session.destroy();
        res.redirect("/login");
    } else {
        res.redirect("/");
    }
})

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

app.post('/add_product', upload.single('img'), async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        //If product already in stock, just increase quantity.
        //Otherwise, create a new product
        req.body.imgLink = frontThumbPath + req.file.filename;
        await Product_mgmt.add_to_inventory(req);
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
    } else {
        res.render('pages/admin_order');
    }
});


app.get('/get_order', function (req, res) {
    res.json(Order_mgmt.get_order_by_number(req.query.orderno));
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
    res.render('pages/cart', {cart: req.cookies.cart});
});

/**
 * Add product to cart
 */
app.post('/add_to_cart', urlencodedParser, function (req, res) {
    if (!req.cookies.cart) {
        req.cookies.cart = {};
    }
    req.cookies.cart[req.body.product_model] = {
        name: req.body.product_model,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        quantity: req.body.quantity,
    }
    res.cookie("cart", req.cookies.cart, {secure: true, maxAge: 86400000, httpOnly: true, sameSite: 'strict'});
    res.redirect('back'); // redirect to the same page
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
    req.session.cart = [];
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
    if (req.session.cart === undefined) req.session.cart = [];
    res.render('pages/index');
});

/**
 * Categories
 */

app.get('/category', async function (req, res) {
    let categories = await Product_mgmt.get_all_categories();
    res.render('pages/category', {categories: categories});
});

//useless ?
app.get('/get_all_categories', async function (req, res) {
    let categories = await Product_mgmt.get_all_categories();
    res.json(categories);
})

/**
 * products filtered by category
 */

app.get('/product', async function (req, res) {
    let products = await get_all_products_in_category(req.query.category);
    console.log(products);
    res.render('pages/products', {products: products, category: req.query.category});
});


/**
 * Selected product page e.g: when you select an item in amazon,ebay,etc
 */

app.get('/selected_product', function (req, res) {
    let product_model = req.query.product_model;
    let product = Product_mgmt.find_product(product_model);
    res.render('pages/product.ejs', {product: product, message: req.session.add_to_cart_message});
});
/*************************************************************************************/

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
}, app).listen(8080, () => {
    console.log("Server up at http://localhost:8080/")
});


//REMOOOOVVVVEEEE!!!!!!!!
app.get('/pre_cart', async function (req, res) {
    //User adds his information and clicks on the validate button
    let max = await Product_mgmt.get_available_quantity(req.query.product);
    res.render('pages/pre_cart', {product_model: req.query.product, max: max});
});