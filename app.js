/**
 * Title: Chat apps driver
 * Description: Sub-codes driven by root driver
 * Author: Hasibul Islam
 * Date: 24/07/2022
 */

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('database connection successful.'))
    .catch(error => console.dir(error))

// request parsers
app.use(express.json()); // parse entered body as json format
app.use(express.urlencoded({ extended: true })); // parse query parameter

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup

// error handling

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
});