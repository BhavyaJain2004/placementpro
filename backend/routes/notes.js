// routes/notes.js
const router = require('express').Router();
const { Note } = require('../models/Content');
const { verifyToken, verifyPaid } = require('../middleware/auth');

router.get('/', verifyToken, verifyPaid, async (req, res) => {
  try {
    const { category } = req.query;
    const f = category ? { category } : {};
    res.json(await Note.find(f).sort({ order: 1, createdAt: 1 }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', verifyToken, verifyPaid, async (req, res) => {
  const n = await Note.findById(req.params.id);
  if (!n) return res.status(404).json({ error: 'Not found' });
  res.json(n);
});

module.exports = router;