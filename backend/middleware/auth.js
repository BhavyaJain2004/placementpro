const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Check if token still exists in user's sessions
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: 'User not found' });

//     const sessionExists = user.sessions?.some(s => s.token === token);
//     if (!sessionExists) {
//       return res.status(401).json({ message: 'Session expired. Please login again.' });
//     }

//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

const verifyPaid = (req, res, next) => {
  if (!req.user?.isPaid) return res.status(403).json({ error: 'Payment required' });
  next();
};

const verifyAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Admin access only' });
  next();
};

module.exports = { verifyToken, verifyPaid, verifyAdmin };
