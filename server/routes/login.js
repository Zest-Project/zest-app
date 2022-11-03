const asyncMiddleware = require('../middleware/async');
const deletedUser = require("../deletedUser");
const { request } = require("http");
const jwt = require("jsonwebtoken");
var express = require('express');
const bycrypt = require("bcryptjs");

const JWT_SECRET = "9FpBFd*eF*z2?4X!dA%Pdp/})Y&-B[$;"