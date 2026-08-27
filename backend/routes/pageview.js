// routes/pageview.js
const router   = require('express').Router();
const PageView = require('../models/PageView');

// POST /api/pageview — public, har page load pe frontend se call hoga
router.post('/', async (req, res) => {
  try {
    await PageView.create({ path: req.body.path || '/' });
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false }); // fail-silent — kabhi bhi user experience block nahi hona chahiye
  }
});

module.exports = router;
