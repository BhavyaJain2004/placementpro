const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:          { type: String },
  email:         { type: String },
  plan:          { type: String, enum: ['99', '1000'], required: true },
  amountPaid:    { type: Number, required: true },
  transactionId: { type: String, required: true },
  screenshot:    { type: String }, // base64 image, optional
  referredBy:    { type: String, default: '' },
  status:        { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt:     { type: Date, default: Date.now },
  reviewedAt:    { type: Date }
});

module.exports = mongoose.model('Payment', paymentSchema);
