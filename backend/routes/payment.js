// const express = require('express');
// const router  = express.Router();
// const Payment = require('../models/Payment');
// const User    = require('../models/User');
// const { verifyToken } = require('../middleware/auth');

// // Submit payment details
// router.post('/submit', verifyToken, async (req, res) => {
//   try {
//     const { plan, amountPaid, transactionId, screenshot } = req.body;
//    const validPlans = ['99', '199', '299', '1000', 'resume49', 'resume99', 'resume150'];

//     if (!plan || !validPlans.includes(plan))
//       return res.status(400).json({ message: 'Valid plan required' });
//     if (!amountPaid || amountPaid <= 0)
//       return res.status(400).json({ message: 'Amount paid required' });
//     if (!transactionId || !transactionId.trim())
//       return res.status(400).json({ message: 'Transaction ID required' });

//     const user = await User.findById(req.user.id).select('name email referredBy');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const payment = await Payment.create({
//       userId:        user._id,
//       name:          user.name,
//       email:         user.email,
//       plan,
//       amountPaid,
//       transactionId: transactionId.trim(),
//       screenshot:    screenshot || '',
//       referredBy:    user.referredBy || ''
//     });

//     // selectedPlan sirf base/master plans ke liye sync hota hai (resume plans alag field use karte hain)
//     if (['99', '199', '299'].includes(plan)) {
//       await User.findByIdAndUpdate(user._id, { selectedPlan: plan });
//     }
//     res.status(201).json({ message: 'Payment details submitted!', paymentId: payment._id });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router  = express.Router();
const Payment = require('../models/Payment');
const User    = require('../models/User');
const Package = require('../models/Package');
const { verifyToken } = require('../middleware/auth');
const crypto  = require('crypto');
const onl     = require('../services/onlinePayment');

// Submit payment details
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { plan, amountPaid, transactionId, screenshot } = req.body;
    const resumePlans = ['resume49', 'resume99', 'resume150'];

    let validPlan = !!plan && resumePlans.includes(plan);
    if (!validPlan && plan) {
      validPlan = !!(await Package.findOne({ key: plan, isActive: true }));
    }

    if (!plan || !validPlan)
      return res.status(400).json({ message: 'Valid plan required' });
    if (!amountPaid || amountPaid <= 0)
      return res.status(400).json({ message: 'Amount paid required' });
    if (!transactionId || !transactionId.trim())
      return res.status(400).json({ message: 'Transaction ID required' });

    const user = await User.findById(req.user.id).select('name email referredBy');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const payment = await Payment.create({
      userId:        user._id,
      name:          user.name,
      email:         user.email,
      plan,
      amountPaid,
      transactionId: transactionId.trim(),
      screenshot:    screenshot || '',
      referredBy:    user.referredBy || ''
    });

    // selectedPlan sirf base/master plans ke liye sync hota hai (resume plans alag field use karte hain)
    if (!resumePlans.includes(plan)) {
      await User.findByIdAndUpdate(user._id, { selectedPlan: plan });
    }
    res.status(201).json({ message: 'Payment details submitted!', paymentId: payment._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── RAZORPAY (one-time) — sirf unn colleges ke liye jo RAZORPAY_COLLEGES mein hain (default: VIT) ──
// Payment page pehle ye puchta hai ki is user ke college ka payment kaise hoga
router.get('/mode', verifyToken, async (req, res) => {
  try {
    const u = await User.findById(req.user.id).select('college');
    res.json({ mode: onl.isOnline(u && u.college) ? 'razorpay' : 'manual', college: u && u.college });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Order banao — amount hamesha server pe Package se aata hai (user ke bheje amount pe bharosa nahi)
router.post('/razorpay/order', verifyToken, async (req, res) => {
  try {
    const u = await User.findById(req.user.id).select('name email college isPaid');
    if (!u) return res.status(404).json({ message: 'User not found' });
    if (!onl.isOnline(u.college)) return res.status(400).json({ message: 'Online payment is not enabled for your college' });
    if (u.isPaid) return res.status(400).json({ message: 'Your account already has access' });

    const pkg = await Package.findOne({ college: u.college, key: String(req.body.plan || ''), isActive: true });
    if (!pkg) return res.status(400).json({ message: 'This plan is not available' });

    const order = await onl.razorpay().orders.create({
      amount: Math.round(pkg.price * 100), currency: 'INR',
      receipt: `ps_${String(u._id).slice(-8)}_${Date.now()}`.slice(0, 40),
      notes: { userId: String(u._id), plan: pkg.key, college: u.college }
    });
    res.json({ orderId: order.id, amount: order.amount, keyId: process.env.RAZORPAY_KEY_ID, name: u.name, email: u.email, planName: pkg.name });
  } catch (err) {
    console.error('❌ Razorpay order error:', err && (err.error || err.message));
    res.status(500).json({ message: (err && err.error && err.error.description) || err.message || 'Could not start payment' });
  }
});

// Checkout ke baad: signature verify karo, phir access do
router.post('/razorpay/verify', verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.status(400).json({ message: 'Invalid payment response' });

    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    const a = Buffer.from(expected), b = Buffer.from(String(razorpay_signature));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b))
      return res.status(400).json({ message: 'Payment verification failed' });

    const rz = onl.razorpay();
    const order = await rz.orders.fetch(razorpay_order_id);
    if (!order.notes || order.notes.userId !== String(req.user.id))
      return res.status(403).json({ message: 'This payment belongs to a different account' });

    let pay = await rz.payments.fetch(razorpay_payment_id);
    if (pay.order_id !== razorpay_order_id || pay.amount !== order.amount)
      return res.status(400).json({ message: 'Payment details do not match' });
    if (pay.status === 'authorized') pay = await rz.payments.capture(razorpay_payment_id, pay.amount, 'INR');
    if (pay.status !== 'captured')
      return res.status(400).json({ message: 'Payment is not completed yet' });

    await onl.fulfill({ userId: req.user.id, plan: order.notes.plan, college: order.notes.college, paymentId: pay.id, orderId: order.id, amountPaise: pay.amount });
    res.json({ message: 'Payment successful. Your access is active.' });
  } catch (err) {
    console.error('❌ Razorpay verify error:', err && (err.error || err.message));
    res.status(500).json({ message: (err && err.error && err.error.description) || err.message });
  }
});

module.exports = router;
