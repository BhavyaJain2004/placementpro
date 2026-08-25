const router      = require('express').Router();
const bcrypt      = require('bcryptjs');
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
// Make a user admin (run once for yourself)
router.post('/make-admin', verifyToken, verifyAdmin, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate({ email }, { isAdmin: true }, { new: true });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, message: `${email} is now admin` });
});
router.post('/activate-resume', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { email, plan } = req.body;
    if (!email || !['49','99','150'].includes(plan))
      return res.status(400).json({ message: 'Email aur valid plan (49/99/150) chahiye' });

    const update = {
      resume49: plan === '49',
      resume99: plan === '99',
      resume150: plan === '150',
      resumeAnalysisUsed: false
    };

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      update,
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Is email ka koi account nahi mila' });

    res.json({ message: `✅ Resume${plan} activate ho gaya ${user.name} (${user.email}) ke liye` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Kisi bhi user ka password reset karo — bina account delete kiye
router.post('/reset-password', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ message: 'Email aur new password dono chahiye' });
    if (newPassword.length < 6)
      return res.status(400).json({ message: 'Password kam se kam 6 characters ka hona chahiye' });

    const hashed = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { password: hashed, sessions: [] },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Is email ka koi account nahi mila' });

    res.json({ message: `✅ Password reset ho gaya ${user.name} (${user.email}) ke liye` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

// ── PACKAGES (pricing plans — Base/Plus/Complete etc, admin-controlled) ──
const Package = require('../models/Package');

// Admin — get ALL packages (active + inactive), for the admin panel list
router.get('/packages', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const list = await Package.find().sort({ order: 1 });
    res.json(list);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// Admin — create a new package (fully custom — can add a 4th, 5th plan etc, no code change needed)
router.post('/package', verifyToken, verifyAdmin, async (req, res) => {
  try {
    if (req.body.key) {
      const existing = await Package.findOne({ key: req.body.key });
      if (existing) {
        return res.status(400).json({ message: `Plan Key "${req.body.key}" pehle se exist karti hai (package: "${existing.name}"). Naya banane ke liye alag key do, ya "Edit" use karo.` });
      }
    }
    const p = await Package.create(req.body);
    res.json(p);
  } catch(err) { res.status(400).json({ message: err.message }); }
});

// Admin — update any field (price, desc, features, order...) or toggle isActive on/off
router.patch('/package/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const p = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ message: 'Package not found' });
    res.json(p);
  } catch(err) { res.status(400).json({ message: err.message }); }
});

// Admin — permanently delete a package
router.delete('/package/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
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
// ── SECURITY: Password sharing detection ──
// Jinke abhi (last 7 din ke andar, JWT valid rehne tak) 2+ alag devices/IPs se
// active session hai unhe suspicious mark karte hain.
router.get('/security/suspicious-devices', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const SystemConfig = require('../models/SystemConfig');
    const config = await SystemConfig.findOne({ key: 'security' }).catch(() => null);

    const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
    let cutoff = new Date(Date.now() - WINDOW_MS);
    // Force-logout ke baad se hi dekhna hai — jo bhi zyada recent hai wahi cutoff banega
    if (config?.lastForceLogoutAt && config.lastForceLogoutAt > cutoff) {
      cutoff = config.lastForceLogoutAt;
    }

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
        devices: u.entries.slice(0, 15)
      }))
      .filter(u => u.activeDeviceCount >= 2)
      .sort((a, b) => b.activeDeviceCount - a.activeDeviceCount);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ek specific user ki poori login history (LoginLog se, saari purani entries)
router.get('/security/history/:userId', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const SystemConfig = require('../models/SystemConfig');
    const config = await SystemConfig.findOne({ key: 'security' });
    const filter = { userId: req.params.userId };
    if (config?.lastForceLogoutAt) {
      filter.loginAt = { $gte: config.lastForceLogoutAt };
    }
    const logs = await LoginLog.find(filter)
      .sort({ loginAt: -1 })
      .limit(200);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── FORCE LOGOUT EVERYONE (one-time "clean slate" button) ──
// Sabka current token turant invalid ho jayega. Koi data delete nahi hota,
// bas login screen pe wapas bhej dega — dobara login karne pe naya
// session-based tracking (neeche wala) turant kaam karna shuru kar dega.
router.post('/security/force-logout-all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const SystemConfig = require('../models/SystemConfig');
    const result = await User.updateMany({}, { $inc: { sessionVersion: 1 } });
    await SystemConfig.findOneAndUpdate(
      { key: 'security' },
      { lastForceLogoutAt: new Date() },
      { upsert: true }
    );
    res.json({ message: 'Sabka session invalidate ho gaya. Security lists ab sirf aaj se aage ka data dikhayengi.', matched: result.matchedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── CLEAR OLD SESSION ACTIVITY (ek-baari — buggy purana ping data hatane ke liye) ──
// Sirf SessionActivity collection clear hoti hai (jahan overlap-detection ka data hai).
// LoginLog aur baaki kuch bhi touch nahi hota, koi user data delete nahi hota.
router.post('/security/clear-session-activity', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const SessionActivity = require('../models/SessionActivity');
    const result = await SessionActivity.deleteMany({});
    res.json({ message: 'Purana session-activity data clear ho gaya', deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GENUINE SHARING DETECTION (session-based, IP/device pe depend nahi karta) ──
// 🔴 Confirmed: 2 alag login-sessions ki activity overlap hui hai (real concurrent use)
// 🟡 Suspicious: unusually zyada fresh-logins hue hain 30 din mein (turn-by-turn sharing ka signal)
// ── GENUINE SHARING DETECTION (device-based, 30-din recurring pattern) ──
// IP-based grouping college WiFi ke liye kaam ka nahi tha — sab students ek hi campus
// network se aate hain, isliye IP kabhi kisi ko differentiate nahi karta. Device (User-Agent
// string — phone vs laptop ka OS/browser) yahan zyada reliable signal hai.
// Limitation: agar 2 log EXACT same phone model + same browser version use karein,
// unka User-Agent identical ho sakta hai — us edge case mein differentiate nahi kar payega.
router.get('/security/genuine-detection', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const SystemConfig = require('../models/SystemConfig');
    const config = await SystemConfig.findOne({ key: 'security' }).catch(() => null);

    // 30 din ki window — Netflix jaisa "recurring pattern over time" pakadne ke liye,
    // sirf "abhi is second overlap hua" wala narrow check nahi
    const WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
    let cutoff = new Date(Date.now() - WINDOW_MS);
    if (config?.lastForceLogoutAt && config.lastForceLogoutAt > cutoff) {
      cutoff = config.lastForceLogoutAt;
    }

    const logs = await LoginLog.find({ loginAt: { $gte: cutoff } })
      .select('userId device loginAt name email')
      .sort({ loginAt: 1 });

    const deviceOf = (d) => (d || 'Unknown').trim();

    const byUser = {};
    for (const log of logs) {
      const uid = String(log.userId);
      if (!byUser[uid]) byUser[uid] = { name: log.name, email: log.email, dayDeviceMap: {}, lastActive: 0, count: 0 };
      const dev = deviceOf(log.device);
      const day = new Date(log.loginAt).toISOString().split('T')[0];
      if (!byUser[uid].dayDeviceMap[day]) byUser[uid].dayDeviceMap[day] = new Set();
      byUser[uid].dayDeviceMap[day].add(dev);
      byUser[uid].lastActive = Math.max(byUser[uid].lastActive, new Date(log.loginAt).getTime());
      byUser[uid].count++;
    }

    const result = [];
    for (const [uid, u] of Object.entries(byUser)) {
      const allDevices = new Set();
      Object.values(u.dayDeviceMap).forEach(set => set.forEach(d => allDevices.add(d)));
      if (allDevices.size < 2) continue; // sirf ek hi device se aa raha hai — normal, skip

      const totalDistinctDays = Object.keys(u.dayDeviceMap).length;
      const daysWithSwitch = Object.values(u.dayDeviceMap).filter(set => set.size >= 2).length;

      // 🔴 Confirmed: 3+ alag devices total, YA recurring pattern 3+ alag dinon mein
      // 🟡 Watch: sirf 2 device dikhe, ek-do baar — ho sakta hai genuine naya phone/laptop ho
      const status = (allDevices.size >= 3 || totalDistinctDays >= 3) ? 'confirmed' : 'watch';

      result.push({
        id: uid,
        name: u.name || 'Unknown',
        email: u.email || '',
        status,
        reason: `${allDevices.size} alag devices se login, ${totalDistinctDays} alag dinon mein${daysWithSwitch ? ` (${daysWithSwitch} din mein same-din switch bhi hua)` : ''}`,
        activeSessions: allDevices.size,
        totalLogins: u.count,
        lastActive: new Date(u.lastActive)
      });
    }

    result.sort((a, b) => (b.status === 'confirmed') - (a.status === 'confirmed') || b.activeSessions - a.activeSessions);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PAYMENT SUBMISSIONS (real revenue tracking) ──
const Payment = require('../models/Payment');

// Sabhi submissions — real amountPaid ke saath, actual revenue calculate karta hai
// Sabhi submissions — real amountPaid ke saath, actual revenue calculate karta hai
// ── ACTUAL REVENUE (naya dedicated section — real payments pe based, wrong/mismatched
// plan-signup se disconnect. Package-tier count actual granted access (isPaid/hasTestAccess/
// masterDsaAccess) se nikalta hai, Payment.plan se nahi — kyunki kabhi kabhi user ne 99 mein
// signup kiya par 199 diya toh usko Plus (Base+Test) diya gaya, ya 299 mein signup kiya par
// sirf 199 diya toh sirf Plus diya gaya — asli access hi asli truth hai) ──
router.get('/actual-revenue', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const approvedPayments = await Payment.find({ status: 'approved' })
      .select('userId name email plan amountPaid createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const allUsers = await User.find()
      .select('name email mobile createdAt isPaid hasTestAccess masterDsaAccess')
      .lean();

    // Mobile number Payment mein store nahi hota, User se le lo (search ke liye)
    const userMap = {};
    allUsers.forEach(u => { userMap[String(u._id)] = u; });

    const dayKey = (d) => new Date(d).toISOString().split('T')[0];
    const monthKey = (d) => new Date(d).toISOString().slice(0, 7); // YYYY-MM

    // ── Totals ──
    const totalRevenue = approvedPayments.reduce((s, p) => s + (p.amountPaid || 0), 0);
    const nowMonthKey = monthKey(new Date());
    const todayKey = dayKey(new Date());

    // ── Day-wise (pichle 30 din) ──
    const dayMap = {};
    approvedPayments.forEach(p => {
      const k = dayKey(p.createdAt);
      if (!dayMap[k]) dayMap[k] = { date: k, revenue: 0, count: 0 };
      dayMap[k].revenue += (p.amountPaid || 0);
      dayMap[k].count++;
    });
    const dayWise = Object.values(dayMap).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);

    // ── Week-wise (pichle 12 hafte, Monday-start) ──
    const weekKeyOf = (d) => {
      const dt = new Date(d);
      const day = dt.getUTCDay();
      const diff = (day === 0 ? -6 : 1) - day; // Monday tak wapas jao
      const monday = new Date(dt);
      monday.setUTCDate(dt.getUTCDate() + diff);
      return monday.toISOString().split('T')[0];
    };
    const weekMap = {};
    approvedPayments.forEach(p => {
      const k = weekKeyOf(p.createdAt);
      if (!weekMap[k]) weekMap[k] = { weekStart: k, revenue: 0, count: 0 };
      weekMap[k].revenue += (p.amountPaid || 0);
      weekMap[k].count++;
    });
    const weekWise = Object.values(weekMap).sort((a, b) => b.weekStart.localeCompare(a.weekStart)).slice(0, 12);

    // ── Month-wise (sab mahine) ──
    const monthMap = {};
    approvedPayments.forEach(p => {
      const k = monthKey(p.createdAt);
      if (!monthMap[k]) monthMap[k] = { month: k, revenue: 0, count: 0 };
      monthMap[k].revenue += (p.amountPaid || 0);
      monthMap[k].count++;
    });
    const monthWise = Object.values(monthMap).sort((a, b) => b.month.localeCompare(a.month));
    const currentMonthRevenue = monthMap[nowMonthKey]?.revenue || 0;
    const todayRevenue = dayMap[todayKey]?.revenue || 0;

    // ── Signups per month (sab users) ──
    const signupMonthMap = {};
    allUsers.forEach(u => {
      const k = monthKey(u.createdAt);
      signupMonthMap[k] = (signupMonthMap[k] || 0) + 1;
    });
    const signupsByMonth = Object.entries(signupMonthMap)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => b.month.localeCompare(a.month));

    // ── Converted per month (jis mahine user ka PEHLA approved payment hua) ──
    const firstPaymentByUser = {};
    approvedPayments.forEach(p => {
      const uid = String(p.userId);
      if (!firstPaymentByUser[uid] || new Date(p.createdAt) < new Date(firstPaymentByUser[uid]))
        firstPaymentByUser[uid] = p.createdAt;
    });
    const convertedMonthMap = {};
    Object.values(firstPaymentByUser).forEach(d => {
      const k = monthKey(d);
      convertedMonthMap[k] = (convertedMonthMap[k] || 0) + 1;
    });
    const convertedByMonth = Object.entries(convertedMonthMap)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => b.month.localeCompare(a.month));

    // ── Package-tier counts — ASLI granted access se (Payment.plan se nahi) ──
    let baseOnly = 0, plusTests = 0, complete = 0, unpaid = 0;
    allUsers.forEach(u => {
      if (!u.isPaid) { unpaid++; return; }
      if (u.masterDsaAccess) complete++;
      else if (u.hasTestAccess) plusTests++;
      else baseOnly++;
    });

    // ── Search list (approved transactions, mobile enriched) ──
    const transactions = approvedPayments.map(p => ({
      id: p._id,
      name: p.name,
      email: p.email,
      mobile: userMap[String(p.userId)]?.mobile || '',
      plan: p.plan,
      amountPaid: p.amountPaid,
      createdAt: p.createdAt
    }));

    res.json({
      totalRevenue,
      currentMonthRevenue,
      todayRevenue,
      totalSignups: allUsers.length,
      totalConverted: Object.keys(firstPaymentByUser).length,
      dayWise,
      weekWise,
      monthWise,
      signupsByMonth,
      convertedByMonth,
      packageTiers: { baseOnly, plusTests, complete, unpaid },
      transactions
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/payment-submissions', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.query;

    // ── AUTO-SYNC ── Agar kisi pending submission ke user ko DB se seedha
    // access diya gaya hai (isPaid/masterDsaAccess manually true kiya gaya),
    // toh usko yahan khud approved mark kar do — panel aur DB hamesha sync rahein
    const pendingOnes = await Payment.find({ status: 'pending' });
    for (const p of pendingOnes) {
      const u = await User.findById(p.userId).select('isPaid hasTestAccess masterDsaAccess resume49 resume99 resume150');
      if (!u) continue;

      let nowHasAccess = false;
      if (p.plan === '99') nowHasAccess = u.isPaid;
      else if (p.plan === '199') nowHasAccess = u.isPaid && u.hasTestAccess;
      else if (p.plan === '299' || p.plan === '1000') nowHasAccess = u.isPaid && u.masterDsaAccess;
      else if (p.plan === 'resume49') nowHasAccess = u.resume49;
      else if (p.plan === 'resume99') nowHasAccess = u.resume99;
      else if (p.plan === 'resume150') nowHasAccess = u.resume150;

      if (nowHasAccess) {
        p.status = 'approved';
        p.reviewedAt = new Date();
        await p.save();
      }
    }

    const filter = status ? { status } : {};
    const submissions = await Payment.find(filter).sort({ createdAt: -1 }).lean();

    const approved = submissions.filter(s => s.status === 'approved');
    const actualRevenue = approved.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
    const pendingCount  = submissions.filter(s => s.status === 'pending').length;

    res.json({ submissions, actualRevenue, approvedCount: approved.length, pendingCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Ek submission approve karo — user ko sahi access bhi mil jayega automatically
router.post('/payment-submissions/:id/approve', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Submission not found' });

    payment.status = 'approved';
    payment.reviewedAt = new Date();
    await payment.save();

    let update, accessLabel;
    if (payment.plan === '99') {
      update = { isPaid: true, paidAt: new Date(), selectedPlan: '99' };
      accessLabel = 'Base (₹99)';
    } else if (payment.plan === '199') {
      update = { isPaid: true, paidAt: new Date(), hasTestAccess: true, resume49: true, selectedPlan: '199' };
      accessLabel = 'Plus — Base + Mock Tests (₹199)';
    } else if (payment.plan === '299' || payment.plan === '1000') {
      update = { isPaid: true, paidAt: new Date(), hasTestAccess: true, masterDsaAccess: true, resume150: true, resumeAnalysisUsed: false, selectedPlan: '299' };
      accessLabel = 'Complete — Master DSA (₹299)';
    } else if (['resume49','resume99','resume150'].includes(payment.plan)) {
      const resumePlanValue = payment.plan.replace('resume', '');
      update = {
        resume49: resumePlanValue === '49',
        resume99: resumePlanValue === '99',
        resume150: resumePlanValue === '150',
        resumeAnalysisUsed: false
      };
      accessLabel = `Resume ₹${resumePlanValue}`;
    } else { update = { isPaid: true, paidAt: new Date() }; accessLabel = 'Base'; }

    const user = await User.findByIdAndUpdate(payment.userId, update, { new: true });

    res.json({ message: `✅ Approved & ${accessLabel} access diya gaya`, user: { name: user?.name, email: user?.email } });  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Reject karo (galat/fake screenshot waghera)
  router.post('/payment-submissions/:id/reject', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', reviewedAt: new Date() },
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: 'Submission not found' });
    res.json({ message: 'Rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Amount Paid edit karo
router.post('/payment-submissions/:id/edit-amount', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { amountPaid } = req.body;
    if (!amountPaid || amountPaid <= 0)
      return res.status(400).json({ message: 'Valid amount chahiye' });

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { amountPaid },
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: 'Submission not found' });
    res.json({ message: '✅ Amount updated', payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/update-company-tests', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { execSync } = require('child_process');
    const output = execSync('node /opt/render/project/src/backend/updateCompanyTests.js', { encoding: 'utf-8' });
    res.json({ message: 'Done!', log: output });
  } catch (err) {
    res.status(500).json({ message: err.message, log: err.stdout?.toString() });
  }
});

router.post('/import-companies2026', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { execSync } = require('child_process');
    const output = execSync('node /opt/render/project/src/backend/importCompanies2026.js', { encoding: 'utf-8' });
    res.json({ message: 'Done!', log: output });
  } catch (err) {
    res.status(500).json({ message: err.message, log: err.stdout?.toString() });
  }
});

router.get('/migrate-resume-field', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await User.updateMany(
      { resume49: { $exists: false } },
      { $set: { resume49: false, resume99: false, resume150: false, resumeAnalysisUsed: false } }
    );
    res.json({ message: 'Done!', updated: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
