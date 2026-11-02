// Resend yahan email events bhejta hai (delivered / opened / clicked / bounced / complained).
// Signature (Svix) verify karna zaroori hai warna koi bhi fake stats bhej sakta hai.
// Raw body chahiye — server.js mein is path ke liye express.raw() lagta hai.
const express = require('express');
const crypto  = require('crypto');
const MailCampaign = require('../models/MailCampaign');
const router = express.Router();

const EVENTS = { 'email.delivered': 'delivered', 'email.opened': 'opened', 'email.clicked': 'clicked', 'email.bounced': 'bounced', 'email.complained': 'complained' };

function verify(req) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const id = req.headers['svix-id'], ts = req.headers['svix-timestamp'], sig = req.headers['svix-signature'];
  if (!secret || !id || !ts || !sig) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 600) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = crypto.createHmac('sha256', key).update(`${id}.${ts}.${req.body.toString('utf8')}`).digest('base64');
  return String(sig).split(' ').some(p => {
    const v = p.split(',')[1];
    return v && v.length === expected.length && crypto.timingSafeEqual(Buffer.from(v), Buffer.from(expected));
  });
}

router.post('/resend', async (req, res) => {
  try {
    if (!verify(req)) return res.status(400).json({ message: 'Invalid signature' });
    const ev = JSON.parse(req.body.toString('utf8'));
    const field = EVENTS[ev.type];
    const emailId = ev.data && ev.data.email_id;
    if (!field || !emailId) return res.json({ ok: true });
    // Har user ke liye pehli baar hi gino (baar-baar khulne par count nahi badhta)
    await MailCampaign.updateOne(
      { recipients: { $elemMatch: { emailId, [field]: { $ne: true } } } },
      { $set: { [`recipients.$.${field}`]: true }, $inc: { [field]: 1 } }
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
module.exports.verify = verify;
