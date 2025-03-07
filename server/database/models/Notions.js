const mongoose = require("mongoose");

const NotionsSchema = {
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  upc: { type: String },
  title: { type: String },
  color: { type: String },
  image: { type: String },
  brand: { type: String },
  colorNum: { type: Number },
  quantity: { type: Number },
  length: { type: Number },

}
const Notions = mongoose.model("Notion", new mongoose.Schema(NotionsSchema));

module.exports = {
  Notions,
};