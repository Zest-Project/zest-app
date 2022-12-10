const express = require("express");
const app = express();
require('dotenv').config();
const path = require('path');
const conn = require('./startup/conn');
require('./startup/routes')(app);

conn.connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB");

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.resolve(__dirname,'../client/build')));
    
      app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
      })
    }
    
    const port = process.env.PORT || 5001;
    
    const server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
    
    module.exports = server;
  })
  .catch(conn.handleConnectionError);