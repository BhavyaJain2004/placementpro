// routes/colleges.js
const router  = require('express').Router();
const College = require('../models/College');

// GET /api/colleges — sirf active colleges, public
router.get('/', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=60');
    const colleges = await College.find({ status: 'active' }).sort({ order: 1 });
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
