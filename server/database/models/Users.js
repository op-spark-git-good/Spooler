const mongoose = require("mongoose");

const UserSchema = {
  username: { type: String },
  googleId: { type: String },
  email: { type: String },
  password: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now() },
};

const Users = mongoose.model("User", new mongoose.Schema(UserSchema));

module.exports = {
  Users,
};
