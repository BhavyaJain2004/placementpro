const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  isPaid:    { type: Boolean, default: false },
  isAdmin:   { type: Boolean, default: false },
//   sessions: [{
//   token: String,
//   ip: String,
//   device: String,
//   loginAt: { type: Date, default: Date.now }
// }],
  paymentId: String,
  orderId:   String,
  paidAt:    Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
