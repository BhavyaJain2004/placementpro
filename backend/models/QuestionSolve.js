const mongoose = require('mongoose');

const questionSolveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterDSAQuestion', required: true },
  solvedAt: { type: Date, default: Date.now }
});

questionSolveSchema.index({ userId: 1, questionId: 1 }, { unique: true });

module.exports = mongoose.model('QuestionSolve', questionSolveSchema);
