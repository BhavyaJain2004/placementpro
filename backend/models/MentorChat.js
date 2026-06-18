const mongoose = require('mongoose');

const mentorChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  messages: [{
    role: { type: String, enum: ['user','assistant'] },
    text: String,
    at: { type: Date, default: Date.now }
  }],
  knownTopics: [String],   // topics user said they know
  lastNudgeAt: Date
}, { timestamps: true });

module.exports = mongoose.model('MentorChat', mentorChatSchema);
