// Admin panel se mail campaigns: audience (segments + college), queue, daily limit, unsubscribe.
const axios = require('axios');
const jwt   = require('jsonwebtoken');
const User     = require('../models/User');
const Activity = require('../models/Activity');
const MailCampaign = require('../models/MailCampaign');
const { MailDaily } = MailCampaign;
const { renderEmail, fill, firstName } = require('./mailTemplates');

const SEGMENTS = {
  all:       'Sab users',
  unpaid:    'Signup kiya par payment nahi ki',
  paid_all:  'Sab paid users',
  base_only: 'Sirf Base (99) wale — upgrade reminder',
  plus_only: 'Sirf Plus (199) wale — Complete upgrade',
  complete:  'Complete (299/499) wale — Master DSA access',
  no_resume: 'Paid users jinhone resume plan nahi liya',
  inactive:  'Jinhone site nahi kholi (7+ din)'
};

const DAILY_LIMIT = () => parseInt(process.env.MAIL_DAILY_LIMIT || '90', 10); // Resend free = 100/din, 1 report ke liye chhodi
const istDay = () => new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
const API_BASE = () => process.env.API_BASE_URL || 'https://api.placementsphere.in';
const fromAddress = () => process.env.MAIL_FROM || process.env.RESEND_FROM || 'PlacementSphere <onboarding@resend.dev>';

async function usedToday() {
  const d = await MailDaily.findOne({ day: istDay() }).lean();
  return d ? d.count : 0;
}

async function audience(segment, college, inactiveDays = 7) {
  if (!SEGMENTS[segment]) throw new Error('Invalid audience');
  const q = { mailOptOut: { $ne: true }, isAdmin: { $ne: true }, email: { $exists: true, $ne: '' } };
  if (college && college !== 'all') q.college = college;
  if (segment === 'unpaid')    q.isPaid = { $ne: true };
  if (segment === 'paid_all')  q.isPaid = true;
  if (segment === 'base_only') Object.assign(q, { isPaid: true, hasTestAccess: { $ne: true }, masterDsaAccess: { $ne: true } });
  if (segment === 'complete')  q.masterDsaAccess = true;
  if (segment === 'plus_only') Object.assign(q, { hasTestAccess: true, masterDsaAccess: { $ne: true } });
  if (segment === 'no_resume') Object.assign(q, { isPaid: true, resume49: { $ne: true }, resume99: { $ne: true }, resume150: { $ne: true } });
  if (segment === 'inactive') {
    const since = new Date(Date.now() - inactiveDays * 24 * 3600 * 1000);
    q._id = { $nin: await Activity.distinct('userId', { createdAt: { $gte: since } }) };
  }
  return User.find(q).select('name email').lean();
}

const unsubToken = (uid) => jwt.sign({ uid: String(uid), p: 'unsub' }, process.env.JWT_SECRET + ':unsub');
const unsubUrl = (uid) => `${API_BASE()}/api/mail/unsubscribe?t=${unsubToken(uid)}`;

async function sendOne({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY env var missing');
  // Unsubscribe link nahi hai — replies seedha tumhare inbox mein aate hain
  const payload = { from: fromAddress(), to: [to], subject, html, text, reply_to: process.env.MAIL_REPLY_TO || 'admin@placementsphere.in' };
  const r = await axios.post('https://api.resend.com/emails', payload, {
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` }, timeout: 15000
  });
  return r.data;
}

function render(c, name) {
  const { html, text } = renderEmail({ heading: c.heading, body: c.body, ctaText: c.ctaText, ctaUrl: c.ctaUrl, name });
  return { html, text, subject: fill(c.subject, firstName(name)) };
}

async function createCampaign(fields, segment, college, setSize) {
  if (/resend\.dev/i.test(fromAddress()))
    throw new Error('Campaign ke liye RESEND_FROM mein apne verified domain ka address chahiye (jaise PlacementSphere <hello@placementsphere.in>). onboarding@resend.dev sirf tumhare apne email pe bhejta hai.');
  const users = await audience(segment, college);
  if (!users.length) throw new Error('Is audience mein koi user nahi hai');
  setSize = Math.max(0, parseInt(setSize, 10) || 0);
  const c = await MailCampaign.create({
    setSize, releaseCount: setSize > 0 ? Math.min(setSize, users.length) : users.length,
    subject: fields.subject, heading: fields.heading, body: fields.body, ctaText: fields.ctaText, ctaUrl: fields.ctaUrl,
    segment, college: college || 'all', total: users.length,
    recipients: users.map(u => ({ userId: u._id, email: u.email, name: u.name, status: 'pending' }))
  });
  setImmediate(() => processMailQueue().catch(e => console.error('mail queue:', e.message)));
  return c;
}

let running = false;
// Cron har 2 minute chalata hai. Daily limit khatam to campaign 'paused' ho jata hai aur agle din apne aap aage chalta hai.
async function processMailQueue() {
  if (running) return;
  running = true;
  try {
    const campaigns = await MailCampaign.find({ status: { $in: ['queued', 'sending', 'paused'] } }).sort({ createdAt: 1 });
    for (const c of campaigns) {
      let remaining = DAILY_LIMIT() - await usedToday();
      if (remaining <= 0) { if (c.status !== 'paused') { c.status = 'paused'; c.note = 'Daily limit poori — kal apne aap aage chalega'; await c.save(); } break; }
      c.status = 'sending'; c.note = ''; await c.save();

      let n = 0;
      for (const r of c.recipients) {
        if (r.status !== 'pending') continue;
        if (c.sent + c.failed >= c.releaseCount) break; // is set ke users ho gaye
        if (remaining <= 0) break;
        // cancel check (har 10 ke baad)
        if (n && n % 10 === 0) { const fresh = await MailCampaign.findById(c._id).select('status').lean(); if (fresh.status === 'cancelled') break; }
        try {
          const m = render(c, r.name);
          await sendOne({ to: r.email, subject: m.subject, html: m.html, text: m.text });
          r.status = 'sent'; c.sent++;
        } catch (e) {
          r.status = 'failed'; r.error = String(e.response?.data?.message || e.message).slice(0, 160); c.failed++;
        }
        remaining--; n++;
        await MailDaily.updateOne({ day: istDay() }, { $inc: { count: 1 } }, { upsert: true });
        if (n % 10 === 0) { c.markModified('recipients'); await c.save(); }
        await new Promise(res => setTimeout(res, 220)); // Resend rate limit (10 req/sec) se bahut neeche
      }
      const fresh = await MailCampaign.findById(c._id).select('status').lean();
      if (fresh.status === 'cancelled') { await MailCampaign.updateOne({ _id: c._id }, { sent: c.sent, failed: c.failed, recipients: c.recipients }); continue; }
      const pending = c.recipients.some(r => r.status === 'pending');
      const setDone = (c.sent + c.failed) >= c.releaseCount;
      if (pending && setDone) { c.status = 'waiting'; c.note = 'Set poora bhej diya. Agla set table se "Send next set" dabake bhejo'; }
      else { c.status = pending ? 'paused' : 'done'; c.note = pending ? 'Daily limit poori — kal apne aap aage chalega' : ''; }
      if (!pending) c.finishedAt = new Date();
      c.markModified('recipients'); await c.save();
      if (pending && !setDone) break;
    }
  } finally { running = false; }
}

// Agla set release karo (admin button)
async function nextSet(id) {
  const c = await MailCampaign.findById(id);
  if (!c || c.status !== 'waiting') throw new Error('Is campaign ka agla set abhi ready nahi hai');
  c.releaseCount = Math.min(c.total, c.releaseCount + (c.setSize || c.total));
  c.status = 'queued'; c.note = '';
  await c.save();
  setImmediate(() => processMailQueue().catch(e => console.error('mail queue:', e.message)));
  return c;
}

module.exports = { nextSet, SEGMENTS, audience, render, sendOne, createCampaign, processMailQueue, usedToday, DAILY_LIMIT, unsubToken };
