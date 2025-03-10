const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  title: { type: String,},
  author: { type: String,},
  content: { type: String },
  image: { type: String },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  createdAt: { type: Date, default: Date.now },
});

const Posts = mongoose.model("Posts", PostSchema);
module.exports = { Posts };