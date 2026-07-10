const mongoose = require('mongoose');

// Har login-session ki activity yahan save hoti hai (dedupe nahi hoti) —
// isi se 2 alag sessions ka overlap detect karte hain (password sharing proof)
const sessionActivitySchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, required: true },
  page:      { type: String, default: 'dashboard' },
  pingedAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('SessionActivity', sessionActivitySchema);
