const mongoose = require("mongoose");

const FabricsSchema = {
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  quantity: { type: Number },
  color: [{ type: String }],
  weave: [{ type: String }],
  brand: { type: String, default: "unknown" },
  origin: { type: String, default: "unknown" },
  care: { type: String, default: "unknown" },
  notes: {type: String, required: false },
};

const Fabrics = mongoose.model("Fabric", new mongoose.Schema(FabricsSchema));

module.exports = {
  Fabrics,
};
