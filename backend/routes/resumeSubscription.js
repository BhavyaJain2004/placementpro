// backend/routes/resumeSubscription.js
// Resume ke 3 monthly tiers ka subscribe/cancel flow — sirf Resume ke liye,
// baaki platform ke manual-approve system se bilkul alag aur untouched.

const express = require('express');
const router  = express.Router();
const Razorpay = require('razorpay');
const ResumeSubscription = require('../models/ResumeSubscription');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const PLAN_IDS = {
  '49':  process.env.RAZORPAY_PLAN_RESUME_49,
  '99':  process.env.RAZORPAY_PLAN_RESUME_99,
  '150': process.env.RAZORPAY_PLAN_RESUME_150
};

// ── Naya subscription shuru karo (checkout khulne se pehle yeh call hoga) ──
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { tier } = req.body;
    if (!['49', '99', '150'].includes(tier)) {
      return res.status(400).json({ message: 'Invalid tier' });
    }
    const planId = PLAN_IDS[tier];
    if (!planId) {
      return res.status(500).json({ message: `Plan ID missing for tier ${tier} — check env vars` });
    }

    // Agar user ki pehle se koi active/created subscription hai, usko mat
    // duplicate karo — purani wahi return kar do
    const existing = await ResumeSubscription.findOne({
      userId: req.user.id, status: { $in: ['created', 'active'] }
    });
    if (existing) {
      return res.json({
        subscriptionId: existing.razorpaySubscriptionId,
        keyId: process.env.RAZORPAY_KEY_ID,
        alreadyExists: true
      });
    }

    const user = await User.findById(req.user.id).select('name email mobile');
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 120, // 10 saal tak monthly cycles (Razorpay ko ek max count chahiye, yeh effectively "jab tak cancel na ho")
      notes: { userId: String(req.user.id), tier }
    });

    await ResumeSubscription.create({
      userId: req.user.id,
      tier,
      razorpaySubscriptionId: subscription.id,
      razorpayPlanId: planId,
      status: 'created'
    });

    res.json({ subscriptionId: subscription.id, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Cancel karo (app ke andar wale "Manage Subscription" button se) ──
router.post('/cancel', verifyToken, async (req, res) => {
  try {
    const sub = await ResumeSubscription.findOne({ userId: req.user.id, status: 'active' });
    if (!sub) return res.status(404).json({ message: 'Koi active subscription nahi mili' });

    // cancel_at_cycle_end: false — turant cancel, period khatam hone ka wait nahi
    await razorpay.subscriptions.cancel(sub.razorpaySubscriptionId, false);

    // Webhook bhi yahi karega, lekin turant feedback dene ke liye yahan bhi update kar do
    sub.status = 'cancelled';
    sub.cancelledAt = new Date();
    await sub.save();

    const field = `resume${sub.tier}`;
    await User.updateOne({ _id: req.user.id }, { $set: { [field]: false } });

    res.json({ message: 'Subscription cancel ho gayi, access turant band ho gaya' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Current status check karo (resume page pe "Manage Subscription" dikhana hai ya nahi) ──
router.get('/status', verifyToken, async (req, res) => {
  try {
    const sub = await ResumeSubscription.findOne({ userId: req.user.id, status: 'active' })
      .select('tier status lastChargedAt').lean();
    res.json({ subscription: sub || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
