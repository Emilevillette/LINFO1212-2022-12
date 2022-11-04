const express = require('express');

const bodyparser = require('body-parser');
const urlencodedParser = bodyparser.urlencoded({extended: true});
const path = require('path');

const https = require('https');
const fs = require('fs');

const app = express();
const public_dir = path.join(__dirname, 'public');

app.set('view engine', 'ejs');