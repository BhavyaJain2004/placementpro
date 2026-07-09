


const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { verifyToken } = require('../middleware/auth');
const LoginLog = require('../models/LoginLog');

function getIP(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket.remoteAddress || 'Unknown';
}

function getDevice(req) {
  return (req.headers['user-agent'] || 'Unknown').substring(0, 150);
}

function makeToken(user) {
  return jwt.sign(
    {
      id:      user._id,
      email:   user.email,
      name:    user.name,
      isPaid:  user.isPaid,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // JWT expiry (7d) ke barabar

function addSession(existingSessions, newSession) {
  const cutoff = Date.now() - SESSION_MAX_AGE_MS;
  const cleaned = (existingSessions || []).filter(
    s => s.loginAt && new Date(s.loginAt).getTime() > cutoff
  );
  const withoutSameDevice = cleaned.filter(
    s => !(s.ip === newSession.ip && s.device === newSession.device)
  );
  withoutSameDevice.push(newSession);
  return withoutSameDevice;
}
// REGISTER
router.post('/register', async (req, res) => {
  try {
    // const { name, email, password, mobile } = req.body;
    const { name, email, password, mobile, referredBy , plan } = req.body;

    if (!name || !email || !password || !mobile)
      return res.status(400).json({ message: 'Name, email and password required' });
    if (password.length < 6)
      return res.status(400).json({ message: 'Password min 6 characters' });

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists)
      return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
  name:       name.trim(),
  email:      email.toLowerCase().trim(),
  password:   hashed,
  mobile:     mobile ? mobile.trim() : '',
  referredBy: referredBy ? referredBy.toUpperCase().trim() : '',
  termsAcceptedAt: new Date(),
      selectedPlan: plan === '1000' ? '1000' : '99',
  sessions:   []
});

    const token = makeToken(user);
    user.sessions = [{
      token,
      ip:      getIP(req),
      device:  getDevice(req),
      loginAt: new Date()
    }];
    await user.save();

    res.status(201).json({
      token,
      user: {
        id:      user._id,
        name:    user.name,
        email:   user.email,
        isPaid:  user.isPaid,
        isAdmin: user.isAdmin,
        masterDsaAccess: user.masterDsaAccess || false,
        selectedPlan:    user.selectedPlan    || '99'
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = makeToken(user);

    // SINGLE DEVICE
    user.sessions = [{
      token,
      ip:      getIP(req),
      device:  getDevice(req),
      loginAt: new Date()
    }];
    await user.save();

    // LoginLog — save ke baad, alag try-catch mein
    try {
      await LoginLog.create({
        userId: user._id,
        name:   user.name,
        email:  user.email,
        ip:     getIP(req),
        device: getDevice(req)
      });
    } catch(logErr) {
      console.log('LoginLog error:', logErr.message);
    }

    res.json({
      token,
      user: {
        id:      user._id,
        name:    user.name,
        email:   user.email,
        isPaid:  user.isPaid,
        isAdmin: user.isAdmin,
        masterDsaAccess: user.masterDsaAccess || false,
    selectedPlan:    user.selectedPlan    || '99'
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET ME — existing users ka session yahan auto fix hoga
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -sessions');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newToken = makeToken(user);

   res.json({
  token: newToken,
  user: {
    id:              user._id,
    name:            user.name,
    email:           user.email,
    isPaid:          user.isPaid,
    isAdmin:         user.isAdmin,
    hasTestAccess:   user.hasTestAccess   || false,
    masterDsaAccess: user.masterDsaAccess || false,
     selectedPlan:    user.selectedPlan    || '99'
  }
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// CHANGE PASSWORD
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: 'Both fields required' });
    if (newPassword.length < 6)
      return res.status(400).json({ message: 'Min 6 characters' });

    const user  = await User.findById(req.user.id);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(400).json({ message: 'Current password is wrong' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.sessions = [];
    await user.save();

    res.json({ message: 'Password updated. Please login again.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const Activity = require('../models/Activity');

router.post('/ping', verifyToken, async (req, res) => {
  try {
    await Activity.create({ userId: req.user.id, createdAt: new Date() });
    res.json({ ok: true });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
