// routes/packages.js
const router  = require('express').Router();
const Package = require('../models/Package');

// GET /api/packages?college=kiit — sirf active packages, us college ke liye, public
router.get('/', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=30'); // 30 sec cache — real speed boost, price-change bhi jaldi reflect ho jaata hai
    const college = (req.query.college || 'kiit').toLowerCase().trim();
    const packages = await Package.find({ isActive: true, college })
      .select('-grants -__v')
      .sort({ order: 1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
