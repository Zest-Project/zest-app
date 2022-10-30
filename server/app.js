require('express-async-errors');
import express from 'express';

const cors = require('cors');
const express = require('express');
const logger = require('./utils/logger');
const responseTime = require('response-time');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());

app.options(cors());

app.use(express.json());

app.use(responseTime((req, res, time) => {
    logger.info(`Method:\t${req.method}`);
    logger.info(`Path:\t${req.path}`);
    logger.info(`Auth:\t${!!req.get('Authorization')}`);
    logger.info(`Body:\t${JSON.stringify({ ...req.body, user: undefined, password: undefined, image: undefined })}`);
    logger.info(`Time:\t${time.toFixed(2)}ms`);
    logger.info('---');
  }));

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function (request, response) {
    return response.sendFile(__dirname + '/server.html');
});

app.use('/api/auth', authRouter);
module.exports = app;