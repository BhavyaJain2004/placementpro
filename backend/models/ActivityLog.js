const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:    { type: String },
  email:   { type: String },
  page:    { type: String, default: 'dashboard' },
  ip:      { type: String },
  date:    { type: String }, // YYYY-MM-DD format
  loginAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', activitySchema);
