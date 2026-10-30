const mongoose = require('mongoose');

// Admin panel se bheji gayi mail campaign. Recipients yahin store hote hain taaki daily limit
// ki wajah se beech mein ruk jaye to agle din wahi se aage chale (resume).
const recipientSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  email:  String,
  name:   String,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  error:  String
}, { _id: false });

const mailCampaignSchema = new mongoose.Schema({
  subject:  String,
  heading:  String,
  body:     String,
  ctaText:  String,
  ctaUrl:   String,
  segment:  String,
  college:  { type: String, default: 'all' },
  status:   { type: String, enum: ['queued', 'sending', 'paused', 'waiting', 'done', 'cancelled'], default: 'queued' },
  note:     String,
  setSize:  { type: Number, default: 0 },      // roz kitne users ka ek set (0 = sabko ek saath)
  releaseCount: { type: Number, default: 0 },  // ab tak kitne users tak bhejne ki permission mili
  total:    { type: Number, default: 0 },
  sent:     { type: Number, default: 0 },
  failed:   { type: Number, default: 0 },
  recipients: [recipientSchema],
  finishedAt: Date
}, { timestamps: true });

// Daily counter (Resend free plan = 100 mail/din)
const mailDailySchema = new mongoose.Schema({ day: { type: String, unique: true }, count: { type: Number, default: 0 } });

module.exports = mongoose.model('MailCampaign', mailCampaignSchema);
module.exports.MailDaily = mongoose.models.MailDaily || mongoose.model('MailDaily', mailDailySchema);
