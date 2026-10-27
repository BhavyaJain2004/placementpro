// Existing users ke "Verify with Google" ke rules ek hi jagah.
//
//  - isGoogleReq: false (DB mein manually)  -> us account pe Google verification zaroori nahi,
//                                              password login hamesha chalta rahega (apne/test accounts ke liye)
//  - googleId set                            -> account Google se verified hai
//  - Deadline tak sirf popup dikhta hai, deadline ke baad unverified account locked (middleware/auth.js)
//
// Deadline Railway variable GOOGLE_VERIFY_DEADLINE se badal sakte ho (ISO format), warna 10 Nov 2026 raat 11:59 IST.
const DEFAULT_DEADLINE = '2026-11-10T23:59:59+05:30';

let deadline = new Date(process.env.GOOGLE_VERIFY_DEADLINE || DEFAULT_DEADLINE);
if (isNaN(deadline.getTime())) deadline = new Date(DEFAULT_DEADLINE);

const isEnforced = () => Date.now() > deadline.getTime();

// Is user ko Google verification chahiye (aur abhi tak nahi hui)?
const needsGoogleVerify = (user) => user.isGoogleReq !== false && !user.googleId;

// Email compare ke liye — Gmail mein dots aur +tag ignore hote hain (a.b+x@gmail.com = ab@gmail.com)
const normalizeEmail = (email) => {
  const e = String(email || '').toLowerCase().trim();
  const at = e.lastIndexOf('@');
  if (at < 1) return e;
  let local = e.slice(0, at);
  let domain = e.slice(at + 1);
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.split('+')[0].replace(/\./g, '');
    domain = 'gmail.com';
  }
  return local + '@' + domain;
};

// Frontend ko bhejne wala status (login / me response mein judta hai)
const verifyInfo = (user) => ({
  needsGoogleVerify:    needsGoogleVerify(user),
  googleVerifyEnforced: isEnforced(),
  googleVerifyDeadline: deadline.toISOString()
});

module.exports = { isEnforced, needsGoogleVerify, normalizeEmail, verifyInfo };
