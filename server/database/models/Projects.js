const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, default: 'Project description'},
  // a todo list for a project
  tasks: [{
      name: { type: String, required: true },
      description: { type: String },
      isComplete: { type: Boolean, default: false },
      priority: { type: Number, default: 0}
  },],
  // patterns, fabrics and notions should contain objects describing materials
  patterns: [{
    name: { type: String, required: true },
    description: { type: String },
    stashed: { type: mongoose.Schema.Types.ObjectId, ref: "Patterns" },
  },],
  fabrics: [{
    description: { type: String, required: true },
    quantity : { type: Number, default: null },
    stashed: { type: mongoose.Schema.Types.ObjectId, ref: "Fabrics" },
  },],
  notions: [{
    description: { type: String },
    quantity : { type: Number, default: 1 },
    stashed: { type: mongoose.Schema.Types.ObjectId, ref: "Notions" },
  },],
  createdAt: { type: Date, default: Date.now },
  // Below is for after base functionality is complete
  // thumbnail: { type: String }, // implement after base functionality is done
  // gallery: { type: Array }, // Array of image source strings
});

const Projects = mongoose.model("Project", ProjectSchema);
module.exports = { Projects };