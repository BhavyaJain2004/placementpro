const mongoose = require('mongoose');

const masterDSASchema = new mongoose.Schema({
  // Identity
  topicSlug: { type: String, required: true, index: true },
  topic: { type: String, required: true },
  order: { type: Number, default: 0 },
  globalOrder: { type: Number, default: 0 },

  // Question
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],

  // Solutions
  hint: { type: String },
  approach: { type: String },
  java_code: { type: String },
  python_code: { type: String },
  cpp_code: { type: String },
  c_code: { type: String },

  // Meta
  companies: [String],
  tags: [String],
  similarQs: [String],
  timeComplex: { type: String },
  spaceComplex: { type: String },
  leetcodeUrl: { type: String },

  // Pattern / Trick
  pattern: { type: String },
  trick: { type: String },
  testCases: [{
  input: String,
  expected: String,
  driverCode: String
}],

  isActive: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('MasterDSAQuestion', masterDSASchema);
