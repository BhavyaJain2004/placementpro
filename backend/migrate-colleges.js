// Run once: node migrate-colleges.js
// Existing sab Users/Companies/Packages ko college: "kiit" set karta hai (jinke paas
// already field nahi hai), aur KIIT ko ek active college ke roop mein DB mein daal deta hai.
// SAFE: kisi bhi document ko delete ya overwrite nahi karta, sirf missing field fill karta hai.
require('dotenv').config();
const mongoose = require('mongoose');
const College  = require('./models/College');
const User     = require('./models/User');
const Company  = require('./models/Company');
const Package  = require('./models/Package');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected');

  await College.findOneAndUpdate(
    { slug: 'kiit' },
    { slug: 'kiit', name: 'KIIT University', location: 'Bhubaneswar, Odisha', status: 'active', order: 1 },
    { upsert: true }
  );
  console.log('✅ KIIT college entry ensured');

  const u = await User.updateMany({ college: { $exists: false } }, { college: 'kiit' });
  console.log(`✅ Users updated: ${u.modifiedCount}`);

  const c = await Company.updateMany({ college: { $exists: false } }, { college: 'kiit' });
  console.log(`✅ Companies updated: ${c.modifiedCount}`);

  const p = await Package.updateMany({ college: { $exists: false } }, { college: 'kiit' });
  console.log(`✅ Packages updated: ${p.modifiedCount}`);

  console.log('🎉 Migration done — koi purana data delete/overwrite nahi hua, sirf missing college field fill hui');
  process.exit(0);
})().catch(err => { console.error('❌ Migration error:', err); process.exit(1); });
