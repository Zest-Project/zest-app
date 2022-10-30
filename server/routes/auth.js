const express = require('express');
const User = require('../models/user');
const env = require('../utils/env');
const logger = require('../utils/logger');
const jwt = require('../utils/jwt');

const authRouter = express.Router();

authRouter.post('/')