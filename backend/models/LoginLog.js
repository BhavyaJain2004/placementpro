const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:    { type: String },
  email:   { type: String },
  ip:      { type: String },
  device:  { type: String },
  loginAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
