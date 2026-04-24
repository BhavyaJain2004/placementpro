// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'No token provided' });
//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// const verifyPaid = (req, res, next) => {
//   if (!req.user?.isPaid) return res.status(403).json({ error: 'Payment required' });
//   next();
// };

// const verifyAdmin = (req, res, next) => {
//   if (!req.user?.isAdmin) return res.status(403).json({ error: 'Admin access only' });
//   next();
// };

// module.exports = { verifyToken, verifyPaid, verifyAdmin };

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user    = await User.findById(decoded.id).select('sessions isPaid isAdmin');

    if (!user)
      return res.status(401).json({ message: 'User not found' });

    // Empty sessions = existing old user, allow karo
    // /me route pe automatically fix ho jayega
    if (user.sessions && user.sessions.length > 0) {
      const valid = user.sessions.some(s => s.token === token);
      if (!valid)
        return res.status(401).json({ message: 'SESSION_EXPIRED' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const verifyPaid = (req, res, next) => {
  if (!req.user.isPaid)
    return res.status(403).json({ message: 'Payment required' });
  next();
};

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('isAdmin');
    if (!user || !user.isAdmin)
      return res.status(403).json({ message: 'Admin only' });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { verifyToken, verifyPaid, verifyAdmin };
