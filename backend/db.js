// const mongoose = require("mongoose");
// const mongoUri = "mongodb://localhost:27017";
// const connectToMongo = () => {
//   mongoose.connect(mongoUri, () => {
//     //connect is a predefined function and it is calling back to another function
//     console.log("Connected to Mongo Succesfully");
//   });
// };

const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://user_sarbeswar:rAl7WBtd03iTK5Qk@cluster2.bx0oypn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2"; // here for nodemon version-18 or above you need to
// do 127.0.0.1 or 0.0.0.0 instead of doing localhost
const connectToMongo = async () => {
  try {
    mongoose.connect(mongoUri);
    console.log("Connected to Mongo Succesfully");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectToMongo;
