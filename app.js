const express = require('express');

const bodyparser = require('body-parser');
const urlencodedParser = bodyparser.urlencoded({extended: true});
const path = require('path');

const https = require('https');
const fs = require('fs');

const app = express();
const public_dir = path.join(__dirname, 'public');

const {sequelize} = require("./config/database");
const {initDB} = require("./models/global");

app.set('view engine', 'ejs');

initDB(sequelize).then(() => {
    console.log("databse startup process complete");
});

app.use(express.static(public_dir));

app.get('*', function (req, res) {
    res.status(404).send("La page n'existe pas");
});

app.use(express.static('content'));
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
}, app).listen(8080, () => {
    console.log("Server up at http://localhost:8080/")
});