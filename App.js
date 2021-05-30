const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');

const App = express();

const publicDirectory = path.join(__dirname, './public');
App.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
App.use(express.urlencoded({extended: false}));
//Parse URL-encoded bodies (as sent by HTML forms)
App.use(express.json());
App.use(cookieParser());

App.set('view engine', 'hbs')

//Define Routes
App.use('/', require('./routes/pages'));
App.use('/auth', require('./routes/auth'));
App.use('/users', require('./routes/users'));
App.use('/product', require('./routes/product'));

App.listen(3001, () => {
    console.log("server on port 3001");
})