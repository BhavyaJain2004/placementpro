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
      console.error(`❌ Resume subscription: plan ID missing for tier ${tier} — check env vars`);
      return res.status(500).json({ message: 'This plan is temporarily unavailable. Please try again later.' });
    }

    // Agar user ki pehle se koi active/created subscription hai, usko mat
    // duplicate karo — purani wahi return kar do
    const existing = await ResumeSubscription.findOne({
      userId: req.user.id, status: { $in: ['created', 'active'] }
    });
    if (existing) {
      // Already active hai to dobara checkout mat kholo (warna Razorpay ₹5 authentication dikhata hai)
      if (existing.status === 'active') {
        return res.status(400).json({ message: 'You already have an active resume plan. To switch plans, cancel your current subscription first.' });
      }
      // Agar purana 'created' subscription (checkout khula tha, payment nahi hui) kisi
      // doosre tier ka hai, to usko purana maan ke chhod do aur user ka abhi chuna hua
      // tier naya banao. Webhook subscription id se dhundhta hai, isliye agar user ne
      // purane wale ko hi baad mein pay kar diya to wo phir bhi activate ho jayega.
      if (existing.tier !== tier) {
        existing.status = 'cancelled';
        await existing.save();
      } else {
        return res.json({
          subscriptionId: existing.razorpaySubscriptionId,
          keyId: process.env.RAZORPAY_KEY_ID,
          alreadyExists: true
        });
      }
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
    // Razorpay ke errors normal Error nahi hote (err.error.description me hota hai)
    console.error('❌ Resume subscription create error:', err?.error || err);
    res.status(500).json({ message: err?.error?.description || err?.message || 'Could not start payment. Please try again.' });
  }
});

// ── Cancel karo (app ke andar wale "Manage Subscription" button se) ──
router.post('/cancel', verifyToken, async (req, res) => {
  try {
    const sub = await ResumeSubscription.findOne({ userId: req.user.id, status: 'active' });
    if (!sub) return res.status(404).json({ message: 'No active subscription found.' });

    // cancel_at_cycle_end: false — turant cancel, period khatam hone ka wait nahi
    await razorpay.subscriptions.cancel(sub.razorpaySubscriptionId, false);

    // Webhook bhi yahi karega, lekin turant feedback dene ke liye yahan bhi update kar do
    sub.status = 'cancelled';
    sub.cancelledAt = new Date();
    await sub.save();

    const field = `resume${sub.tier}`;
    await User.updateOne({ _id: req.user.id }, { $set: { [field]: false } });

    res.json({ message: 'Subscription cancelled. Access has been removed.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Current status check karo (resume page pe plan status dikhana hai) ──
// 'subscription' pehle jaisa hi (sirf active). Naye fields: 'pending' (checkout khula par payment
// nahi hui) aur 'cancelled' (payment karke baad mein cancel/halt hui — lastChargedAt wali hi)
router.get('/status', verifyToken, async (req, res) => {
  try {
    const sub = await ResumeSubscription.findOne({ userId: req.user.id, status: 'active' })
      .select('tier status lastChargedAt').lean();
    if (sub) return res.json({ subscription: sub, pending: null, cancelled: null });

    const pending = await ResumeSubscription.findOne({ userId: req.user.id, status: 'created' })
      .sort({ createdAt: -1 }).select('tier status createdAt').lean();
    const cancelled = await ResumeSubscription.findOne({
      userId: req.user.id,
      status: { $in: ['cancelled', 'halted'] },
      lastChargedAt: { $exists: true, $ne: null }
    }).sort({ updatedAt: -1 }).select('tier status cancelledAt').lean();

    res.json({ subscription: null, pending: pending || null, cancelled: cancelled || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
