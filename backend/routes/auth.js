const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { verifyToken } = require('../middleware/auth');
const LoginLog = require('../models/LoginLog');
const { verifyGoogleIdToken } = require('../services/googleAuth');

function getIP(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket.remoteAddress || 'Unknown';
}

function getDevice(req) {
  return (req.headers['user-agent'] || 'Unknown').substring(0, 150);
}
const crypto = require('crypto');

function makeToken(user, existingSid) {
  const sessionId = existingSid || crypto.randomUUID();
  const token = jwt.sign(
    {
      id:      user._id,
      email:   user.email,
      name:    user.name,
      isPaid:  user.isPaid,
      isAdmin: user.isAdmin,
      sid:     sessionId,
      sv:      user.sessionVersion || 0
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  return { token, sessionId };
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
    // Naye users ab sirf Google se signup karte hain (password wale accounts share ho jate the)
    if (process.env.GOOGLE_CLIENT_ID)
      return res.status(400).json({ message: 'New accounts are created with Google. Please sign up with Google.' });

    // const { name, email, password, mobile } = req.body;
    const { name, email, password, mobile, referredBy , plan, college } = req.body;

    if (!name || !email || !password || !mobile)
      return res.status(400).json({ message: 'Name, email and password required' });
    if (password.length < 6)
      return res.status(400).json({ message: 'Password min 6 characters' });

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists)
      return res.status(400).json({ message: 'Email already registered' });

    // College sirf yahin set hota hai, signup ke waqt — koi bhi doosri jagah se
    // change nahi ho sakta. Sirf 'active' status wale college hi valid hain.
    const College = require('../models/College');
    let userCollege = 'kiit';
    if (college) {
      const c = await College.findOne({ slug: String(college).toLowerCase().trim(), status: 'active' });
      if (c) userCollege = c.slug;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
  name:       name.trim(),
  email:      email.toLowerCase().trim(),
  password:   hashed,
  mobile:     mobile ? mobile.trim() : '',
  college:    userCollege,
  referredBy: referredBy ? referredBy.toUpperCase().trim() : '',
  termsAcceptedAt: new Date(),
       selectedPlan: plan || '499',
  sessions:   []
});

     const { token, sessionId } = makeToken(user);
    user.sessions = addSession(user.sessions, {
      token,
      ip:      getIP(req),
      device:  getDevice(req),
      loginAt: new Date()
    });
    user.activeSessionId = sessionId; // sirf yahi session ab valid hai
    await user.save();

    res.status(201).json({
      token,
      user: {
        id:      user._id,
        name:    user.name,
        email:   user.email,
        college: user.college,
        isPaid:  user.isPaid,
        isAdmin: user.isAdmin,
        masterDsaAccess: user.masterDsaAccess || false,
        selectedPlan:    user.selectedPlan    || '499'
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

    // Google se signup hua account — isme password hai hi nahi, to password login nahi chalega
    if (!user.password)
      return res.status(400).json({ message: 'You signed up using Google. Please log in with Google.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: 'Invalid credentials' });

const { token, sessionId } = makeToken(user);

    // Naya login hamesha "current" ban jata hai — purana kahin bhi (kisi bhi device/IP) turant invalid ho jata hai
    user.sessions = addSession(user.sessions, {
      token,
      ip:      getIP(req),
      device:  getDevice(req),
      loginAt: new Date()
    });
    user.activeSessionId = sessionId;
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
        college: user.college,
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

     const { token: newToken } = makeToken(user, req.user.sid);

 const resumePlan = user.resume150 ? '150' : user.resume99 ? '99' : user.resume49 ? '49' : '';
   res.json({
  token: newToken,
  user: {
    id:              user._id,
    name:            user.name,
    email:           user.email,
    college:         user.college,
    isPaid:          user.isPaid,
    isAdmin:         user.isAdmin,
    hasTestAccess:   user.hasTestAccess   || false,
    masterDsaAccess: user.masterDsaAccess || false,
    selectedPlan:    user.selectedPlan    || '99',
    authProvider:    user.authProvider    || 'local',
    resumePlan
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
    if (!user.password)
      return res.status(400).json({ message: 'Your account uses Google sign-in, so there is no password to change.' });
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(400).json({ message: 'Current password is wrong' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.sessions = [];
    user.activeSessionId = null; // sab devices se turant logout — jaisa message neeche keh raha hai
    await user.save();

    res.json({ message: 'Password updated. Please login again.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GOOGLE SIGN-IN ──
// Frontend Google se ID token ("credential") leke aata hai. Hum usko Google ke public keys se
// verify karte hain, uske baad hi email/googleId pe bharosa karte hain.
const GOOGLE_SIGNUP_TTL = '15m';
function googleSignupSecret() { return process.env.JWT_SECRET + ':google-signup'; }

// Login jaisa hi session banao (single-device rule same rehta hai)
async function startSession(user, req, logLogin) {
  const { token, sessionId } = makeToken(user);
  user.sessions = addSession(user.sessions, {
    token,
    ip:      getIP(req),
    device:  getDevice(req),
    loginAt: new Date()
  });
  user.activeSessionId = sessionId;
  await user.save();

  if (logLogin) {
    try {
      await LoginLog.create({ userId: user._id, name: user.name, email: user.email, ip: getIP(req), device: getDevice(req) });
    } catch (logErr) {
      console.log('LoginLog error:', logErr.message);
    }
  }
  return token;
}

function googleUserPayload(user) {
  return {
    id:      user._id,
    name:    user.name,
    email:   user.email,
    college: user.college,
    isPaid:  user.isPaid,
    isAdmin: user.isAdmin,
    masterDsaAccess: user.masterDsaAccess || false,
    selectedPlan:    user.selectedPlan    || '99',
    authProvider:    user.authProvider    || 'local'
  };
}

// Step 1: Google login / signup ki shuruaat
//  - Google account pehle se linked hai  -> seedha login
//  - Naya Google account                 -> needsSignup (mobile/college/terms baaki hain)
//  - Email pe password wala account hai  -> abhi link nahi karte, wahi se login karwao
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential)
      return res.status(400).json({ message: 'Google sign-in failed. Please try again.' });

    let g;
    try {
      g = await verifyGoogleIdToken(credential);
    } catch (verr) {
      console.error('Google verify error:', verr.message);
      if (verr.code === 'NOT_CONFIGURED')
        return res.status(500).json({ message: 'Google sign-in is not available right now.' });
      // 401 nahi — frontend 401 pe user ko logout/redirect kar deta hai
      return res.status(400).json({ message: 'Google sign-in failed. Please try again.' });
    }

    const user = await User.findOne({ googleId: g.googleId });
    if (user) {
      const token = await startSession(user, req, true);
      return res.json({ token, user: googleUserPayload(user) });
    }

    const byEmail = await User.findOne({ email: g.email });
    if (byEmail)
      return res.status(400).json({ message: 'This email is already registered with a password. Please log in with your email and password.' });

    const signupToken = jwt.sign(
      { purpose: 'google-signup', googleId: g.googleId, email: g.email, name: g.name },
      googleSignupSecret(),
      { expiresIn: GOOGLE_SIGNUP_TTL }
    );
    res.json({ needsSignup: true, signupToken, name: g.name, email: g.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Step 2: naye Google user ka account banao (mobile, college, referral, terms yahan aate hain)
router.post('/google/signup', async (req, res) => {
  try {
    const { signupToken, name, mobile, referredBy, plan, college } = req.body;
    if (!signupToken)
      return res.status(400).json({ message: 'Signup session expired. Please sign in with Google again.' });

    let g;
    try {
      g = jwt.verify(signupToken, googleSignupSecret());
    } catch (e) {
      return res.status(400).json({ message: 'Signup session expired. Please sign in with Google again.' });
    }
    if (g.purpose !== 'google-signup')
      return res.status(400).json({ message: 'Signup session expired. Please sign in with Google again.' });

    if (!mobile || !String(mobile).trim())
      return res.status(400).json({ message: 'Mobile number is required' });

    const exists = await User.findOne({ $or: [{ email: g.email }, { googleId: g.googleId }] });
    if (exists)
      return res.status(400).json({ message: 'Email already registered' });

    // College sirf yahin set hota hai, signup ke waqt (register route jaisa hi)
    const College = require('../models/College');
    let userCollege = 'kiit';
    if (college) {
      const c = await College.findOne({ slug: String(college).toLowerCase().trim(), status: 'active' });
      if (c) userCollege = c.slug;
    }

    const user = await User.create({
      name:       (g.name || (name && String(name).trim()) || g.email.split('@')[0]), // naam Google se hi (locked)
      email:      g.email,
      googleId:   g.googleId,
      authProvider: 'google',
      emailVerified: true,
      mobile:     String(mobile).trim(),
      college:    userCollege,
      referredBy: referredBy ? String(referredBy).toUpperCase().trim() : '',
      termsAcceptedAt: new Date(),
      selectedPlan: plan || '499',
      sessions:   []
    });

    const token = await startSession(user, req, false);
    res.status(201).json({ token, user: googleUserPayload(user) });
  } catch (err) {
    if (err && err.code === 11000)
      return res.status(400).json({ message: 'Email already registered' });
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
