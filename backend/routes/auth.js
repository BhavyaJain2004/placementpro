const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const sign = (user) => jwt.sign(
  { id: user._id, name: user.name, email: user.email, isPaid: user.isPaid, isAdmin: user.isAdmin },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    if (password.length < 6) return res.status(400).json({ error: 'Password min 6 characters' });
    if (await User.findOne({ email })) return res.status(400).json({ error: 'Email already registered' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
    res.json({ token: sign(user), user: { name: user.name, email: user.email, isPaid: user.isPaid } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'No account found with this email' });
    if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ error: 'Incorrect password' });
    res.json({ token: sign(user), user: { name: user.name, email: user.email, isPaid: user.isPaid } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});


// Get current user (refresh token)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ token: sign(user), user });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Change password
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ error: 'All fields required' });
    if (newPassword.length < 6) return res.status(400).json({ error: 'Min 6 characters' });
    const user = await User.findById(req.user.id);
    if (!await bcrypt.compare(currentPassword, user.password))
      return res.status(400).json({ error: 'Current password is incorrect' });
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
