const express = require("express");
const app = express();
// const cors = require("cors");
require('dotenv').config();


// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/record"));
// get driver connection

const port = process.env.PORT || 5001;
// const dbo = require("./startup/conn");
require('./startup/config');
require('./startup/routes')(app);
require('./startup/conn');

 
const server = app.listen(port, () => {
  // perform a database connection when server starts
  // dbo.connect('zest'); // need to maybe change this parameter.
  console.log(`Server is running on port: ${port}`);
});

module.exports = server;