const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question:     { type: String, required: true },
  options:      { type: [String], required: true }, // 4 options
  correct:      { type: Number, required: true },    // 0,1,2,3 index
  explanation:  { type: String, default: '' },
  difficulty:   { type: String, enum: ['Easy','Medium','Hard'], default: 'Medium' }
});

const testSchema = new mongoose.Schema({
  testId:       { type: String, required: true, unique: true }, // eg: DSA-01
  title:        { type: String, required: true },
  category:     { type: String, enum: ['DSA','Aptitude','Core CS','Company','Full Mock'] },
  company:      { type: String, default: '' },       // for company specific tests
  duration:     { type: Number, default: 15 },       // minutes
  totalQ:       { type: Number, default: 10 },
  difficulty:   { type: String, enum: ['Easy','Medium','Hard'], default: 'Medium' },
  questions:    { type: [questionSchema] },
  isActive:     { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);
