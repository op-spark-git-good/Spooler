const mongoose = require("mongoose");

const NotionsSchema = {
  upc: { type: String },
  title: { type: String },
  color: { type: String },
  image: { type: String },
  brand: { type: String },

}
const Notions = mongoose.model("Notion", new mongoose.Schema(NotionsSchema));

module.exports = {
  Notions,
};