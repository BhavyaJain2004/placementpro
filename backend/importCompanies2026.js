require('dotenv').config();
const mongoose    = require('mongoose');
const fs          = require('fs');
const path        = require('path');
const Company2026 = require('./models/Company2026');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const dataPath = path.join(__dirname, 'data', 'companies2026.json');
  const companies = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  await Company2026.deleteMany({}); // purana data clear, fresh import
  await Company2026.insertMany(companies);

  console.log(`Done! ${companies.length} companies imported.`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
