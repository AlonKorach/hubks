const express = require('express');
app = express();
const bodyParser = require('body-parser');
const ejs = require("ejs");
const admin = require('firebase-admin');
const FB = require('./FBKS');
const path = require('path');

app.set('view engine', 'ejs');

app.engine('ejs', ejs.renderFile);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'js')));

// parse application/json
app.use(bodyParser.json())

app.get('/', indexPage);

app.get('/index', indexPage);

app.post('/register', doRegister); // Temp!!! To delete!

app.get('/*', error404)

function indexPage(req, res) {
    res.status(200).render('../index.ejs');
}

function doRegister(req, res) {
    let FBKS = new FB(admin, require('./hubks-b0507-firebase-adminsdk-t8hxc-741d85cc26'), 'hubks-b0507');    

    FBKS.addDBRow('/users', req.body.firstName, req.body.lastName, req.body.school, req.body.class, req.body.parentPhone, req.body.ID, req.body.mobilePhone);
    res.redirect('/');
}

function error404(req, res) {
    res.status(404).render('../errors/404.ejs');
}

app.listen(3000);