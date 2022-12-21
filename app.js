const express = require("express");
const app = express();
const session = require("express-session");

const path = require("path");

const https = require("https");
const fs = require("fs");

const public_dir = path.join(__dirname, "public");
const client = require('./routes/client');
const admin = require('./routes/admin');
const products = require('./routes/products');

const {sequelize} = require("./config/database");
const {initDB} = require("./models/global");

const bodyparser = require("body-parser");


app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyparser.json());

initDB(sequelize).then(() => {
    console.log("database startup process complete");
});

app.use(express.static(public_dir));

//Setup express-session
app.use(session({
    secret: "df7p+9i+y&;qE<9G_MosjTN?$</#p3", //THIS SHOULD BE IN A CONFIG FILE AND NOT COMMITTED, used here for the sake of the project
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 86400000
    }
}));

app.use(express.static("content"));

app.use(client);
app.use(admin);
app.use(products);

https.createServer({
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
    passphrase: "ingi"
}, app).listen(8080, () => {
    console.log("Server up at http://localhost:8080/");
});
