const router      = require('express').Router();
const DSAQuestion = require('../models/DSAQuestion');
const { verifyToken, verifyPaid } = require('../middleware/auth');

// List — solution fields hidden
router.get('/', verifyToken, verifyPaid, async (req, res) => {
  try {
    const { topic, difficulty, search, company } = req.query;
    const f = {};
    if (topic)      f.topic      = topic;
    if (difficulty) f.difficulty = difficulty;
    if (search)     f.title      = { $regex: search, $options: 'i' };
    if (company)    f.companies  = { $regex: company, $options: 'i' };
    res.json(await DSAQuestion.find(f).select('-java_code -python_code').sort({ topic: 1, difficulty: 1 }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Single question — full with solutions
router.get('/:id', verifyToken, verifyPaid, async (req, res) => {
  const q = await DSAQuestion.findById(req.params.id);
  if (!q) return res.status(404).json({ error: 'Not found' });
  res.json(q);
});

module.exports = router;