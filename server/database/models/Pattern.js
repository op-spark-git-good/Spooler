const mongoose = require('mongoose');

const PatternSchema = {

   // Name of the pattern
   name: {
    type: String,
    required: true,
    default: "unknown"
  },

  // Owner ID (Reference to the User model)
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the User model

  },

  // Description of the pattern
  description: { type: String },

  // Image of the pattern
  patternImage: { type: String },

  // Materials
  fabricType: { type: String, enum: ['woven', 'stretched', "unknown"], required: true, default: "unknown" },

  // Notions (e.g., buttons, zippers, elastic)
  notions: [{ type: String }],

  // Size
  size: { type: String },

  // Difficulty level
  difficultyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },

  // Designer
  designer: { type: String, required: true, default: "unknown"},

  // Brand
  brand: { type: String, required: true, default: "unknown"},

  //format
  format: {
    type: String,
    enum: ['paper', 'pdf'], // Restrict values to 'paper' or 'pdf'
  }
};

const Patterns = mongoose.model('Pattern', new mongoose.Schema(PatternSchema));

module.exports = {
  Patterns
};
