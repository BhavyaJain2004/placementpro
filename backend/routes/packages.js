// routes/packages.js
const router  = require('express').Router();
const Package = require('../models/Package');

// GET /api/packages — sirf active packages, public (login ki zaroorat nahi, landing page pe dikhta hai)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true })
      .select('-grants -__v')
      .sort({ order: 1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
