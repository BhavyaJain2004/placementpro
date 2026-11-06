// Razorpay ONE-TIME payment (jaise VIT ka ₹299) — payment hote hi access apne aap activate.
// Kaun se colleges online pay karte hain: env RAZORPAY_COLLEGES (default 'vit', comma separated).
// Baaki colleges (KIIT, Bennett) ka manual UPI + approve wala flow bilkul waisa hi rahega.
const Razorpay = require('razorpay');
const Payment  = require('../models/Payment');
const User     = require('../models/User');

const onlineColleges = () => (process.env.RAZORPAY_COLLEGES || 'vit').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
const isOnline = (college) => onlineColleges().includes(String(college || '').toLowerCase());
const razorpay = () => new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

// Admin "Approve" route jaisa hi access (plan ke hisaab se)
function accessFor(plan) {
  const now = new Date();
  if (plan === '99')  return { isPaid: true, paidAt: now, selectedPlan: '99' };
  if (plan === '199') return { isPaid: true, paidAt: now, hasTestAccess: true, resume49: true, selectedPlan: '199' };
  if (plan === '299' || plan === '1000') return { isPaid: true, paidAt: now, hasTestAccess: true, masterDsaAccess: true, resume150: true, resumeAnalysisUsed: false, selectedPlan: '299' };
  if (plan === '499') return { isPaid: true, paidAt: now, hasTestAccess: true, masterDsaAccess: true, resume150: true, resumeAnalysisUsed: false, selectedPlan: '499' };
  return { isPaid: true, paidAt: now };
}

// Payment verify ho chuki — access do aur Payment record banao. Idempotent: verify route aur webhook
// dono chalein to bhi ek hi baar count hota hai (razorpayPaymentId unique).
async function fulfill({ userId, plan, college, paymentId, orderId, amountPaise }) {
  if (await Payment.findOne({ razorpayPaymentId: paymentId }).select('_id').lean()) return { already: true };

  // Pehle access, phir payment record — taaki "paid par access nahi" wali halat na bane
  const user = await User.findByIdAndUpdate(userId, accessFor(plan), { new: true });
  if (!user) throw new Error('User not found for this payment');

  try {
    await Payment.create({
      userId: user._id, name: user.name, email: user.email, plan,
      amountPaid: Math.round(amountPaise) / 100,
      transactionId: paymentId, razorpayPaymentId: paymentId, razorpayOrderId: orderId,
      method: 'razorpay', college: (college || user.college || '').toLowerCase(),
      status: 'approved', reviewedAt: new Date(), referredBy: user.referredBy || ''
    });
  } catch (e) {
    if (e && e.code === 11000) return { already: true };   // verify aur webhook ek saath aaye
    throw e;
  }
  return { already: false, user };
}

module.exports = { isOnline, razorpay, accessFor, fulfill };
