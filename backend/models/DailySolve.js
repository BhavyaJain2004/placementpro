// backend/models/DailySolve.js
const mongoose = require('mongoose');

const dailySolveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email:  { type: String },
  name:   { type: String },
  date:   { type: String, required: true }, // YYYY-MM-DD
}, { timestamps: true });

dailySolveSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailySolve', dailySolveSchema);
