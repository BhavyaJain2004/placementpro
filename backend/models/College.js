const mongoose = require('mongoose');

// Har entry ek college hai jo platform pe available hai. Admin isse add/edit/pause karta hai —
// naya college onboard karne ke liye code-change/deploy ki zaroorat nahi.
const collegeSchema = new mongoose.Schema({
  slug:     { type: String, required: true, unique: true, trim: true, lowercase: true }, // jaise 'kiit', 'bennett' — permanent, kabhi badalta nahi
  name:     { type: String, required: true },       // jaise "KIIT University"
  location: { type: String, default: '' },           // jaise "Bhubaneswar, Odisha"
  logo:     { type: String, default: '' },            // logo image URL
  status:   { type: String, enum: ['active', 'coming_soon'], default: 'coming_soon' },
  order:    { type: Number, default: 0 },              // display order, chota number pehle

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('College', collegeSchema);
