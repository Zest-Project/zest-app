const mongoose = require('mongoose');
const logger = require('../../utils/logger');
const env = require('../../utils/env');

const connect = (database) => {
    return mongoose.createConnection(
      `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_CLUSTER}.mongodb.net/${database}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (error, result) => {
  
        if (error) {
          logger.error(`failed to connect to database: ${error}`);
  
        } else {
          logger.info(`connected to database on: ${database}`);
        }
        return result;
      }
    );
  };
  
  /**
   * Connects to local mongodb
   * 
   * @param {String} database database name
   * @returns 
   */
  const connectLocal = (database) => {
    return mongoose.createConnection(
      `mongodb://localhost:27017/${database}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (error, result) => {
  
        if (error) {
          logger.error(`failed to connect to database: ${error}`);
  
        } else {
          logger.info(`locally connected to database on: ${database}`);
        }
        return result;
      }
    );
  };
  
  
  module.exports = {
    connect: process.env.LOCAL ? connectLocal : connect,
  };
  


  // const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
 
// var _db;
 
// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         _db = db.db("employees");
//         console.log("Successfully connected to MongoDB."); 
//       }
//       return callback(err);
//          });
//   },
 
//   getDb: function () {
//     return _db;
//   },
// };