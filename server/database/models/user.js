const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//creating a Schema
const Schema = mongoose.Schema;

//creating our own portfolio schema
//you can define the type, requeired -- settings as an object in your Schema
const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: "Email is required",
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  name: {
    type: String,
    minlength: [6, "Minimum Name Length is 6 characters"],
  },
  username: {
    type: String,
    minlength: [6, "Minimum Username Length is 6 characters"],
  },
  password: {
    type: String,
    minlength: [6, "Minimum Password Length is 6 characters"],
    maxlength: [24, "Maximum Password Length is 24 characters"],
    required: true,
  },
  role: {
    enum: ["guest", "admin", "instructor"],
    type: String,
    required: true,
    default: "guest",
  },
  info: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//this code is executed before it is saved into the database
//here we can hash our password
userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      // Store hash in your password DB.
      user.password = hash;
      //this will tell the mongoose to store the value
      next();
    });
  });
});

//you can access the schemas methods and create your own custom functionality
userSchema.methods.validatePassword = function(candidatePassword, done) {
  //the password is hashed in our database use the bcrypt compare funciton
  bcrypt.compare(candidatePassword, this.password, function(err, isSuccess){
    if (err){
      return done(err);
    }

    //if success
    return done(null, isSuccess);
  })
}

//creating and exporting portfolio model
module.exports = mongoose.model("User", userSchema);
