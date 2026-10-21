// backend/routes/razorpayWebhook.js
// Razorpay yahan events bhejta hai — subscription activate/charge/cancel/halt.
// Signature verify karna ZAROORI hai, warna koi bhi fake request bhej ke
// access le sakta hai. Raw body chahiye signature verify karne ke liye
// (server.js mein is route ke liye express.raw() special-case kiya hai).

const express = require('express');
const router  = express.Router();
const crypto  = require('crypto');
const ResumeSubscription = require('../models/ResumeSubscription');
const User = require('../models/User');

router.post('/razorpay', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = req.body; // Buffer hai (express.raw() se), JSON-parsed nahi

    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    if (expected !== signature) {
      console.error('❌ Razorpay webhook: signature mismatch');
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const payload = JSON.parse(rawBody.toString());
    const event = payload.event;
    const subEntity = payload.payload?.subscription?.entity;
    if (!subEntity) return res.json({ received: true }); // humare liye relevant nahi

    const sub = await ResumeSubscription.findOne({ razorpaySubscriptionId: subEntity.id });
    if (!sub) return res.json({ received: true }); // kisi aur subscription ka event hoga

    const field = `resume${sub.tier}`;

    if (event === 'subscription.activated' || event === 'subscription.charged') {
      sub.status = 'active';
      sub.lastChargedAt = new Date();
      await sub.save();
      await User.updateOne({ _id: sub.userId }, { $set: { [field]: true } });
      console.log(`✅ Resume ${sub.tier} activated for user ${sub.userId}`);
    }

    if (event === 'subscription.cancelled' || event === 'subscription.halted' || event === 'subscription.paused') {
      sub.status = event === 'subscription.cancelled' ? 'cancelled' : 'halted';
      sub.cancelledAt = new Date();
      await sub.save();
      await User.updateOne({ _id: sub.userId }, { $set: { [field]: false } });
      console.log(`⛔ Resume ${sub.tier} access removed for user ${sub.userId} (${event})`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('❌ Webhook processing error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
