const mongoose = require("mongoose");

//creating a Schema
const Schema = mongoose.Schema;

//creating our own portfolio schema
//you can define the type, requeired -- settings as an object in your Schema
const portfolioSchema = new Schema({
  title: { type: String, required: true, maxlength: 120 },
  company: String,
  companyWebsite: String,
  location: String,
  jobTitle: String,
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  user: {type: Schema.Types.ObjectId, ref: "User"},
  createdAt: { type: Date, default: Date.now },
});

//creating and exporting portfolio model
module.exports = mongoose.model("Portfolio", portfolioSchema);