// routes/companies.js
const router  = require('express').Router();
const Company = require('../models/Company');
const User    = require('../models/User');
const { verifyToken, verifyPaid } = require('../middleware/auth');

router.get('/', verifyToken, verifyPaid, async (req, res) => {
  try {
    const me = await User.findById(req.user.id).select('college');
    const { search, type, testType } = req.query;
    const f = { college: me.college || 'kiit' };
    if (search)   f.name     = { $regex: search, $options: 'i' };
    if (type)     f.type     = type;
    if (testType) f.testType = testType;
    res.json(await Company.find(f).sort({ name: 1 }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', verifyToken, verifyPaid, async (req, res) => {
  const me = await User.findById(req.user.id).select('college');
  // college bhi match karna zaroori hai — warna koi bhi user, kisi bhi doosre
  // college ki company-ID guess/dekh ke uska poora detail access kar sakta tha
  const c = await Company.findOne({ _id: req.params.id, college: me.college || 'kiit' });
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

module.exports = router;
