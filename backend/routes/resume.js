const express = require('express');
const router  = express.Router();
const Resume  = require('../models/Resume');
const User    = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const STRONG_VERBS = ['developed','built','designed','implemented','created','led','managed','engineered',
  'architected','optimized','automated','collaborated','achieved','increased','reduced','streamlined',
  'deployed','analyzed','spearheaded','launched','improved','delivered','integrated','configured',
  'debugged','tested','researched','organized','coordinated','mentored','trained','presented',
  'performed','executed','established','initiated','resolved','maintained','enhanced','migrated'];

const WEAK_PHRASES = ['responsible for', 'worked on', 'helped with', 'duties included', 'was involved in', 'in charge of'];

// ── Rule-based ATS score (0-100), transparent & free ──
function calculateATSScore(resume) {
  let score = 0;
  const breakdown = { contact: 0, sections: 0, actionVerbs: 0, metrics: 0, length: 0 };

  // 1) Contact completeness — 15 pts
  let contactPts = 0;
  if (resume.email) contactPts += 4;
  if (resume.phone) contactPts += 4;
  if (resume.linkedin) contactPts += 4;
  if (resume.github) contactPts += 3;
  breakdown.contact = contactPts;
  score += contactPts;

  // 2) Important sections present — 20 pts
  let sectionPts = 0;
  if (resume.education && resume.education.length) sectionPts += 5;
  if ((resume.experience && resume.experience.length) || (resume.projects && resume.projects.length)) sectionPts += 8;
  if (resume.skills && resume.skills.length) sectionPts += 7;
  breakdown.sections = sectionPts;
  score += sectionPts;

  // Collect all bullets across sections
  const allBullets = [];
  (resume.experience || []).forEach(e => (e.bullets || []).forEach(b => b && allBullets.push(b)));
  (resume.projects || []).forEach(p => (p.bullets || []).forEach(b => b && allBullets.push(b)));
  (resume.achievements || []).forEach(a => (a.bullets || []).forEach(b => b && allBullets.push(b)));

  // 3) Action verbs — 30 pts
  let verbPts = 0;
  if (allBullets.length) {
    const strongCount = allBullets.filter(b => {
      const firstWord = b.trim().split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
      return STRONG_VERBS.includes(firstWord);
    }).length;
    const weakCount = allBullets.filter(b => WEAK_PHRASES.some(w => b.toLowerCase().includes(w))).length;
    verbPts = Math.round((strongCount / allBullets.length) * 30) - (weakCount * 3);
    verbPts = Math.max(0, Math.min(30, verbPts));
  }
  breakdown.actionVerbs = verbPts;
  score += verbPts;

  // 4) Quantified metrics — 25 pts
  let metricPts = 0;
  if (allBullets.length) {
    const metricRegex = /\d+(\.\d+)?\s*(%|x|\+|k|K|lakh|crore)|₹\s*\d|\$\s*\d|\d+\s*(users|students|members|hours|days|projects|bugs|endpoints|participants)/i;
    const withMetric = allBullets.filter(b => metricRegex.test(b)).length;
    metricPts = Math.round((withMetric / allBullets.length) * 25);
  }
  breakdown.metrics = metricPts;
  score += metricPts;

  // 5) Content length/completeness — 10 pts
  let lengthPts = 0;
  if (allBullets.length >= 6) lengthPts += 5;
  if (resume.projects && resume.projects.length >= 1) lengthPts += 5;
  breakdown.length = lengthPts;
  score += lengthPts;

  return { score: Math.min(100, score), breakdown };
}

// GET current user's resume
router.get('/', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    const user = await User.findById(req.user.id).select('resumePlan resumeAnalysisUsed');
    res.json({ resume: resume || null, resumePlan: user?.resumePlan || '', analysisUsed: user?.resumeAnalysisUsed || false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SAVE / UPDATE resume content
router.post('/save', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('resumePlan');
    if (!user?.resumePlan) return res.status(403).json({ message: 'Pehle koi resume plan activate karo' });

    const data = req.body;
    const resume = await Resume.findOneAndUpdate(
      { userId: req.user.id },
      { ...data, userId: req.user.id },
      { new: true, upsert: true }
    );
    res.json({ message: 'Saved!', resume });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ANALYZE — rule-based score + AI (Gemini, free) suggestions
router.post('/analyze', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('resumePlan resumeAnalysisUsed');
    if (!user?.resumePlan) return res.status(403).json({ message: 'Pehle koi resume plan activate karo' });
    if (user.resumePlan === '49') return res.status(403).json({ message: 'Analysis ₹99 ya ₹150 plan mein hi milta hai' });
    if (user.resumePlan === '99' && user.resumeAnalysisUsed)
      return res.status(403).json({ message: 'Aapka 1 analysis already use ho chuka hai. ₹150 plan mein unlimited milta hai.' });

    const resume = await Resume.findOne({ userId: req.user.id });
    if (!resume) return res.status(404).json({ message: 'Pehle resume save karo' });

    const { score, breakdown } = calculateATSScore(resume);

    // Bullets jo weak hain (missing metric ya weak verb) — sirf inko AI ko bhejenge
    const allBullets = [];
    (resume.experience || []).forEach(e => (e.bullets || []).forEach(b => b && allBullets.push({ section: 'Experience', text: b })));
    (resume.projects || []).forEach(p => (p.bullets || []).forEach(b => b && allBullets.push({ section: 'Projects', text: b })));

    const metricRegex = /\d+(\.\d+)?\s*(%|x|\+|k|K|lakh|crore)|₹\s*\d|\$\s*\d|\d+\s*(users|students|members|hours|days|projects|bugs|endpoints|participants)/i;
    const weakBullets = allBullets.filter(b => {
      const firstWord = b.text.trim().split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
      const hasWeakVerb = !STRONG_VERBS.includes(firstWord);
      const hasWeakPhrase = WEAK_PHRASES.some(w => b.text.toLowerCase().includes(w));
      const missingMetric = !metricRegex.test(b.text);
      return hasWeakVerb || hasWeakPhrase || missingMetric;
    }).slice(0, 10); // max 10 bullets per analysis, cost/rate-limit control

    let suggestions = [];
    if (weakBullets.length && process.env.GROQ_API_KEY) {
      try {
        suggestions = await getAISuggestions(weakBullets);
      } catch (e) {
        console.log('Gemini error:', e.message);
      }
    }

    await Resume.findOneAndUpdate(
      { userId: req.user.id },
      { atsScore: score, atsBreakdown: breakdown, suggestions, lastAnalyzedAt: new Date() }
    );

    if (user.resumePlan === '99') {
      await User.findByIdAndUpdate(req.user.id, { resumeAnalysisUsed: true });
    }

    res.json({ score, breakdown, suggestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Groq API se contextual suggestions (free tier, fast Llama models)
async function getAISuggestions(bullets) {
  const prompt = `You are helping a B.Tech Computer Science fresher improve their resume bullet points to pass ATS (Applicant Tracking System) screening.

Rules:
- Use simple, clear, professional English — NOT fancy or complex vocabulary. This is for a fresher's resume.
- NEVER invent fake numbers, percentages, or metrics that weren't in the original bullet.
- If a bullet is missing a measurable result, suggest HOW to phrase it with a placeholder like "[add a number here, e.g. X% or X users]" instead of making one up.
- If the bullet uses a weak verb or phrase (like "worked on", "responsible for"), suggest a stronger specific action verb that fits the same context.
- Keep the core meaning and technology/tools mentioned in the original bullet unchanged.

Bullets to review:
${bullets.map((b, i) => `${i+1}. [${b.section}] "${b.text}"`).join('\n')}

Return ONLY a valid JSON array, no markdown, no extra text, in this exact format:
[{"section": "...", "original": "...", "issue": "short issue description", "suggestion": "improved bullet text"}]`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4
    })
  });

  const data = await response.json();
  let text = data?.choices?.[0]?.message?.content || '[]';
  text = text.replace(/```json|```/g, '').trim();

  // Kabhi kabhi model extra text ke saath JSON deta hai — array nikaal lete hain
  const match = text.match(/\[[\s\S]*\]/);
  if (match) text = match[0];

  return JSON.parse(text);
}

module.exports = router;
