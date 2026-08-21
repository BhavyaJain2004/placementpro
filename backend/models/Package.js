const mongoose = require('mongoose');

// Ek package = ek pricing card jo landing page + payment page pe dikhta hai.
// 'key' hi wahi plan identifier hai jo Payment/User.selectedPlan mein use hota hai —
// naya package add karne pe bas naya unique key do (jaise 'diwali299'), koi code change nahi chahiye.
const packageSchema = new mongoose.Schema({
  key:           { type: String, required: true, unique: true, trim: true },
  name:          { type: String, required: true },        // e.g. "Base", "Plus", "Complete"
  tagline:       { type: String, default: '' },            // small label above price e.g. "BASE"
  badge:         { type: String, default: '' },             // e.g. "Most Popular" ribbon, empty = no ribbon
  price:         { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },              // strikethrough price, 0 = don't show

  features: [{
    text:     { type: String, required: true },
    included: { type: Boolean, default: true }               // true = ✓ green, false = ✕ greyed out
  }],

  accentColor: { type: String, default: '#7c6af7' },          // card top-bar / button color
  highlighted: { type: Boolean, default: false },             // dark "most popular" card styling

  isActive: { type: Boolean, default: true },   // OFF karne se website pe card gayab ho jata hai, data safe rehta hai
  order:    { type: Number, default: 0 },        // display order, chota number pehle

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);
