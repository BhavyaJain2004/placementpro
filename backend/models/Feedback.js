const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:    { type: String },
  email:   { type: String },
  rating:  { type: Number, min: 1, max: 5 },
  message: { type: String },
  want:    { type: String }, // kya chahiye unhe
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
