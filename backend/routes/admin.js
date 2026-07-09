const router      = require('express').Router();
const Company     = require('../models/Company');
const DSAQuestion = require('../models/DSAQuestion');
const { Note, Experience } = require('../models/Content');
const User        = require('../models/User');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const Test        = require('../models/Test');
const TestAttempt = require('../models/TestAttempt');

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

// One-time seed route — use karke delete karo
router.post('/seed-tests', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const Test = require('../models/Test');
    // Seedha seedTests.js run karo
    const { execSync } = require('child_process');
    execSync('node /opt/render/project/src/backend/seedTests.js', { stdio: 'inherit' });
    const count = await Test.countDocuments();
    res.json({ message: `Done! ${count} tests in DB.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fix existing users — hasTestAccess field add karo
router.get('/migrate-test-access', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await User.updateMany(
      { hasTestAccess: { $exists: false } },
      { $set: { hasTestAccess: false } }
    );
    res.json({ message: 'Done!', updated: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/activate-masterdsa', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { masterDsaAccess: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: `Master DSA activated for ${user.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/seed-masterdsa', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { execSync } = require('child_process');
    execSync('node /opt/render/project/src/backend/seedMasterDSA.js', { stdio:'inherit' });
    const count = await require('../models/MasterDSAQuestion').countDocuments();
    res.json({ message: `Done! ${count} questions` });
  } catch(err) { res.status(500).json({ message: err.message }); }
});
// backend/routes/admin.js mein ye routes ADD karo (module.exports se PEHLE)
// verifyAdmin middleware already exists hoga — wahi use karo

// Simple password gate for the panel itself (extra layer)
router.post('/panel-login', verifyToken, verifyAdmin, async (req, res) => {
  const { password } = req.body;
  if (password !== 'adminbhavya') {
    return res.status(401).json({ message: 'Wrong password' });
  }
  res.json({ ok: true });
});

// MAIN STATS — totals, overlaps, growth
// backend/routes/admin.js mein ye routes ADD karo (module.exports se PEHLE)
// verifyAdmin middleware already exists hoga — wahi use karo

// Simple password gate for the panel itself (extra layer)
router.post('/panel-login', verifyToken, verifyAdmin, async (req, res) => {
  const { password } = req.body;
  if (password !== 'adminbhavya') {
    return res.status(401).json({ message: 'Wrong password' });
  }
  res.json({ ok: true });
});

// MAIN STATS — totals, overlaps, growth
router.get('/analytics/overview', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const totalUsers   = await User.countDocuments({});
    const basePaid     = await User.countDocuments({ isPaid: true });
    const masterDsa    = await User.countDocuments({ masterDsaAccess: true });
    const bothAccess   = await User.countDocuments({ isPaid: true, masterDsaAccess: true });
    const freeUsers    = await User.countDocuments({ isPaid: false, masterDsaAccess: false });

    // New users today (with names)
    const todayStart = new Date(); todayStart.setHours(0,0,0,0);
    const newToday = await User.countDocuments({ createdAt: { $gte: todayStart } });
    const newTodayList = await User.find({ createdAt: { $gte: todayStart } }).select('name email createdAt').sort({ createdAt: -1 }).lean();

    // DAU — users with activity ping today (assuming Activity model exists with userId+date)
    let dau = 0;
    try {
      const Activity = require('../models/Activity');
      dau = await Activity.distinct('userId', { createdAt: { $gte: todayStart } }).then(arr => arr.length);
    } catch(e) {}

    // 7-day signup growth
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const start = new Date(); start.setDate(start.getDate() - i); start.setHours(0,0,0,0);
      const end = new Date(start); end.setDate(end.getDate() + 1);
      const count = await User.countDocuments({ createdAt: { $gte: start, $lt: end } });
      days.push({ date: start.toISOString().split('T')[0], count });
    }

    res.json({
      totalUsers, basePaid, masterDsa, bothAccess, freeUsers,
      newToday, newTodayList, dau, weeklyGrowth: days
    });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// USER ACTIVITY LIST — who used what today
router.get('/analytics/active-today', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const todayStart = new Date(); todayStart.setHours(0,0,0,0);
    let list = [];
    try {
      const Activity = require('../models/Activity');
      list = await Activity.find({ createdAt: { $gte: todayStart } })
        .populate('userId', 'name email isPaid masterDsaAccess')
        .sort({ createdAt: -1 })
        .limit(100);
    } catch(e) {}
    res.json(list);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// FEEDBACK LIST — all feedback with user names
router.get('/analytics/feedback-list', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const Feedback = require('../models/Feedback');
    const list = await Feedback.find({}).sort({ createdAt: -1 }).limit(200);
    res.json(list);
  } catch(err) { res.status(500).json({ message: err.message }); }
});
router.get('/analytics/funnel', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const totalSignups = await User.countDocuments({});
    const anyPaid = await User.countDocuments({ $or: [{ isPaid: true }, { masterDsaAccess: true }] });
    const basePaid = await User.countDocuments({ isPaid: true });
    const masterDsa = await User.countDocuments({ masterDsaAccess: true });
    const bothAccess = await User.countDocuments({ isPaid: true, masterDsaAccess: true });

    res.json({
      totalSignups,
      anyPaid,
      basePaid,
      masterDsa,
      bothAccess,
      conversionRate: totalSignups ? ((anyPaid/totalSignups)*100).toFixed(1) : 0
    });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// TOP PERFORMERS — by Master DSA solves
router.get('/analytics/top-performers', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const DailySolve = require('../models/DailySolve');
    const top = await DailySolve.aggregate([
      { $group: { _id: '$userId', name: { $first: '$name' }, email: { $first: '$email' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json(top);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// INACTIVE USERS — last seen 7+ days ago (or never)
router.get('/analytics/inactive', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    let Activity;
    try { Activity = require('../models/Activity'); } catch(e) {}

    const allUsers = await User.find({ $or: [{ isPaid: true }, { masterDsaAccess: true }] })
      .select('name email createdAt').lean();

    let lastSeenMap = {};
    if (Activity) {
      const lastSeens = await Activity.aggregate([
        { $sort: { createdAt: -1 } },
        { $group: { _id: '$userId', lastSeen: { $first: '$createdAt' } } }
      ]);
      lastSeens.forEach(l => lastSeenMap[l._id.toString()] = l.lastSeen);
    }

    const inactive = allUsers.map(u => ({
      name: u.name, email: u.email,
      lastSeen: lastSeenMap[u._id.toString()] || null,
      signedUp: u.createdAt
    })).filter(u => !u.lastSeen || new Date(u.lastSeen) < sevenDaysAgo)
      .sort((a,b) => new Date(a.lastSeen||a.signedUp) - new Date(b.lastSeen||b.signedUp));

    res.json(inactive.slice(0, 100));
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.post('/run-patch', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { execSync } = require('child_process');
    execSync('node /opt/render/project/src/backend/patchTestCases.js', { stdio: 'inherit' });
    res.json({ ok: true });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.get('/analytics/upsell-list', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({
      isPaid: true,
      hasTestAccess: false
    }).select('name email mobile createdAt').sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// backend/routes/admin.js mein add karo (module.exports se PEHLE)

// MONTHLY SIGNUPS + REVENUE
router.get('/analytics/monthly', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const months = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const signups = await User.countDocuments({ createdAt: { $gte: start, $lt: end } });
      const basePaid = await User.countDocuments({ isPaid: true, createdAt: { $gte: start, $lt: end } });
      const masterDsa = await User.countDocuments({ masterDsaAccess: true, createdAt: { $gte: start, $lt: end } });
      const revenue = (basePaid * 99) + (masterDsa * 1000);
      months.push({
        month: start.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
        signups, basePaid, masterDsa, revenue
      });
    }
    res.json(months);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// ALL-TIME DAILY SIGNUPS (for calendar click)
router.get('/analytics/daily-signups', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { date } = req.query;
    if (date) {
      // Return users who signed up on that specific date
      const start = new Date(date); start.setHours(0,0,0,0);
      const end = new Date(date); end.setHours(23,59,59,999);
      const users = await User.find({ createdAt: { $gte: start, $lte: end } })
        .select('name email mobile isPaid masterDsaAccess createdAt').lean();
      return res.json({ users });
    }
    // All time daily counts grouped by date
    const data = await User.aggregate([
      { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
        paid: { $sum: { $cond: ['$isPaid', 1, 0] } }
      }},
      { $sort: { _id: 1 } }
    ]);
    res.json(data);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// DAU / WAU / MAU
router.get('/analytics/active-users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    let Activity;
    try { Activity = require('../models/Activity'); } catch(e) {}
    if (!Activity) return res.json({ dau: 0, wau: 0, mau: 0 });

    const now = new Date();
    const day = new Date(now); day.setHours(0,0,0,0);
    const week = new Date(now); week.setDate(week.getDate() - 7);
    const month = new Date(now); month.setDate(month.getDate() - 30);

    const [dauArr, wauArr, mauArr] = await Promise.all([
      Activity.distinct('userId', { createdAt: { $gte: day } }),
      Activity.distinct('userId', { createdAt: { $gte: week } }),
      Activity.distinct('userId', { createdAt: { $gte: month } })
    ]);
    res.json({ dau: dauArr.length, wau: wauArr.length, mau: mauArr.length });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// PENDING PAYMENTS — signed up but isPaid=false and masterDsaAccess=false
router.get('/analytics/pending-payments', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({ isPaid: false, masterDsaAccess: false })
      .select('name email mobile createdAt').sort({ createdAt: -1 }).lean();
    const total = await User.countDocuments({});
    const conversionRate = total ? (((total - users.length) / total) * 100).toFixed(1) : 0;
    res.json({ users, total, unpaid: users.length, conversionRate });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// TOTAL REVENUE SUMMARY
router.get('/analytics/revenue', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const basePaid = await User.countDocuments({ isPaid: true });
    const masterDsa = await User.countDocuments({ masterDsaAccess: true });
    const bothAccess = await User.countDocuments({ isPaid: true, masterDsaAccess: true });
    // Estimate: base = ₹99 each, masterDsa only = ₹1000 each, both = ₹99 + ₹1000
    const baseOnly = basePaid - bothAccess;
    const dsaOnly = masterDsa - bothAccess;
    const totalRevenue = (baseOnly * 99) + (dsaOnly * 1000) + (bothAccess * 1099);

    // Today's revenue
    const todayStart = new Date(); todayStart.setHours(0,0,0,0);
    const todayBase = await User.countDocuments({ isPaid: true, createdAt: { $gte: todayStart } });
    const todayDsa = await User.countDocuments({ masterDsaAccess: true, createdAt: { $gte: todayStart } });
    const todayRevenue = (todayBase * 99) + (todayDsa * 1000);

    res.json({ totalRevenue, todayRevenue, baseOnly, dsaOnly, bothAccess, basePaid, masterDsa });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// backend/routes/admin.js mein add karo
const Notification = require('../models/Notification');

// Admin — create notification
router.post('/notification', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const n = await Notification.create(req.body);
    res.json(n);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// Admin — get all notifications with viewer count
router.get('/notifications', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const list = await Notification.find().sort({ createdAt: -1 }).lean();
    const User = require('../models/User');
    const withNames = await Promise.all(list.map(async n => {
      const viewers = await User.find({ _id: { $in: n.viewedBy } }).select('name email').lean();
      return { ...n, viewers };
    }));
    res.json(withNames);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// Admin — toggle active
router.patch('/notification/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const n = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(n);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// Admin — delete
router.delete('/notification/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// ALL USERS — get active notifications (called on every page load)
router.get('/active-notifications', verifyToken, async (req, res) => {
  try {
    const Notification = require('../models/Notification');
    const list = await Notification.find({ active: true }).select('-viewedBy').lean();
    res.json(list);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// ALL USERS — mark as viewed
router.post('/notification/:id/view', verifyToken, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      $addToSet: { viewedBy: req.user.id }
    });
    res.json({ ok: true });
  } catch(err) { res.status(500).json({ message: err.message }); }
});
router.post('/seed-notes', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { execSync } = require('child_process');
    execSync('node /opt/render/project/src/backend/seedNotes.js', { stdio:'inherit' });
    const count = await require('../models/Content').Note.countDocuments();
    res.json({ message: `Done! ${count} notes` });
  } catch(err) { res.status(500).json({ message: err.message }); }
});
// ── SECURITY: Password sharing detection ──
// Jinke abhi (last 7 din ke andar, JWT valid rehne tak) 2+ alag devices/IPs se
// active session hai unhe suspicious mark karte hain.
router.get('/security/suspicious-devices', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
    const cutoff = new Date(Date.now() - WINDOW_MS);

    // Raw history — dedupe nahi hota yahan, purane accounts ka bhi data available hai
    const logs = await LoginLog.find({ loginAt: { $gte: cutoff } }).sort({ loginAt: -1 });

    const byUser = {};
    for (const log of logs) {
      const uid = String(log.userId);
      if (!byUser[uid]) byUser[uid] = { name: log.name, email: log.email, entries: [], deviceSet: new Set() };
      byUser[uid].entries.push({ ip: log.ip, device: log.device, loginAt: log.loginAt });
      byUser[uid].deviceSet.add((log.ip || '') + '|' + (log.device || ''));
    }

    const result = Object.entries(byUser)
      .map(([uid, u]) => ({
        id: uid,
        name: u.name,
        email: u.email,
        activeDeviceCount: u.deviceSet.size,
        devices: u.entries.slice(0, 15) // recent 15 login attempts dikhayenge
      }))
      .filter(u => u.activeDeviceCount >= 2)
      .sort((a, b) => b.activeDeviceCount - a.activeDeviceCount);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

