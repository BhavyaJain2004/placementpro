const router = require('express').Router();
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
const College = require('../models/College');
const MailCampaign = require('../models/MailCampaign');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { PRESETS, renderEmail } = require('../services/mailTemplates');
const svc = require('../services/mailCampaign');
const guard = [verifyToken, verifyAdmin];

const pickFields = (b) => ({ subject: String(b.subject || '').trim(), heading: String(b.heading || '').trim(), body: String(b.body || '').trim(), ctaText: String(b.ctaText || '').trim(), ctaUrl: String(b.ctaUrl || '').trim() });

// Admin panel ke dropdowns + aaj ka quota
router.get('/meta', ...guard, async (req, res) => {
  try {
    const colleges = await College.find({ status: 'active' }).select('slug name').lean().catch(() => []);
    res.json({
      presets: PRESETS, segments: svc.SEGMENTS, colleges,
      quota: { limit: svc.DAILY_LIMIT(), used: await svc.usedToday() },
      senderReady: !/resend\.dev/i.test(process.env.MAIL_FROM || process.env.RESEND_FROM || 'onboarding@resend.dev')
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/audience', ...guard, async (req, res) => {
  try {
    const users = await svc.audience(req.body.segment, req.body.college);
    res.json({ count: users.length, sample: users.slice(0, 5).map(u => ({ name: u.name, email: u.email })) });
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.post('/preview', ...guard, async (req, res) => {
  const m = svc.render(pickFields(req.body), 'Aarav', null);
  res.json({ html: m.html, subject: m.subject });
});

router.post('/test', ...guard, async (req, res) => {
  try {
    const to = String(req.body.to || '').trim();
    if (!/^\S+@\S+\.\S+$/.test(to)) return res.status(400).json({ message: 'Valid email daalo' });
    const m = svc.render(pickFields(req.body), req.body.name || 'Aarav', null);
    await svc.sendOne({ to, subject: '[TEST] ' + m.subject, html: m.html, text: m.text });
    res.json({ message: 'Test mail bhej di: ' + to });
  } catch (e) { res.status(400).json({ message: e.response?.data?.message || e.message }); }
});

router.post('/send', ...guard, async (req, res) => {
  try {
    const f = pickFields(req.body);
    if (!f.subject || !f.heading || !f.body) return res.status(400).json({ message: 'Subject, heading aur body zaroori hain' });
    const c = await svc.createCampaign(f, req.body.segment, req.body.college, req.body.setSize);
    res.json({ message: `Campaign shuru: ${c.total} users`, id: c._id, total: c.total });
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.get('/campaigns', ...guard, async (req, res) => {
  const list = await MailCampaign.find().select('-recipients').sort({ createdAt: -1 }).limit(30).lean();
  res.json({ campaigns: list, quota: { limit: svc.DAILY_LIMIT(), used: await svc.usedToday() } });
});

router.post('/campaigns/:id/next-set', ...guard, async (req, res) => {
  try { const c = await svc.nextSet(req.params.id); res.json({ message: 'Agla set bhejna shuru' }); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

router.post('/campaigns/:id/cancel', ...guard, async (req, res) => {
  await MailCampaign.updateOne({ _id: req.params.id, status: { $in: ['queued', 'sending', 'paused', 'waiting'] } }, { status: 'cancelled', note: 'Admin ne cancel kiya' });
  res.json({ message: 'Cancelled' });
});

// ── Public unsubscribe (mail ka link + one-click header) ──
async function unsub(req, res) {
  try {
    const d = jwt.verify(String(req.query.t || ''), process.env.JWT_SECRET + ':unsub');
    if (d.p !== 'unsub') throw new Error('bad');
    await User.updateOne({ _id: d.uid }, { $set: { mailOptOut: true } });
    res.send('<!DOCTYPE html><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:Arial;background:#0b0b16;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center"><div><h2>You are unsubscribed</h2><p style="color:#9a9ab8">You will no longer get promotional emails from PlacementSphere.</p></div></body>');
  } catch (e) { res.status(400).send('Invalid or expired link'); }
}
router.get('/unsubscribe', unsub);
router.post('/unsubscribe', unsub);

module.exports = router;
