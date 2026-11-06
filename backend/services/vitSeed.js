// VIT ko platform pe add karta hai: college, ₹299 package aur companies.
// Idempotent hai (dobara chalane par duplicate nahi banta, tumhare panel ke edits overwrite nahi hote).
// Railway mein SEED_VIT=true set karo, ek baar deploy hone do, phir variable hata dena.
const College = require('../models/College');
const Package = require('../models/Package');
const Company = require('../models/Company');
const companies = require('../data/vitCompanies.json');

async function seedVit() {
  await College.updateOne({ slug: 'vit' }, { $setOnInsert: {
    slug: 'vit', name: 'VIT (Vellore Institute of Technology)', location: 'Vellore, Tamil Nadu', status: 'active', order: 10
  } }, { upsert: true });

  await Package.updateOne({ college: 'vit', key: '299' }, { $setOnInsert: {
    college: 'vit', key: '299', name: 'Complete', tagline: 'VIT Complete Access', badge: '', price: 299, originalPrice: 0,
    features: [
      { text: 'VIT company profiles with hiring process', included: true },
      { text: '500+ DSA questions, company-wise', included: true },
      { text: 'Master DSA sheet', included: true },
      { text: '50+ full-length mock tests', included: true },
      { text: 'AI resume builder with ATS score', included: true },
      { text: 'Lifetime access, one-time payment', included: true }
    ],
    accentColor: '#7c6af7', highlighted: true, isActive: true, order: 1
  } }, { upsert: true });

  let added = 0;
  for (const c of companies) {
    const r = await Company.updateOne({ college: 'vit', name: c.name }, { $setOnInsert: { ...c, college: 'vit' } }, { upsert: true });
    if (r.upsertedCount) added++;
  }
  console.log(`🎓 VIT seed done — ${added} new companies (total in file: ${companies.length})`);
}

module.exports = { seedVit };
