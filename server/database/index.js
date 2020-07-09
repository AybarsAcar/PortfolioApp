const mongoose = require ("mongoose");
//importing session and connecting to MongoDB
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const config = require("../config/dev");

//importing your model
require("./models/portfolio");
require("./models/user");


//connecting to our database
exports.connect = () => {
  mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }, () => {
    console.log("Connected to Database");
    
  })
}


exports.initSessionStore = () => {
  const store = new MongoDBStore({
    uri: config.DB_URI,
    collection: "porfolioSessions"
  });
  return store;
}