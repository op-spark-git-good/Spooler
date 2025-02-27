const { model } = require('mongoose');



const UserSchema = {
  username: { type: String },
  googleId: {type: String},
  email: { type: String },
  password: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date },
};

const Users = model('User', new mongoose.Schema(UserSchema))

module.exports = {
  Users,
}