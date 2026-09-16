const express      = require('express');
const router       = express.Router();
const Company2026  = require('../models/Company2026');
const User         = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Yeh KIIT-specific data hai, doosre colleges ke liye nahi banaya gaya — sirf KIIT users dekh sakte hain
router.get('/', verifyToken, async (req, res) => {
  try {
    const me = await User.findById(req.user.id).select('college');
    if (me.college && me.college !== 'kiit') return res.json([]);
    const companies = await Company2026.find({}).sort({ date: -1 }).lean();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
