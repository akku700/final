const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

try {
  mongoose.connect(process.env.db);
  console.log("connecting to database mongoDB");
} catch (error) {
  console.log(error);
}
