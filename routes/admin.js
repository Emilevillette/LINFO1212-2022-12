const express = require("express");
const router = express.Router();

const fs = require("fs");
const path_admin = require("path");

const bodyparser = require("body-parser");
const urlencodedParser = bodyparser.urlencoded({extended: true});
const jsonparser = bodyparser.json();

const frontThumbPath = "img/productThumbnail/";
const backendThumbPath = path_admin.join(__dirname, "../public/img/productThumbnail/");
fs.mkdir(path_admin.join(__dirname, "../public/img/productThumbnail/"), (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
});
const multer = require("multer");
//Configure multer file destination
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, backendThumbPath);
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

const Account_mgmt = require("../scripts/account_management");
const Product_mgmt = require("../scripts/product_management");
const Order_mgmt = require("../scripts/order_management");
const path = require("path");
const url = require("url");

/*********************************** Admin only pages ***********************************/

/********* Account related *********/

/**
 * Super Admin creates an admin account
 */

router.get("/admin_signup", function (req, res) {
    if (req.session.is_main_admin === true) {
        res.render("pages/admin_signup");
    } else {
        res.redirect("/login");
    }

});

router.post("/create_admin", urlencodedParser, function (req, res) {
    if (req.session.is_main_admin === true) {
        Account_mgmt.create_account(req.body.email, req.body.password, false);
    }
    res.redirect("/login");
});


/**
 * Admin tries to connect to his account
 */

router.post("/connect_admin", urlencodedParser, async function (req, res) {
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

router.get("/login", function (req, res) {
    if (!req.session.email) {
        res.render("pages/admin_login");
    } else {
        res.redirect("/order_history");
    }
});

router.get("/logout", function (req, res) {
    if (req.session.email) {
        req.session.destroy();
        res.redirect("/login");
    } else {
        res.redirect("/");
    }
});

/********* Inventory related *********/

/**
 * Admin can choose which stock page he wants to access
 */

router.get("/stock", function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.render("pages/index_stock");
    }
});

/**
 * Admin can add item to inventory
 */

router.get("/add_to_stock", function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.render("pages/admin_add_stock");
    }
});

router.post("/add_product", upload.single("img"), async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        //If product already in stock, just increase quantity.
        //Otherwise, create a new product
        req.body.imgLink = frontThumbPath + req.file.filename;
        await Product_mgmt.add_to_inventory(req);
        res.redirect("/visualise_stock");
    }
});

/**
 * Admin can see what items are in stock and delete items from stock
 */

router.get("/visualise_stock", function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.render("pages/admin_stock");
    }
});

router.get("/get_stock", async function (req, res) {
    let retval = await Product_mgmt.get_all_products();
    res.json(retval);
});

/**
 * Admin has entered the order number
 */

router.get("/check_order", function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.render("pages/admin_order");
    }
});


router.get("/get_order", async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.json(await Order_mgmt.get_order_by_number(req.query.orderno));
    }
});

router.get("/get_receipt", async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        res.json(await Order_mgmt.get_receipt_by_number(req.query.receiptno));
    }
});

/**
 * Admin can check all finished orders
 */

router.get("/order_history", urlencodedParser, async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        //Get all FINISHED orders from database
        res.render("pages/admin_order_log", {receiptno: req.query.receiptno});
    }
});

router.get("/get_all_receipts", async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        let receipts = await Order_mgmt.get_all_receipts();
        res.json(receipts);
    }
});


router.get("/get_all_orders", urlencodedParser, async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        let orders = {}
        if (req.query.receiptno !== 'undefined') {
            orders = await Order_mgmt.get_orders_by_receipt_number(req.query.receiptno);
        } else {
            orders = await Order_mgmt.get_all_orders();
        }
        res.json(orders);
    }
});

/**
 * Stock manager
 */

router.post("/mark_archived", jsonparser, async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        await Order_mgmt.mark_archived(req.body.orderno);
        res.sendStatus(200);
    }
});

router.post("/mark_payed", jsonparser, async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        await Order_mgmt.mark_paid(req.body.orderno);
        res.sendStatus(200);
    }
});

router.post("/picked_up", jsonparser, async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        await Order_mgmt.mark_picked_up(req.body.orderno, req.body.date);
        res.sendStatus(200);
    }
});

router.post("/dropped_off", jsonparser, async function (req, res) {
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        await Order_mgmt.mark_dropped_off(req.body.orderno, req.body.date);
        res.sendStatus(200);
    }
});


module.exports = router;

