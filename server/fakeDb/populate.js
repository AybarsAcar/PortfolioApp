//connect to database and execute functions on the database

const mongoose = require("mongoose");
const config = require("../config/dev");
const fakeDb = require("./fakeDb");

//connecting to our database

  mongoose.connect(
    config.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    async () => {
      console.log("Starting Populating DB");
      await fakeDb.populate();
      //closing
      await mongoose.connection.close()
      console.log("DB has been populated");
    }
  );
