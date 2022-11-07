const express = require("express");
const app = express();
require('dotenv').config();
const path = require('path');
// const cors = require("cors");

// const dbo = require("./startup/conn");
// require('./startup/config')();
require('./startup/routes')(app);
require('./startup/conn')();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname,'../client/build')));

  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  })
}

const port = process.env.PORT || 5001;

const server = app.listen(port, () => {
  // perform a database connection when server starts
  // dbo.connect('zest'); // need to maybe change this parameter.
  console.log(`Server is running on port: ${port}`);
});

module.exports = server;