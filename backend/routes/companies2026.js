const express      = require('express');
const router       = express.Router();
const Company2026  = require('../models/Company2026');
const { verifyToken } = require('../middleware/auth');

// Sabhi 2026 companies — sirf logged-in (paid) users dekh sakte hain
router.get('/', verifyToken, async (req, res) => {
  try {
    const companies = await Company2026.find({}).sort({ date: -1 }).lean();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
