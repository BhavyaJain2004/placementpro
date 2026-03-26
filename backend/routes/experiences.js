const router = require('express').Router();
const { Experience } = require('../models/Content');
const { verifyToken, verifyPaid } = require('../middleware/auth');

router.get('/', verifyToken, verifyPaid, async (req, res) => {
  try {
    const { company, result, year } = req.query;
    const f = {};
    if (company) f.company = { $regex: company, $options: 'i' };
    if (result)  f.result  = result;
    if (year)    f.year    = Number(year);
    res.json(await Experience.find(f).sort({ createdAt: -1 }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', verifyToken, verifyPaid, async (req, res) => {
  const e = await Experience.findById(req.params.id);
  if (!e) return res.status(404).json({ error: 'Not found' });
  res.json(e);
});

module.exports = router;