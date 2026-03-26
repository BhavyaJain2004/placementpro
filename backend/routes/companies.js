// routes/companies.js
const router  = require('express').Router();
const Company = require('../models/Company');
const { verifyToken, verifyPaid } = require('../middleware/auth');

router.get('/', verifyToken, verifyPaid, async (req, res) => {
  try {
    const { search, type, testType } = req.query;
    const f = {};
    if (search)   f.name     = { $regex: search, $options: 'i' };
    if (type)     f.type     = type;
    if (testType) f.testType = testType;
    res.json(await Company.find(f).sort({ name: 1 }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', verifyToken, verifyPaid, async (req, res) => {
  const c = await Company.findById(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

module.exports = router;