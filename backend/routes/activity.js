const express     = require('express');
const router      = express.Router();
const ActivityLog = require('../models/ActivityLog');
const SessionActivity = require('../models/SessionActivity');
const { verifyToken } = require('../middleware/auth');

// POST /api/activity/ping — frontend se call hogi
router.post('/ping', verifyToken, async (req, res) => {
  try {
    const { page } = req.body;
    const ip   = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
                 || req.socket.remoteAddress || 'Unknown';

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const existing = await ActivityLog.findOne({
      userId: req.user.id,
      date:   today,
      page:   page || 'dashboard'
    });

    if (!existing) {
      await ActivityLog.create({
        userId: req.user.id,
        name:   req.user.name,
        email:  req.user.email,
        page:   page || 'dashboard',
        ip,
        date:   today
      });
    }

    // Fine-grained tracking (dedupe nahi) — password-sharing detection ke liye
    if (req.user.sid) {
      SessionActivity.create({
        userId:    req.user.id,
        sessionId: req.user.sid,
        page:      page || 'dashboard'
      }).catch(() => {});
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
