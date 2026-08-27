const mongoose = require('mongoose');

// Har page-load pe ek entry — anonymous hai, koi personal data store nahi hota,
// sirf 'kitne log aaye aaj/is hafte/abhi' count karne ke liye
const pageViewSchema = new mongoose.Schema({
  path:      { type: String, default: '/' },
  createdAt: { type: Date, default: Date.now }
});

pageViewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('PageView', pageViewSchema);
