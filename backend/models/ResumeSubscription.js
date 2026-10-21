// backend/models/ResumeSubscription.js
// Resume ke 3 monthly tiers (49/99/150) ka subscription record — sirf Resume
// feature ke liye. Baaki platform (main 4 packages) iska use nahi karta,
// wo manual-approve wale Payment model se hi chalta hai, jaisa hai.

const mongoose = require('mongoose');

const resumeSubscriptionSchema = new mongoose.Schema({
  userId:                { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tier:                  { type: String, enum: ['49', '99', '150'], required: true },
  razorpaySubscriptionId: { type: String, required: true, unique: true },
  razorpayPlanId:         { type: String, required: true },
  // created = mandate abhi setup ho raha hai, pehli payment ka wait
  // active = chal rahi hai, har mahine auto-charge ho raha hai
  // cancelled = user ne khud cancel kiya (app se ya UPI app se)
  // halted = payment fail hone ke baad Razorpay ne apne aap rok diya
  status:                { type: String, enum: ['created', 'active', 'cancelled', 'halted'], default: 'created' },
  lastChargedAt:          { type: Date },
  cancelledAt:            { type: Date }
}, { timestamps: true });

resumeSubscriptionSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('ResumeSubscription', resumeSubscriptionSchema);
