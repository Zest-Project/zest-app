const express = require('express');
const cors = require('cors');
const logger = require('../utils/logger');
const responseTime = require('response-time');
const path = require("path");
const signupEndpoint = require("../routes/signup");
const loginEndpoint = require("../routes/login");
const recipeEndpoint = require("../routes/recipe");
const ingredientEndpoint = require("../routes/ingredient");
const tokenVerifier = require('../middleware/tokenVerifier');

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

module.exports = function (app) {
    // middleware

    app.use(cors(corsOptions));
    // app.options(cors());
    app.use(express.json());
    //routes

    app.use("/api/signup", signupEndpoint);
    app.use("/api/login", loginEndpoint);
    app.use("/api/recipe", tokenVerifier, recipeEndpoint);
    app.use("/api/ingredient", tokenVerifier, ingredientEndpoint);

    app.get("/", (request, response) => {
        response.send({message: "Welcome to Zest"})
    }
    )
}
