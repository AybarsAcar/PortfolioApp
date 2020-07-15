const mongoose = require("mongoose");

//creating a Schema
const Schema = mongoose.Schema;

//creating our own portfolio schema
//you can define the type, requeired -- settings as an object in your Schema
const postSchema = new Schema({
  content: String,
  slug: {type: String, unique: true, index: true},
  fullSlug: {type: String, unique: true, index: true},
  topic: {type: Schema.Types.ObjectId, ref: "Topic"},
  user: {type: Schema.Types.ObjectId, ref:"User"},
  parent: {type: Schema.Types.ObjectId, ref:"Post"},
  createdAt: { type: Date, default: Date.now },
});

//creating and exporting portfolio model
module.exports = mongoose.model("Post", postSchema);