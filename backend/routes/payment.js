const router   = require('express').Router();
const Razorpay = require('razorpay');
const crypto   = require('crypto');
const jwt      = require('jsonwebtoken');
const User     = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const rzp = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Step 1 — Create Razorpay order
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    // don't create order if already paid

    
    
    const user = await User.findById(req.user.id);
    if (user?.isPaid) return res.status(400).json({ error: 'Already paid' });

    const order = await rzp.orders.create({
      amount:   9900,   // ₹99 in paise
      currency: 'INR',
      receipt:  `pp_${req.user.id}_${Date.now()}`
    });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Step 2 — Verify signature and mark user paid
router.post('/verify', verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature)
      return res.status(400).json({ error: 'Payment verification failed — signature mismatch' });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { isPaid: true, paymentId: razorpay_payment_id, orderId: razorpay_order_id, paidAt: new Date() },
      { new: true }
    );

    // fresh token with isPaid: true
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, isPaid: true, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({ success: true, token });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;