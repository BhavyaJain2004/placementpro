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

// Existing users migration — ek baar chalao
router.get('/migrate-sessions', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await User.updateMany(
      { sessions: { $exists: false } },
      { $set: { sessions: [], mobile: '' } }
    );
    res.json({ message: 'Done!', updated: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Sab users logout — sessions clear
router.post('/logout-all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await User.updateMany(
      { isAdmin: false },
      { $set: { sessions: [] } }
    );
    res.json({ message: 'All users logged out!', count: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/referral-stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { referredBy: { $ne: '' } } },
      {
        $group: {
          _id:   '$referredBy',
          count: { $sum: 1 },
          paid:  { $sum: { $cond: ['$isPaid', 1, 0] } },
          users: {
            $push: {
              name:      '$name',
              email:     '$email',
              isPaid:    '$isPaid',
              createdAt: '$createdAt'
            }
          }
        }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const ActivityLog = require('../models/ActivityLog');

// Daily active users
router.get('/activity', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { date } = req.query; // ?date=2024-01-15
    const today = date || new Date().toISOString().split('T')[0];

    // Aaj ke unique users
    const logs = await ActivityLog.find({ date: today })
      .sort({ loginAt: -1 });

    // Unique users count
    const uniqueUsers = [...new Set(logs.map(l => l.email))];

    // Last 7 days DAU
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = d.toISOString().split('T')[0];
      const count  = await ActivityLog.distinct('userId', { date: dayStr });
      last7.push({ date: dayStr, users: count.length });
    }

    res.json({
      date:        today,
      dau:         uniqueUsers.length,
      last7days:   last7,
      activeUsers: logs.map(l => ({
        name:    l.name,
        email:   l.email,
        page:    l.page,
        time:    l.loginAt
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const Feedback = require('../models/Feedback');

router.get('/feedback', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 });

    const avgRating = feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : 0;

    res.json({
      total:     feedbacks.length,
      avgRating,
      feedbacks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const LoginLog = require('../models/LoginLog');

// Suspicious accounts — ek account se 3+ alag IPs
router.get('/suspicious', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const logs = await LoginLog.aggregate([
      { $match: { loginAt: { $gte: since } } },
      {
        $group: {
          _id:     '$email',
          name:    { $first: '$name' },
          ips:     { $addToSet: '$ip' },
          devices: { $addToSet: '$device' },
          count:   { $sum: 1 },
          logins:  {
            $push: {
              ip:      '$ip',
              device:  '$device',
              loginAt: '$loginAt'
            }
          }
        }
      },
      {
        $addFields: {
          uniqueIPs:     { $size: '$ips' },
          uniqueDevices: { $size: '$devices' }
        }
      },
      // 2+ alag devices ya 2+ alag IPs = suspicious
      {
        $match: {
          $or: [
            { uniqueDevices: { $gte: 1 } },
            { uniqueIPs:     { $gte: 1 } },
            { count:         { $gte: 1 } }
          ]
        }
      },
      { $sort: { uniqueDevices: -1 } }
    ]);

    res.json({
      total: logs.length,
      accounts: logs.map(l => ({
        email:         l._id,
        name:          l.name,
        uniqueIPs:     l.uniqueIPs,
        uniqueDevices: l.uniqueDevices,
        ips:           l.ips,
        devices:       l.devices,
        totalLogins:   l.count,
        recentLogins:  l.logins.slice(-5)
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ek specific account ki full login history
router.get('/login-history/:email', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const logs = await LoginLog.find({ email: req.params.email })
      .sort({ loginAt: -1 })
      .limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const Test        = require('../models/Test');
const TestAttempt = require('../models/TestAttempt');

// Activate test access for a user
router.post('/activate-tests', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { hasTestAccess: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: `Test access activated for ${user.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Test stats
router.get('/test-stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const totalAttempts  = await TestAttempt.countDocuments();
    const totalUnlocked  = await User.countDocuments({ hasTestAccess: true });
    const recentAttempts = await TestAttempt.find()
      .sort({ completedAt: -1 }).limit(20)
      .select('email testTitle score percentage timeTaken completedAt');
    res.json({ totalAttempts, totalUnlocked, recentAttempts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
