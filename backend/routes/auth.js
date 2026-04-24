// const router  = require('express').Router();
// const bcrypt  = require('bcryptjs');
// const jwt     = require('jsonwebtoken');
// const User    = require('../models/User');
// const { verifyToken } = require('../middleware/auth');

// const sign = (user) => jwt.sign(
//   { id: user._id, name: user.name, email: user.email, isPaid: user.isPaid, isAdmin: user.isAdmin },
//   process.env.JWT_SECRET,
//   { expiresIn: '30d' }
// );

// // Register
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
//     if (password.length < 6) return res.status(400).json({ error: 'Password min 6 characters' });
//     if (await User.findOne({ email })) return res.status(400).json({ error: 'Email already registered' });
//     const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
//     res.json({ token: sign(user), user: { name: user.name, email: user.email, isPaid: user.isPaid } });
//   } catch (e) { res.status(500).json({ error: e.message }); }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'No account found with this email' });
//     if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ error: 'Incorrect password' });
//     res.json({ token: sign(user), user: { name: user.name, email: user.email, isPaid: user.isPaid } });
//   } catch (e) { res.status(500).json({ error: e.message }); }
// });


// // Get current user (refresh token)
// router.get('/me', verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json({ token: sign(user), user });
//   } catch (e) { res.status(500).json({ error: e.message }); }
// });

// // Change password
// router.post('/change-password', verifyToken, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     if (!currentPassword || !newPassword) return res.status(400).json({ error: 'All fields required' });
//     if (newPassword.length < 6) return res.status(400).json({ error: 'Min 6 characters' });
//     const user = await User.findById(req.user.id);
//     if (!await bcrypt.compare(currentPassword, user.password))
//       return res.status(400).json({ error: 'Current password is incorrect' });
//     user.password = await bcrypt.hash(newPassword, 12);
//     await user.save();
//     res.json({ success: true });
//   } catch (e) { res.status(500).json({ error: e.message }); }
// });

// module.exports = router;


const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { verifyToken } = require('../middleware/auth');

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

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password required' });
    if (password.length < 6)
      return res.status(400).json({ message: 'Password min 6 characters' });

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists)
      return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user   = await User.create({
      name:     name.trim(),
      email:    email.toLowerCase().trim(),
      password: hashed,
      mobile:   mobile ? mobile.trim() : '',
      sessions: []
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
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
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

    // SINGLE DEVICE — purane sab sessions delete, sirf naya rakho
    user.sessions = [{
      token,
      ip:      getIP(req),
      device:  getDevice(req),
      loginAt: new Date()
    }];
    await user.save();

    res.json({
      token,
      user: {
        id:      user._id,
        name:    user.name,
        email:   user.email,
        isPaid:  user.isPaid,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ME — existing users ka session yahan auto fix hoga
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const newToken = makeToken(user);

    // Session update karo — existing user hai toh bhi fix ho jayega
    user.sessions = [{
      token:   newToken,
      ip:      getIP(req),
      device:  getDevice(req),
      loginAt: user.sessions && user.sessions.length > 0
               ? user.sessions[0].loginAt
               : new Date()
    }];
    await user.save();

    res.json({
      token: newToken,
      user: {
        id:      user._id,
        name:    user.name,
        email:   user.email,
        isPaid:  user.isPaid,
        isAdmin: user.isAdmin
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

module.exports = router;
