const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  color: { type: String, default: '#7c6af7,#fff' },
  repeat: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Notification', notificationSchema);
