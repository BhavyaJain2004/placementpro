const router      = require('express').Router();
const Company     = require('../models/Company');
const DSAQuestion = require('../models/DSAQuestion');
const { Note, Experience } = require('../models/Content');
const User        = require('../models/User');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const guard = [verifyToken, verifyAdmin];

// ── Companies ──
router.post('/companies',      ...guard, async (req, res) => { try { res.json(await Company.create(req.body)); }                                       catch(e){ res.status(400).json({error:e.message}); }});
router.put('/companies/:id',   ...guard, async (req, res) => { res.json(await Company.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true})); });
router.delete('/companies/:id',...guard, async (req, res) => { await Company.findByIdAndDelete(req.params.id); res.json({success:true}); });

// ── DSA Questions ──
router.post('/dsa',       ...guard, async (req, res) => { try { res.json(await DSAQuestion.create(req.body)); }                                         catch(e){ res.status(400).json({error:e.message}); }});
router.put('/dsa/:id',    ...guard, async (req, res) => { res.json(await DSAQuestion.findByIdAndUpdate(req.params.id, req.body, {new:true})); });
router.delete('/dsa/:id', ...guard, async (req, res) => { await DSAQuestion.findByIdAndDelete(req.params.id); res.json({success:true}); });

// ── Notes ──
router.post('/notes',       ...guard, async (req, res) => { try { res.json(await Note.create(req.body)); }                                              catch(e){ res.status(400).json({error:e.message}); }});
router.put('/notes/:id',    ...guard, async (req, res) => { res.json(await Note.findByIdAndUpdate(req.params.id, req.body, {new:true})); });
router.delete('/notes/:id', ...guard, async (req, res) => { await Note.findByIdAndDelete(req.params.id); res.json({success:true}); });

// ── Experiences ──
router.post('/experiences',       ...guard, async (req, res) => { try { res.json(await Experience.create(req.body)); }                                  catch(e){ res.status(400).json({error:e.message}); }});
router.put('/experiences/:id',    ...guard, async (req, res) => { res.json(await Experience.findByIdAndUpdate(req.params.id, req.body, {new:true})); });
router.delete('/experiences/:id', ...guard, async (req, res) => { await Experience.findByIdAndDelete(req.params.id); res.json({success:true}); });

// ── Users ──
router.get('/users', ...guard, async (req, res) => {
  res.json(await User.find().select('-password').sort({ createdAt: -1 }));
});

// Make a user admin (run once for yourself)
router.post('/make-admin', verifyToken, verifyAdmin, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate({ email }, { isAdmin: true }, { new: true });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, message: `${email} is now admin` });
});

// ══════════════════════════════════════════
// backend/routes/admin.js mein YE ADD KARO
// (existing routes ke saath, end mein)
// ══════════════════════════════════════════

// POST /api/admin/activate
// Body: { email: "student@example.com" }
// Manually activate a user (you call this after checking Google Form)

router.post('/activate', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { isPaid: true, paidAt: new Date() },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found: ' + email });

    res.json({ 
      message: '✅ Activated!', 
      user: { name: user.name, email: user.email, isPaid: user.isPaid }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/pending
// See all users who registered but not paid yet
router.get('/pending', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({ isPaid: false })
      .select('name email createdAt')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;