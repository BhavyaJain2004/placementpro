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

// const jwt  = require('jsonwebtoken');
// const User = require('../models/User');

// const verifyToken = async (req, res, next) => {
//   const header = req.headers.authorization;
//   if (!header || !header.startsWith('Bearer '))
//     return res.status(401).json({ message: 'No token' });

//   const token = header.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user    = await User.findById(decoded.id).select('sessions isPaid isAdmin');

//     if (!user)
//       return res.status(401).json({ message: 'User not found' });

//     // Empty sessions = existing old user, allow karo
//     // /me route pe automatically fix ho jayega
//     if (user.sessions && user.sessions.length > 0) {
//       const valid = user.sessions.some(s => s.token === token);
//       if (!valid)
//         return res.status(401).json({ message: 'SESSION_EXPIRED' });
//     }

//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// const verifyPaid = (req, res, next) => {
//   if (!req.user.isPaid)
//     return res.status(403).json({ message: 'Payment required' });
//   next();
// };

// const verifyAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).select('isAdmin');
//     if (!user || !user.isAdmin)
//       return res.status(403).json({ message: 'Admin only' });
//     next();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { verifyToken, verifyPaid, verifyAdmin };
const jwt  = require('jsonwebtoken');
const User = require('../models/User');
const { isEnforced, needsGoogleVerify } = require('../services/googleVerify');

// Google verification pending ho tab bhi sirf ye routes chalne chahiye (verify karne ke liye zaroori)
const GOOGLE_VERIFY_ALLOWED = ['/api/auth/me', '/api/auth/google/verify'];

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('sessionVersion activeSessionId googleId isGoogleReq');
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Force-logout check — agar admin ne "logout everyone" chalaya hai uske baad
    // ka token nahi hai ye, toh reject karo (purana token, naya login chahiye)
    if ((user.sessionVersion || 0) > (decoded.sv || 0)) {
      return res.status(401).json({ message: 'SESSION_EXPIRED' });
    }

    // Single-device enforcement — sirf sabse latest login hi valid session hai.
    // Agar kisi bhi doosre device/IP se naya login hua hai uske baad se, yeh purana
    // token turant reject ho jayega — IP/device match pe depend nahi karta, isliye
    // shared campus WiFi jaisi jagah pe koi galat false-positive nahi aata.
    // (activeSessionId null hone ka matlab purana user hai jisne abhi tak naya
    //  login nahi kiya — usko graceful allow karo, agla login se enforce ho jayega)
    if (user.activeSessionId && decoded.sid !== user.activeSessionId) {
      return res.status(401).json({ message: 'SESSION_EXPIRED' });
    }

    // Google verification — deadline ke baad jab tak verify nahi hota, koi route/data access nahi
    // (chahe user URL change karke kahin bhi jaye). Sirf verify ke routes khule rehte hain.
    if (isEnforced() && needsGoogleVerify(user)) {
      const path = (req.originalUrl || '').split('?')[0].replace(/\/+$/, '');
      if (!GOOGLE_VERIFY_ALLOWED.includes(path)) {
        return res.status(403).json({ code: 'GOOGLE_VERIFY_REQUIRED', message: 'Please verify your account with Google to continue.' });
      }
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const verifyPaid = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('isPaid');
    if (!user || !user.isPaid)
      return res.status(403).json({ message: 'Payment required' });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
