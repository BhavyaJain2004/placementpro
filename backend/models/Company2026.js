const mongoose = require('mongoose');

const company2026Schema = new mongoose.Schema({
  name:     { type: String, required: true },
  date:     { type: String, default: '' },      // drive date, e.g. "2025-03-20"
  ctc:      { type: String, default: '' },       // e.g. "₹18.50 LPA"
  cgpa:     { type: Number, default: 0 },         // minimum CGPA criteria
  role:     { type: String, default: '' },
  stipend:  { type: String, default: '' },
  duration: { type: String, default: '' },        // internship duration
  location: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Company2026', company2026Schema);
