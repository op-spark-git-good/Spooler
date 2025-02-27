const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  image: { type: String },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = { Post };