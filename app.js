const express = require('express');
var session = require('express-session');
const bodyparser = require('body-parser');
const urlencodedParser = bodyparser.urlencoded({extended: true});
const path = require('path');

const https = require('https');
const fs = require('fs');

const app = express();
const public_dir = path.join(__dirname, 'public');

const {sequelize} = require("./config/database");

const {initDB} = require("./models/global");
const {or} = require("sequelize");

const Order_mgmt = require("./scripts/order_management");

app.set('view engine', 'ejs');
app.set('views', 'views');

initDB(sequelize).then(() => {
    console.log("databse startup process complete");
});

app.use(express.static(public_dir));
/*
app.get('*', function (req, res) {
    res.status(404).send("La page n'existe pas");
});*/

app.use(express.static('content'));

/*********************************** Admin only pages ***********************************/

/********* Account related *********/
//Super Admin creates an admin account

app.get('/create_admin', function (req,res){
    //If I'm a SUPER Admin, check if new admin doesn't exist and create it
    res.render("pages/admin_signup")
});

//Admin tries to connect to its account
/*
app.post('/connect_admin',async function (req,res){
    //Check if admin exist and check if password is correct
});*/

/********* Inventory related *********/
//Admin has entered the order number
app.get('/check_order',function (req,res){
    let order_number = req.query.order_number;
    res.render('pages/admin_order.ejs',{order_number : order_number});
});

//Admin wants to log in
app.get('/login', function (req,res) {
    res.render("pages/admin_login")
});

//Admin can choose  which stock page he wants to access
app.get('/stock',function (req,res){
    res.render('pages/index_stock.ejs');
});

//Admin can add item to inventory
app.get('/add_to_stock',function (req,res){
    res.render('pages/admin_stock_manage.ejs');
});

//Admin can see what items are in stock and delete items from stock
app.get('/visualise_stock',function (req,res){
    res.render('pages/admin_stock.ejs');
});

/*
app.post('/add_product',async function (req,res){
    //If product already in stock, just increase quantity.
    //Otherwise create a new product
    let product_model = req.body.product_model;
});*/

//Admin can check all finished orders
app.get('/order_history',async function (req,res){
    //Get all FINISHED orders from database
    let orders = await Order_mgmt.get_all_orders();
    res.render('pages/admin_order_log.ejs',{orders: orders});
});

/****************************************************************************************/

/*********************************** Clients pages ***********************************/
/********* Checkout *********/
//Cart page

app.get('/cart',function (req,res){
    res.render('pages/cart.ejs');
});

/*app.get('/cart',function (req,res){
    let cart = req.session.cart;
    res.render('pages/cart.ejs',{cart : cart});
});*/

//Checkout

app.get('/checkout',function (req,res){
    //User add his information and clicks on the validate button
    res.render('pages/user_info.ejs');
});

//Send order to database
/*
app.post('/new_order',async function (req,res){
    let adress = req.body.adress;
    let email = req.body.email;
    let phone_number = req.body.phone_number;
    let client_name = req.body.client_name;
    //For all items in cart create an order of the same person then create a receipt with the order number
    await create_order(adress,email,phone_number,client_name);
    req.session.order_number = await create_receipt();
    res.redirect('/order_completed');
});*/

//Order completed
/*
app.get('/order_completed',function (req,res){
    let order_number = req.session.order_number;
    res.render('order_completed',{order_number: order_number});
});*/
/*************************************************************************************/

/*********************************** Product pages ***********************************/
//Main page with all products shown to the user
app.get('/', async function (req, res) {
    res.render('pages/index.ejs');
});

//Products filter by category
/*
app.get('/category',async function (req,res){
    let category = get_product_by_category(req.query.category);
    res.render('pages/category.ejs',{category : category});
});*/

//Selected product page e.g: when you select an item in amazon,ebay,etc
/*
app.get('/product',async function (req,res){
    let product_model = req.query.product_model;
    let product = await get_product_model(product_model);
    res.render('pages/product.ejs',{product : product});
});*/
/*************************************************************************************/

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
}, app).listen(8080, () => {
    console.log("Server up at http://localhost:8080/")
});