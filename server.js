"use strict";
const express = require("express");
const compression = require("compression");
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
const errorController = require('./controllers/error');
const bodyParser = require("body-parser");

const _port = process.env.PORT || 4100;
const _app_folder = 'dist/eGrocery';

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// ---- CORS ALLOW API ACCESS FROM ANYWHERE ---//
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// --- ROUTES FOR AUTHORIZATION --- //
app.use('/auth', authRoutes);
// --- ROUTES FOR RECIPES CRUD --- //
app.use('/recipe', recipeRoutes);
// --- HANDLE ERRROS ---//
app.use(errorController.get404);
app.use(errorController.get500);

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});
