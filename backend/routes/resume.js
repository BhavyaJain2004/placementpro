const express = require('express');
const router  = express.Router();
const Resume  = require('../models/Resume');
const User    = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// User ke 3 boolean fields se effective plan nikalta hai (highest tier priority)
function getResumePlan(user) {
  if (user.resume150) return '150';
  if (user.resume99) return '99';
  if (user.resume49) return '49';
  return '';
}

// ── ATS scoring data ──
// Strong action verbs (past tense) — fresher resumes mein sabse common wale
const STRONG_VERBS = ['developed','built','designed','implemented','created','led','managed','engineered',
  'architected','optimized','optimised','automated','collaborated','achieved','increased','reduced','streamlined',
  'deployed','analyzed','analysed','spearheaded','launched','improved','delivered','integrated','configured',
  'debugged','tested','researched','organized','organised','coordinated','mentored','trained','presented',
  'performed','executed','established','initiated','resolved','maintained','enhanced','migrated',
  'authored','boosted','built','compiled','constructed','contributed','converted','customized','decreased',
  'defined','demonstrated','devised','directed','documented','drove','eliminated','expanded','extended',
  'facilitated','formulated','generated','handled','identified','influenced','instituted','introduced',
  'investigated','leveraged','modernized','modified','monitored','negotiated','operated','orchestrated',
  'oversaw','owned','pioneered','planned','produced','programmed','prototyped','published','rebuilt',
  'redesigned','refactored','refined','released','replaced','restructured','revamped','reviewed','scaled',
  'secured','simplified','solved','standardized','supported','simulated','validated','verified','won',
  'secured','shipped','trained','tuned','upgraded','utilized','wrote','fine-tuned','containerized','visualized',
  'applied','assembled','cleaned','crafted','curated','engaged','fabricated','mapped','measured','processed',
  'ranked','scripted','selected','structured','synthesized','transformed','engineered','achieved','earned','secured'];

const WEAK_PHRASES = ['responsible for', 'worked on', 'helped with', 'duties included', 'was involved in', 'in charge of',
  'assisted with', 'participated in', 'tried to', 'hard working', 'hardworking', 'team player', 'passionate about', 'familiar with'];

const FIRST_PERSON = /\b(i|my|me|myself)\b/i;

// Common tech keywords — skills section ki depth check karne ke liye
const TECH_KEYWORDS = ['java','python','c++','c','javascript','typescript','sql','html','css','react','angular','vue','node','nodejs','node.js',
  'express','spring','spring boot','django','flask','fastapi','mongodb','mysql','postgresql','postgres','oracle','redis','firebase',
  'git','github','docker','kubernetes','aws','azure','gcp','linux','postman','rest','rest api','api','graphql','dsa','oop','dbms',
  'os','operating systems','computer networks','machine learning','deep learning','tensorflow','pytorch','pandas','numpy','opencv',
  'android','kotlin','flutter','swift','tailwind','bootstrap','next.js','nextjs','jenkins','ci/cd','agile','scrum','jira','figma',
  'matlab','verilog','vhdl','embedded c','arduino','raspberry pi','iot','power bi','tableau','excel','selenium','junit','jest',
  'php','laravel','go','rust','c#','.net','dotnet','data structures','algorithms','microservices','system design','nlp','sklearn','scikit-learn'];

// Bullet mein number/result hai ya nahi (years ko ignore karte hain, version numbers ko bhi)
const METRIC_REGEX = /\d+(?:\.\d+)?\s*(?:%|x\b|\+|k\b|m\b|lakh|crore|ms\b|secs?\b|seconds?\b|hrs?\b|hours?\b|days?\b|weeks?\b|months?\b)|[₹$]\s*\d|\b\d{1,3}(?:,\d{3})+\b|\b\d+\s+(?:users?|students?|members?|projects?|bugs?|endpoints?|apis?|requests?|queries|features?|modules?|pages?|screens?|tests?|teams?|participants?|records?|customers?|clients?|services?|datasets?|models?|algorithms?|problems?|questions?|commits?|repositories|repos?)\b/i;

// "React.js", "ReactJS", "Node JS" jaise alag-alag likhne ke tareeke ek jaise match ho
const normSkill = t => (t || '').toLowerCase().replace(/[\s.\-]/g, '').replace(/js$/, '');
const TECH_SET = new Set(TECH_KEYWORDS.map(normSkill));

function hasMetric(text) {
  const cleaned = (text || '').replace(/\b(19|20)\d{2}\b/g, ''); // year (2024 etc.) ko number mat maano
  return METRIC_REGEX.test(cleaned);
}
function firstWordOf(text) {
  return (text || '').trim().replace(/^[\-•*▪●\d.\s)]+/, '').split(/\s+/)[0].toLowerCase().replace(/[^a-z\-]/g, '');
}
function wordCount(text) { return (text || '').trim().split(/\s+/).filter(Boolean).length; }

// ── Rule-based ATS score (0-100), transparent & free ──
// Ye "ATS readiness" score hai: resume ki parseability, structure aur bullet quality check karta hai.
// Kisi specific company ke ATS ya job description se match nahi karta (har company ka ATS alag hota hai).
function calculateATSScore(resume) {
  const checks = [];
  const add = (area, status, text) => checks.push({ area, status, text });
  const breakdown = { contact: 0, sections: 0, actionVerbs: 0, metrics: 0, length: 0 };

  // 1) Contact completeness — 15 pts
  let c = 0;
  const nameWords = (resume.name || '').trim().split(/\s+/).filter(Boolean).length;
  if (nameWords >= 2) { c += 3; add('Contact', 'pass', 'Full name is present'); }
  else if (nameWords === 1) { c += 1; add('Contact', 'warn', 'Use your full name (first and last name)'); }
  else add('Contact', 'fail', 'Name is missing');

  if (resume.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(resume.email.trim())) { c += 4; add('Contact', 'pass', 'Email looks valid'); }
  else add('Contact', 'fail', resume.email ? 'Email format looks wrong' : 'Email is missing');

  const phoneDigits = (resume.phone || '').replace(/[\s+\-()]/g, '');
  if (/^(91)?[6-9]\d{9}$/.test(phoneDigits)) { c += 4; add('Contact', 'pass', 'Phone number looks valid'); }
  else add('Contact', 'fail', resume.phone ? 'Phone number looks wrong (use a 10-digit Indian number)' : 'Phone number is missing');

  if (resume.linkedin && /linkedin\.com\/in\//i.test(resume.linkedin)) { c += 2; add('Contact', 'pass', 'LinkedIn profile link added'); }
  else add('Contact', 'warn', resume.linkedin ? 'LinkedIn link should look like linkedin.com/in/yourname' : 'Add your LinkedIn profile link');

  if (resume.github && /github\.com\/[^\s/]+/i.test(resume.github)) { c += 2; add('Contact', 'pass', 'GitHub profile link added'); }
  else add('Contact', 'warn', resume.github ? 'GitHub link should look like github.com/yourname' : 'Add your GitHub profile link');
  breakdown.contact = c;

  // 2) Important sections — 20 pts
  let s = 0;
  const edu = (resume.education || []).filter(e => e && (e.institution || e.degree));
  const eduMain = edu.find(e => e.institution && e.degree);
  if (eduMain) { s += 3; add('Sections', 'pass', 'Education has college and degree'); }
  else add('Sections', 'fail', edu.length ? 'Education needs both college name and degree' : 'Education section is empty');
  if (eduMain && (eduMain.startDate || eduMain.endDate)) s += 1;
  else if (eduMain) add('Sections', 'warn', 'Add start and end year in Education');
  if (edu.some(e => e.cgpa && String(e.cgpa).trim())) { s += 2; add('Sections', 'pass', 'CGPA is mentioned'); }
  else add('Sections', 'warn', 'Add your CGPA (many campus drives filter on it)');

  const projs = (resume.projects || []).filter(p => p && p.title && (p.bullets || []).some(Boolean));
  const exps = (resume.experience || []).filter(e => e && e.company && e.role && (e.bullets || []).some(Boolean));
  if (projs.length) { s += 4; add('Sections', 'pass', projs.length + ' project(s) with details'); }
  else add('Sections', 'fail', 'Add at least one project with bullet points');
  if (exps.length) { s += 3; add('Sections', 'pass', 'Experience / internship section is filled'); }
  else if (projs.length >= 2) { s += 2; add('Sections', 'pass', 'No experience, but 2+ projects cover it well for a fresher'); }
  else add('Sections', 'warn', 'Add an internship or a second project to show more hands-on work');

  const skillRows = (resume.skills || []).filter(x => x && x.items && x.items.trim());
  if (skillRows.length) s += 2;
  else add('Sections', 'fail', 'Skills section is empty');
  const allSkillText = skillRows.map(x => x.items).join(', ').toLowerCase();
  const skillTokens = allSkillText.replace(/[()]/g, ',').split(/[,;|/•&]+/).map(t => t.trim()).filter(Boolean);
  const recognised = new Set(skillTokens.map(normSkill).filter(t => TECH_SET.has(t)));
  if (recognised.size >= 3) s += 2;
  if (skillRows.length >= 2) s += 1;
  if (skillRows.length && skillRows.length < 2) add('Sections', 'warn', 'Group skills into categories (Languages, Tools, Databases...)');
  if (skillRows.length && recognised.size < 3) add('Sections', 'warn', 'List more standard technology names in Skills so ATS can match them');
  if (skillRows.length && recognised.size >= 3 && skillRows.length >= 2) add('Sections', 'pass', 'Skills are grouped and use standard keywords');

  if ((resume.achievements || []).some(a => a && a.title)) { s += 2; add('Sections', 'pass', 'Achievements / leadership included'); }
  else add('Sections', 'warn', 'Add achievements, certifications or leadership roles');
  breakdown.sections = Math.min(20, s);

  // Saare bullets (experience + projects + achievements)
  const allBullets = [];
  (resume.experience || []).forEach(e => (e.bullets || []).forEach(b => b && b.trim() && allBullets.push(b.trim())));
  (resume.projects || []).forEach(p => (p.bullets || []).forEach(b => b && b.trim() && allBullets.push(b.trim())));
  (resume.achievements || []).forEach(a => (a.bullets || []).forEach(b => b && b.trim() && allBullets.push(b.trim())));
  const total = allBullets.length;

  // 3) Action verbs — 30 pts (24 strong-verb ratio + 6 variety, minus penalties)
  let v = 0;
  if (total) {
    const firstWords = allBullets.map(firstWordOf);
    const strong = firstWords.filter(w => STRONG_VERBS.includes(w)).length;
    const uniqueStrong = new Set(firstWords.filter(w => STRONG_VERBS.includes(w))).size;
    const weak = allBullets.filter(b => WEAK_PHRASES.some(w => b.toLowerCase().includes(w))).length;
    const firstPerson = allBullets.filter(b => FIRST_PERSON.test(b)).length;

    v = Math.round((strong / total) * 24);
    v += strong ? Math.round(Math.min(1, (uniqueStrong / strong) / 0.85) * 6) : 0;
    v -= Math.min(8, weak * 2);
    v -= Math.min(6, firstPerson * 2);
    v = Math.max(0, Math.min(30, v));

    if (strong === total) add('Action Verbs', 'pass', 'Every bullet starts with a strong action verb');
    else add('Action Verbs', strong / total >= 0.6 ? 'warn' : 'fail', (total - strong) + ' of ' + total + ' bullets do not start with a strong action verb (Built, Developed, Implemented...)');
    if (strong > 2 && uniqueStrong / strong < 0.6) add('Action Verbs', 'warn', 'You repeat the same starting verb too often, vary it');
    if (weak) add('Action Verbs', 'warn', weak + ' bullet(s) use weak phrases like "worked on" or "responsible for"');
    if (firstPerson) add('Action Verbs', 'warn', firstPerson + ' bullet(s) use "I" or "my", remove first-person words');
  } else {
    add('Action Verbs', 'fail', 'No bullet points found, describe your projects and experience in bullets');
  }
  breakdown.actionVerbs = v;

  // 4) Quantified metrics — 25 pts (target: kam se kam aadhe bullets mein number)
  let m = 0;
  if (total) {
    const withMetric = allBullets.filter(hasMetric).length;
    m = Math.round(Math.min(1, (withMetric / total) / 0.5) * 25);
    if (withMetric / total >= 0.5) add('Metrics', 'pass', withMetric + ' of ' + total + ' bullets show measurable results');
    else add('Metrics', withMetric ? 'warn' : 'fail', 'Only ' + withMetric + ' of ' + total + ' bullets contain numbers, aim for at least half (users, %, time saved, records, endpoints)');
  } else {
    add('Metrics', 'fail', 'No bullets to measure results in');
  }
  breakdown.metrics = m;

  // 5) Content depth — 10 pts
  let d = 0;
  if (total >= 8) { d += 3; add('Content Depth', 'pass', total + ' bullet points in total'); }
  else if (total >= 5) { d += 2; add('Content Depth', 'warn', 'Only ' + total + ' bullets, aim for 8 or more'); }
  else if (total >= 3) { d += 1; add('Content Depth', 'warn', 'Only ' + total + ' bullets, aim for 8 or more'); }
  else add('Content Depth', 'fail', 'Too few bullet points to judge your work');

  if (total) {
    const goodLen = allBullets.filter(b => { const w = wordCount(b); return w >= 8 && w <= 28; }).length;
    const share = goodLen / total;
    if (share >= 0.7) { d += 3; add('Content Depth', 'pass', 'Bullets are a good length (8-28 words)'); }
    else if (share >= 0.4) { d += 1; add('Content Depth', 'warn', 'Some bullets are too short or too long, keep them 1-2 lines (8-28 words)'); }
    else add('Content Depth', 'fail', 'Most bullets are too short or too long, keep them 1-2 lines (8-28 words)');
  }
  if (projs.length >= 2 || (projs.length >= 1 && exps.length >= 1)) d += 2;
  if (recognised.size >= 8) d += 2; else if (recognised.size >= 5) d += 1;
  breakdown.length = Math.min(10, d);

  const score = Math.min(100, breakdown.contact + breakdown.sections + breakdown.actionVerbs + breakdown.metrics + breakdown.length);
  const verdict = score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : score >= 45 ? 'Needs work' : 'Weak';
  return { score, breakdown, checks, verdict };
}

// Bullet ke issues (AI suggestion aur fallback guidance dono ke liye)
function bulletIssues(text) {
  const issues = [];
  const fw = firstWordOf(text);
  if (!STRONG_VERBS.includes(fw)) issues.push('verb');
  if (WEAK_PHRASES.some(w => text.toLowerCase().includes(w))) issues.push('weak');
  if (FIRST_PERSON.test(text)) issues.push('person');
  if (!hasMetric(text)) issues.push('metric');
  const w = wordCount(text);
  if (w < 6) issues.push('short'); else if (w > 30) issues.push('long');
  return issues;
}

// AI available na ho ya fail ho jaye to bhi user ko seedhi guidance mile (naya text invent nahi karte)
function ruleSuggestion(b, issues) {
  const parts = [];
  if (issues.includes('verb') || issues.includes('weak')) parts.push('Start with a strong action verb such as Built, Developed or Implemented');
  if (issues.includes('person')) parts.push('Remove "I" / "my" and start directly with the action');
  if (issues.includes('metric')) parts.push('Add a real number: users, % improvement, time saved, records or endpoints [add your number here]');
  if (issues.includes('short')) parts.push('Add more detail: what you did, with which tools, and the result');
  if (issues.includes('long')) parts.push('Shorten it to 1-2 lines (about 25 words)');
  const issueText = issues.includes('metric') && issues.length === 1 ? 'Missing a measurable result' :
    issues.includes('verb') || issues.includes('weak') ? 'Weak or missing action verb' :
    issues.includes('person') ? 'Uses first-person words' : issues.includes('short') ? 'Too short' : issues.includes('long') ? 'Too long' : 'Can be stronger';
  return { section: b.section, original: b.text, issue: issueText, suggestion: parts.join('. ') + '.' };
}

// GET current user's resume
router.get('/', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    const user = await User.findById(req.user.id).select('resume49 resume99 resume150 resumeAnalysisUsed');
    res.json({ resume: resume || null, resumePlan: user ? getResumePlan(user) : '', analysisUsed: user?.resumeAnalysisUsed || false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SAVE / UPDATE resume content
router.post('/save', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('resume49 resume99 resume150');
    if (!getResumePlan(user || {})) return res.status(403).json({ message: 'Pehle koi resume plan activate karo' });

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
    const user = await User.findById(req.user.id).select('resume49 resume99 resume150 resumeAnalysisUsed');
    const plan = getResumePlan(user || {});
    if (!plan) return res.status(403).json({ message: 'Pehle koi resume plan activate karo' });
    if (plan === '49') return res.status(403).json({ message: 'Analysis ₹99 ya ₹150 plan mein hi milta hai' });
    if (plan === '99' && user.resumeAnalysisUsed)
      return res.status(403).json({ message: 'Aapka 1 analysis already use ho chuka hai. ₹150 plan mein unlimited milta hai.' });

    const resume = await Resume.findOne({ userId: req.user.id });
    if (!resume) return res.status(404).json({ message: 'Pehle resume save karo' });

    const { score, breakdown, checks, verdict } = calculateATSScore(resume);

    // Weak bullets (kisi bhi issue wale) — sabse zyada issues wale pehle, sirf inko AI ko bhejenge
    const allBullets = [];
    (resume.experience || []).forEach(e => (e.bullets || []).forEach(b => b && b.trim() && allBullets.push({ section: 'Experience', context: [e.role, e.company].filter(Boolean).join(' at '), text: b.trim() })));
    (resume.projects || []).forEach(p => (p.bullets || []).forEach(b => b && b.trim() && allBullets.push({ section: 'Projects', context: [p.title, p.techStack].filter(Boolean).join(' | '), text: b.trim() })));

    const weakBullets = allBullets
      .map(b => ({ ...b, issues: bulletIssues(b.text) }))
      .filter(b => b.issues.length)
      .sort((a, b) => b.issues.length - a.issues.length)
      .slice(0, 10); // max 10 bullets per analysis, cost/rate-limit control

    let suggestions = [];
    if (weakBullets.length && process.env.GROQ_API_KEY) {
      try {
        suggestions = await getAISuggestions(weakBullets);
      } catch (e) {
        console.log('Gemini error:', e.message);
      }
    }
    // AI na chale ya kuch bullets ke liye suggestion na aaye to rule-based guidance de do
    const covered = new Set(suggestions.map(s => (s.original || '').trim()));
    weakBullets.forEach(b => { if (!covered.has(b.text)) suggestions.push(ruleSuggestion(b, b.issues)); });

    // Checks ko breakdown ke andar hi store karte hain (purane UI ke liye extra key harmless hai)
    const storedBreakdown = { ...breakdown, checks, verdict };
    await Resume.findOneAndUpdate(
      { userId: req.user.id },
      { atsScore: score, atsBreakdown: storedBreakdown, suggestions, lastAnalyzedAt: new Date() }
    );

    if (plan === '99') {
      await User.findByIdAndUpdate(req.user.id, { resumeAnalysisUsed: true });
    }

    res.json({ score, breakdown: storedBreakdown, suggestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Groq API se contextual suggestions (free tier, fast Llama models)
async function getAISuggestions(bullets) {
  const prompt = `You are an expert resume reviewer helping a B.Tech fresher in India improve resume bullet points so they pass ATS (Applicant Tracking System) screening and impress recruiters.

Rules:
- Use simple, clear, professional English. No fancy vocabulary.
- NEVER invent numbers, percentages, tools, results or facts that are not in the original bullet or its context.
- If a bullet has no measurable result, keep the meaning and add a placeholder like "[add a number here, e.g. X users or X% faster]" instead of making one up.
- Start every improved bullet with a strong past-tense action verb (Built, Developed, Implemented, Designed, Optimized...). Replace weak phrases like "worked on", "responsible for", "helped with".
- Remove first-person words (I, my). Keep each improved bullet to one line (max 25 words).
- Keep all technology and tool names from the original exactly as written.
- If the original is already good except for one issue, change only that issue.

Each bullet is listed with its section and context (project or role). Review them:
${bullets.map((b, i) => `${i + 1}. [${b.section}${b.context ? ' — ' + b.context : ''}] "${b.text}"`).join('\n')}

Return ONLY a valid JSON array, no markdown, no extra text, one item per bullet in the same order, in this exact format:
[{"section": "...", "original": "exact original bullet text", "issue": "short issue description (max 8 words)", "suggestion": "improved bullet text"}]`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    })
  });

  const data = await response.json();
  let text = data?.choices?.[0]?.message?.content || '[]';
  text = text.replace(/```json|```/g, '').trim();

  // Kabhi kabhi model extra text ke saath JSON deta hai — array nikaal lete hain
  const match = text.match(/\[[\s\S]*\]/);
  if (match) text = match[0];

  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed)) return [];

  // Safety check: AI ne agar koi naya number invent kiya (bracket ke bahar) to wo suggestion hata do
  const numsOutsideBrackets = t => (String(t).replace(/\[[^\]]*\]/g, '').match(/\d+(?:\.\d+)?/g) || []);
  return parsed.filter(s => {
    if (!s || !s.original || !s.suggestion) return false;
    if (String(s.suggestion).trim() === String(s.original).trim()) return false;
    const orig = numsOutsideBrackets(s.original);
    return numsOutsideBrackets(s.suggestion).every(n => orig.includes(n));
  }).map(s => ({ section: s.section, original: s.original, issue: s.issue, suggestion: s.suggestion }));
}

module.exports = router;
