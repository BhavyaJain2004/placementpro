const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  domain:      String,
  type:        { type: String, enum: ['Product','Service','Startup'], default: 'Service' },
  package:     String,
  testType:    { type: String, enum: ['Aptitude','Coding','Both'] },
  testDetails: String,
  process: [{
    round:       String,
    description: String
  }],
  eligibility: String,
  tips:        String,
  dsaTopics:   [String],
  year:        Number
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);