const { model } = require('mongoose');

const PatternSchema = {
  // Owner ID (Reference to the User model)
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },

  // Description of the pattern
  description: { type: String },

  // Image of the pattern
  patternImage: { type: String },

  // Materials
  fabricType: { type: String, enum: ['woven', 'stretched'], required: true },

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
  designer: { type: String, required: true },

  // Brand
  brand: { type: String, required: true }
};

const Patterns = model('Pattern', new mongoose.Schema(PatternSchema));

module.exports = {
  Patterns
};
