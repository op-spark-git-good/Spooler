const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String},
  description: { type: String },
  // thumbnail: { type: String }, // implement after base functionality is done
  // gallery: { type: Array }, // Array of image source strings, final boss
  materials: {type: Array}, // most complicated part; should be able to reference owner's stashes for materials, and should be able to hold unowned materials as well
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = { Project };