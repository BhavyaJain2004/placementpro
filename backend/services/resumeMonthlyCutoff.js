// backend/services/resumeMonthlyCutoff.js
// Mahine ke pehle din chalta hai — jin users ko resume49/99/150 access
// MANUALLY diya gaya tha (koi ResumeSubscription record nahi hai unka,
// matlab naya subscriber nahi hai), unka access band kar deta hai.
// Naye Razorpay subscribers isse bilkul untouched rehte hain — unka apna
// cycle khud chalta hai, webhook se control hota hai.

const User = require('../models/User');
const ResumeSubscription = require('../models/ResumeSubscription');

async function cutoffOldManualResumeUsers() {
  const oldUsers = await User.find({
    $or: [{ resume49: true }, { resume99: true }, { resume150: true }]
  }).select('resume49 resume99 resume150').lean();

  const subscribedUserIds = new Set(
    (await ResumeSubscription.find({ status: 'active' }).select('userId').lean())
      .map(s => String(s.userId))
  );

  let cutoffCount = 0;
  for (const u of oldUsers) {
    if (subscribedUserIds.has(String(u._id))) continue; // naya subscriber hai, chhodo
    await User.updateOne(
      { _id: u._id },
      { $set: { resume49: false, resume99: false, resume150: false } }
    );
    cutoffCount++;
  }

  console.log(`📋 Resume monthly cutoff: ${cutoffCount} purane manual users ka access band kiya`);
  return cutoffCount;
}

module.exports = { cutoffOldManualResumeUsers };
