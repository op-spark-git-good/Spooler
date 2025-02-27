const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  name: { type: String},
  description: { type: String },
  // fabrics and notions should contain objects describing materials
  fabrics: { type: Array }, 
  notions: { type: Array },
  createdAt: { type: Date, default: Date.now },
  // Below is for after base functionality is complete
  // thumbnail: { type: String }, // implement after base functionality is done
  // gallery: { type: Array }, // Array of image source strings
});

const Projects = mongoose.model("Project", ProjectSchema);
module.exports = { Projects };