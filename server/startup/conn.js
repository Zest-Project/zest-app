const mongoose = require("mongoose");
// const logger = rxequire("../utils/logger");

//const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/Zest`
const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@zest.s14tien.mongodb.net/Zest?retryWrites=true&w=majority`
console.log(dbUri)
const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const conn = () => {
    // Connect to the MongoDB cluster
    mongoose.connect(
        dbUri,
        options) 
        // function(err, data) {
        //     if (err) throw err;
        //     else if (data) console.log(data)});
        .then( (conn) => {
            // if (process.env.NODE_ENV === 'development') logger.info('Connected to MongoDB Atlas');
            console.log("database connected");
        })
        .catch( (error) => {
            // if (process.env.NODE_ENV === 'development') logger.error('Failed to connect to MongoDB Atlas', error.message);
            console.log(error);
        });
}

module.exports = conn;

// const connect = (database) => {
//     return mongoose.createConnection(
//       `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_CLUSTER}.mongodb.net/${database}?retryWrites=true&w=majority`,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       },
//       (error, result) => {
  
//         if (error) {
//           logger.error(`failed to connect to database: ${error}`);
  
//         } else {
//           logger.info(`connected to database on: ${database}`);
//         }
//         return result;
//       }
//     );
//   };
  
//   /**
//    * Connects to local mongodb
//    * 
//    * @param {String} database database name
//    * @returns 
//    */
//   const connectLocal = (database) => {
//     return mongoose.createConnection(
//       `mongodb://localhost:27017/${database}`,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       },
//       (error, result) => {
  
//         if (error) {
//           logger.error(`failed to connect to database: ${error}`);
  
//         } else {
//           logger.info(`locally connected to database on: ${database}`);
//         }
//         return result;
//       }
//     );
//   };
  
  
//   module.exports = {
//     connect: process.env.LOCAL ? connectLocal : connect,
//   };
  


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