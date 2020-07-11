const mongoose = require("mongoose");

//creating a Schema
const Schema = mongoose.Schema;

//creating our own portfolio schema
//you can define the type, requeired -- settings as an object in your Schema
const forumCategorySchema = new Schema({
  title: String,
  subTitle: String,
  slug: {type: String, unique: true, index: true},
  createdAt: { type: Date, default: Date.now },
});

//creating and exporting portfolio model
module.exports = mongoose.model("ForumCategory", forumCategorySchema);