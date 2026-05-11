const express  = require('express');
const router   = express.Router();
const Feedback = require('../models/Feedback');
const User     = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Submit feedback
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { rating, message, want } = req.body;
    if (!rating) return res.status(400).json({ message: 'Rating required' });

    // Save feedback
    await Feedback.create({
      userId:  req.user.id,
      name:    req.user.name,
      email:   req.user.email,
      rating,
      message: message || '',
      want:    want || ''
    });

    // User ko mark karo ki feedback de diya
    await User.findByIdAndUpdate(req.user.id, { feedbackGiven: true });

    res.json({ message: 'Feedback submitted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check karo feedback diya ya nahi
router.get('/check', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('feedbackGiven');
    res.json({ given: user.feedbackGiven || false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
