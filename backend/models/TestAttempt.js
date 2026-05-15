const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email:       { type: String },
  testId:      { type: String },
  testTitle:   { type: String },
  answers:     { type: [Number] },    // user ke answers
  score:       { type: Number },
  total:       { type: Number },
  percentage:  { type: Number },
  timeTaken:   { type: Number },      // seconds mein
  completedAt: { type: Date, default: Date.now }
});

// Ek user ek test sirf ek baar de sakta hai
attemptSchema.index({ userId: 1, testId: 1 }, { unique: true });

module.exports = mongoose.model('TestAttempt', attemptSchema);
