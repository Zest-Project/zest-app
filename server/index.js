const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });


app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection

const port = process.env.PORT || 5001;
const dbo = require("./startup/conn");
require('./startup/routes')(app);
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connect('zest'); // need to maybe change this parameter.
  console.log(`Server is running on port: ${port}`);
});