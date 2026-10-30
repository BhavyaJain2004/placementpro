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

// Plain text paragraphs -> HTML (blank line = naya paragraph, "• " = bullet)
function bodyToHtml(body) {
  return String(body || '').split(/\n{2,}/).map(block => {
    const lines = block.split('\n');
    const items = lines.filter(l => /^\s*[•\-]\s+/.test(l));
    if (items.length && items.length === lines.filter(l => l.trim()).length) {
      return '<ul style="margin:0 0 18px;padding-left:20px;color:#3b3b52;font-size:15px;line-height:1.7">' + items.map(l => `<li style="margin-bottom:6px">${esc(l.replace(/^\s*[•\-]\s+/, ''))}</li>`).join('') + '</ul>';
    }
    // intro line + bullets mix
    const out = []; let list = [];
    const flush = () => { if (list.length) { out.push('<ul style="margin:0 0 18px;padding-left:20px;color:#3b3b52;font-size:15px;line-height:1.7">' + list.map(i => `<li style="margin-bottom:6px">${esc(i)}</li>`).join('') + '</ul>'); list = []; } };
    let text = [];
    const flushText = () => { if (text.length) { out.push(`<p style="margin:0 0 18px;color:#3b3b52;font-size:15px;line-height:1.7">${text.map(esc).join('<br>')}</p>`); text = []; } };
    lines.forEach(l => {
      if (/^\s*[•\-]\s+/.test(l)) { flushText(); list.push(l.replace(/^\s*[•\-]\s+/, '')); }
      else if (l.trim()) { flush(); text.push(l); }
    });
    flushText(); flush();
    return out.join('');
  }).join('');
}

function renderEmail({ heading, body, ctaText, ctaUrl, name, unsubscribeUrl }) {
  const n = firstName(name);
  const h = fill(heading, n), b = fill(body, n);
  const safeUrl = /^https?:\/\//i.test(ctaUrl || '') ? ctaUrl : BASE();
  const banner = `${BASE()}/email/banner.png`;
  const cta = ctaText ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 6px"><tr><td style="border-radius:10px;background:#7c6af7"><a href="${esc(safeUrl)}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;font-family:Arial,Helvetica,sans-serif">${esc(fill(ctaText, n))}</a></td></tr></table>` : '';
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(h)}</title></head>
<body style="margin:0;padding:0;background:#f1f1f7;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f1f7"><tr><td align="center" style="padding:24px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden">
    <tr><td style="background:#0b0b16"><img src="${banner}" width="600" alt="PlacementSphere" style="display:block;width:100%;max-width:600px;height:auto;border:0"></td></tr>
    <tr><td style="padding:34px 32px 26px">
      <h1 style="margin:0 0 18px;font-size:24px;line-height:1.3;color:#14142b;font-family:Arial,Helvetica,sans-serif">${esc(h)}</h1>
      ${bodyToHtml(b)}
      ${cta}
    </td></tr>
    <tr><td style="padding:20px 32px 28px;border-top:1px solid #ececf4;color:#8a8aa3;font-size:12px;line-height:1.6">
      You are receiving this because you have an account on PlacementSphere.<br>
      Have a question? Just reply to this email.
    </td></tr>
  </table>
</td></tr></table></body></html>`;
  const text = `${h}\n\n${b}\n\n${ctaText ? fill(ctaText, n) + ': ' + safeUrl + '\n\n' : ''}Reply to this email if you have any questions.`;
  return { html, text };
}

module.exports = { PRESETS, renderEmail, fill, firstName };
