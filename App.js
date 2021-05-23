const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const App = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');
App.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
App.use(express.urlencoded({extended: false}));
//Parse URL-encoded bodies (as sent by HTML forms)
App.use(express.json());
App.use(cookieParser());

App.set('view engine', 'hbs')

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

//Define Routes
App.use('/', require('./routes/pages'));
App.use('/auth', require('./routes/auth'));

App.listen(3001, () => {
    console.log("server on port 3001");
})