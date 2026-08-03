const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  template: { type: String, enum: ['modern', 'classic'], default: 'modern' },

  // ── Resume Content (structured, important sections) ──
  name: String, email: String, phone: String, linkedin: String, github: String, location: String,

  education: [{
    institution: String, degree: String, location: String,
    startDate: String, endDate: String, cgpa: String
  }],

  experience: [{
    company: String, role: String, location: String,
    startDate: String, endDate: String,
    bullets: [String]
  }],

  projects: [{
    title: String, techStack: String, link: String,
    bullets: [String]
  }],

  skills: [{
    category: String, // e.g. "Programming Languages"
    items: String     // e.g. "Java, Python, C, JavaScript"
  }],

  achievements: [{
    title: String, org: String, location: String,
    startDate: String, endDate: String,
    bullets: [String]
  }],

  // ── ATS Analysis ──
  atsScore:      { type: Number, default: null },
  atsBreakdown:  { type: mongoose.Schema.Types.Mixed, default: null }, // { contact:10, sections:20, verbs:20, metrics:25, length:15, keywords:10 }
  suggestions:   [{ section: String, original: String, issue: String, suggestion: String }],
  lastAnalyzedAt: Date

}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
