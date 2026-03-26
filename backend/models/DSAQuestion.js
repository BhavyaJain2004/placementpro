const mongoose = require('mongoose');

const dsaSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  difficulty:   { type: String, enum: ['Easy','Medium','Hard'], required: true },
  topic:        { type: String, required: true },
  description:  { type: String, required: true },
  examples:     [{ input: String, output: String }],
  approach:     String,
  java_code:    String,
  python_code:  String,
  timeComplex:  String,
  spaceComplex: String,
  companies:    [String],
  leetcodeUrl:  String
}, { timestamps: true });

module.exports = mongoose.model('DSAQuestion', dsaSchema);