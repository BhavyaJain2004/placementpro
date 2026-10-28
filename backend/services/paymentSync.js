// Pending payments ko approved mark karta hai jab user ko access pehle hi mil chuka ho
// (jaise admin ne DB se seedha isPaid / resume flag true kar diya, ya manually activate kiya).
// Pehle ye sirf tab hota tha jab admin "Payment Submissions" tab kholta tha (aur wo bhi har pending
// ke liye alag-alag query — slow). Ab ye ek hi baar mein batch mein chalta hai, aur
// server.js mein har 10 minute + daily report se pehle apne aap chalta hai.
const Payment = require('../models/Payment');
const User    = require('../models/User');

const RESUME_PLANS = ['resume49', 'resume99', 'resume150'];

async function syncPendingPayments() {
  const pending = await Payment.find({ status: 'pending', userId: { $ne: null } })
    .select('userId plan createdAt').sort({ createdAt: 1 }).lean();
  if (!pending.length) return 0;

  const userIds = [...new Set(pending.map(p => String(p.userId)))];

  const [users, approvedBefore] = await Promise.all([
    User.find({ _id: { $in: userIds } }).select('isPaid resume49 resume99 resume150').lean(),
    // Jis user ki koi base-plan payment pehle se approved hai, uski nayi pending payment
    // (duplicate ya upgrade ho sakti hai) auto-approve nahi hogi — wo tumhare review ke liye pending hi rahegi
    Payment.find({ userId: { $in: userIds }, status: 'approved', plan: { $nin: RESUME_PLANS } }).select('userId').lean()
  ]);

  const userMap = {};
  users.forEach(u => { userMap[String(u._id)] = u; });
  const alreadyPaid = new Set(approvedBefore.map(p => String(p.userId)));

  const toApprove = [];
  const handled = new Set(); // ek user ki ek hi base payment auto-approve (duplicate submission na ginti ho)
  for (const p of pending) {
    const uid = String(p.userId);
    const u = userMap[uid];
    if (!u) continue;

    if (RESUME_PLANS.includes(p.plan)) {
      if (u[p.plan]) toApprove.push(p._id);       // resume: wahi flag true hai to approved
      continue;
    }
    // Base plans (99/199/299/499/1000 + custom): koi bhi paid access mil chuka hai to approved
    if (!u.isPaid) continue;
    if (alreadyPaid.has(uid) || handled.has(uid)) continue;
    handled.add(uid);
    toApprove.push(p._id);
  }

  if (!toApprove.length) return 0;
  const r = await Payment.updateMany(
    { _id: { $in: toApprove }, status: 'pending' },
    { $set: { status: 'approved', reviewedAt: new Date() } }
  );
  return r.modifiedCount || 0;
}

module.exports = { syncPendingPayments };
