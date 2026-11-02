// Mail ka design + ready-made templates (Diwali, upgrade reminders, resume, comeback...)
const BASE = () => process.env.MAIL_ASSET_BASE || 'https://placementsphere.in';
const esc = (x) => String(x == null ? '' : x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fill = (str, name) => String(str || '').replace(/\{\{\s*name\s*\}\}/gi, name || 'there');
const firstName = (n) => String(n || '').trim().split(/\s+/)[0] || 'there';

const PRESETS = {
  custom: { label: 'Custom (khud likho)', subject: '', heading: '', body: '', ctaText: 'Open PlacementSphere', ctaUrl: 'https://placementsphere.in' },
  diwali: {
    label: 'Diwali wishes', subject: 'Happy Diwali from PlacementSphere 🪔',
    heading: 'Happy Diwali, {{name}}!',
    body: "Wishing you and your family a Diwali full of light, sweets and good news.\n\nMay this festive season bring you the offer letter you have been working towards. We're cheering for you all the way.\n\nTake a break, enjoy the celebrations, and come back stronger. Your prep will be right here.\n\nWith love,\nTeam PlacementSphere",
    ctaText: 'Continue your prep', ctaUrl: 'https://placementsphere.in'
  },
  upgrade_base: {
    label: 'Base users: upgrade reminder (price hike)', subject: 'Upgrade your plan before prices go up',
    heading: 'Ready for the next level, {{name}}?',
    body: "You already have the Base platform: company profiles, DSA questions and experiences.\n\nUpgrade to unlock more:\n• 50+ full-length mock tests that follow real company patterns\n• Master DSA sheet with structured topic-wise practice\n• AI resume builder with ATS score\n\nOur prices are going up soon. Upgrade now and lock in today's price.",
    ctaText: 'Upgrade my plan', ctaUrl: 'https://placementsphere.in'
  },
  upgrade_plus: {
    label: 'Plus (199) users: upgrade to Complete', subject: 'One step left: complete your prep',
    heading: 'You are almost there, {{name}}',
    body: "You have already unlocked mock tests with the Plus plan. Nice start!\n\nUpgrade to Complete to also get:\n• Master DSA sheet, topic by topic\n• AI resume analysis with unlimited ATS checks\n\nIf you are serious about product and top-tier companies, this is the one that fills the gaps.\n\nPrices are going up soon, so upgrade while today's price is live.",
    ctaText: 'Upgrade to Complete', ctaUrl: 'https://placementsphere.in'
  },
  resume: {
    label: 'Resume builder benefits', subject: 'Your resume decides the interview. Fix it in 10 minutes',
    heading: 'Is your resume ATS-ready, {{name}}?',
    body: "Most resumes get filtered by software before a human ever reads them.\n\nOur resume builder helps you:\n• Use clean, ATS-friendly templates\n• Get an ATS score out of 100\n• See bullet-by-bullet suggestions to add real impact\n• Download a polished PDF instantly\n\nBuild it once, apply everywhere.",
    ctaText: 'Build my resume', ctaUrl: 'https://placementsphere.in/resume-maker.html'
  },
  comeback: {
    label: 'Comeback (sarcastic): kholi nahi site', subject: 'Did you forget about us? 👀',
    heading: 'Hey {{name}}, remember us?',
    body: "We're not saying we're hurt, but your last visit was a while ago.\n\nMeanwhile:\n• Company profiles are waiting for you\n• The DSA questions are collecting dust\n• Your seniors' interview stories are still unread\n\nPlacements will not wait for anyone, but we will. Come back and pick up where you left off.",
    ctaText: 'Okay, I am back', ctaUrl: 'https://placementsphere.in'
  }
};

// Plain text -> HTML. Khali line = naya paragraph, "• " ya "- " = checklist
const BUL = /^\s*[•\-]\s+/;
function bodyToHtml(body) {
  const out = [];
  String(body || '').split(/\n{2,}/).forEach(block => {
    let text = [], items = [];
    const flushText = () => { if (text.length) { out.push(`<p style="margin:0 0 20px;color:#44445e;font-size:16px;line-height:1.75">${text.map(esc).join('<br>')}</p>`); text = []; } };
    const flushList = () => {
      if (!items.length) return;
      out.push('<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px">' + items.map(i =>
        `<tr><td style="padding:0 0 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f5ff;border:1px solid #e7e4ff;border-radius:12px"><tr>
          <td width="44" valign="top" style="padding:14px 0 14px 14px"><div style="width:22px;height:22px;line-height:22px;border-radius:11px;background:#7c6af7;color:#ffffff;text-align:center;font-size:13px;font-weight:700">&#10003;</div></td>
          <td style="padding:14px 16px 14px 6px;color:#2b2b45;font-size:15px;line-height:1.55">${esc(i)}</td></tr></table></td></tr>`).join('') + '</table>');
      items = [];
    };
    block.split('\n').forEach(l => {
      if (BUL.test(l)) { flushText(); items.push(l.replace(BUL, '')); }
      else if (l.trim()) { flushList(); text.push(l); }
    });
    flushText(); flushList();
  });
  return out.join('');
}

function renderEmail({ heading, body, ctaText, ctaUrl, name }) {
  const n = firstName(name);
  const h = fill(heading, n), b = fill(body, n);
  const safeUrl = /^https?:\/\//i.test(ctaUrl || '') ? ctaUrl : BASE();
  const banner = `${BASE()}/email/banner.png`;
  const pre = esc(b.replace(/\s+/g, ' ').slice(0, 110));
  const cta = ctaText ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:10px 0 8px"><tr><td style="border-radius:12px;background:#7c6af7;box-shadow:0 8px 20px rgba(124,106,247,0.35)"><a href="${esc(safeUrl)}" style="display:inline-block;padding:16px 34px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;font-family:Arial,Helvetica,sans-serif">${esc(fill(ctaText, n))} &rarr;</a></td></tr></table>` : '';
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(h)}</title></head>
<body style="margin:0;padding:0;background:#eeeef6;font-family:Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#eeeef6">${pre}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eeeef6"><tr><td align="center" style="padding:28px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:22px;overflow:hidden;box-shadow:0 12px 40px rgba(20,20,60,0.10)">
    <tr><td style="background:#0b0b16"><img src="${banner}" width="600" alt="PlacementSphere" style="display:block;width:100%;max-width:600px;height:auto;border:0"></td></tr>
    <tr><td style="height:4px;background:linear-gradient(90deg,#7c6af7,#06b6d4);font-size:0;line-height:0">&nbsp;</td></tr>
    <tr><td style="padding:42px 38px 34px">
      <h1 style="margin:0 0 22px;font-size:28px;line-height:1.25;color:#14142b;font-family:Arial,Helvetica,sans-serif;letter-spacing:-0.3px">${esc(h)}</h1>
      ${bodyToHtml(b)}
      ${cta}
      <p style="margin:26px 0 0;color:#7a7a94;font-size:14px;line-height:1.6">Team PlacementSphere</p>
    </td></tr>
    <tr><td style="padding:24px 38px 30px;background:#fafafe;border-top:1px solid #ececf6;color:#8a8aa3;font-size:12px;line-height:1.7">
      <b style="color:#44445e">PlacementSphere</b> &middot; Placement prep built by placed seniors<br>
      <a href="${BASE()}" style="color:#7c6af7;text-decoration:none">placementsphere.in</a><br>
      You are receiving this because you have an account on PlacementSphere. Have a question? Just reply to this email.
    </td></tr>
  </table>
</td></tr></table></body></html>`;
  const text = `${h}\n\n${b}\n\n${ctaText ? fill(ctaText, n) + ': ' + safeUrl + '\n\n' : ''}Team PlacementSphere\n${BASE()}`;
  return { html, text };
}

module.exports = { PRESETS, renderEmail, fill, firstName };
