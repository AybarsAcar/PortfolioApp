const mongoose = require("mongoose");

//creating a Schema
const Schema = mongoose.Schema;

//creating our own portfolio schema
//you can define the type, requeired -- settings as an object in your Schema
const topicSchema = new Schema({
  title: String,
  content: String,
  slug: {type: String, unique: true, index: true},
  forumCategory: {type: Schema.Types.ObjectId, ref: "ForumCategory"},
  user: {type: Schema.Types.ObjectId, ref:"User"},
  createdAt: { type: Date, default: Date.now },
});

//creating and exporting portfolio model
module.exports = mongoose.model("Topic", topicSchema);