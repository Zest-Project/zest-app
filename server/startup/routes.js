const cors = require('cors');
const express = require('express');
const logger = require('../utils/logger');
const responseTime = require('response-time');
const authRouter = require('../routes/auth');

const app = express();
app.use(cors());

app.options(cors());

app.use(express.json());

