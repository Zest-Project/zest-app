const mongoose = require("mongoose");

const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@zest.s14tien.mongodb.net/Zest?retryWrites=true&w=majority`
console.log(dbUri)
const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const conn = () => {
//     // Connect to the MongoDB cluster
//     mongoose.connect(
//         dbUri,
//         options) 
//         .then( (conn) => {
//             console.log("database connected");
//         })
//         .catch( (error) => {
//             console.log(error);
//         });
// }

exports.connectToDatabase = async () => {
  // Connect to the MongoDB cluster
  mongoose.connect(
      dbUri,
      options);
};

exports.handleConnectionError = (error) => {
  console.log('Failed to connect to MongoDB database');
  console.log('Error', error.message);
}
