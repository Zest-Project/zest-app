require('express-async-errors');
import express from 'express';

const cors = require('cors');
const expres = require('express');
const responseTime = require('response-time');

const app = express();
app.use(cors());
app.options(cors());

app.use(express.json());