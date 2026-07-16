const express = require('express');
const router  = express.Router();
const Payment = require('../models/Payment');
const User    = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Submit payment details
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { plan, amountPaid, transactionId, screenshot } = req.body;

    if (!plan || !['99','1000'].includes(plan))
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

    // User ka selectedPlan bhi sync kar do (agar unhone dropdown se badal diya ho)
    await User.findByIdAndUpdate(user._id, { selectedPlan: plan });

    res.status(201).json({ message: 'Payment details submitted!', paymentId: payment._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
