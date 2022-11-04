const express = require('express');
const cors = require('cors');
const logger = require('../utils/logger');
const responseTime = require('response-time');
const path = require("path");
const signupEndpoint = require("../routes/signup");
const loginEndpoint = require("../routes/login");
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

    app.use("/api/signup", signupEndpoint)

    app.get("/", (request, response) => {
        response.send({message: "Welcome to Zest"})
    }
    )
}
