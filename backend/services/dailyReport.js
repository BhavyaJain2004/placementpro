// backend/services/dailyReport.js
//
// Har roj raat 8 baje ka automatic report — kitne naye signups hue, kitni
// payments collect hui, aur total revenue — ek professional PDF banake admin
// ko email karta hai. Window hamesha "pichle 8 baje se abhi ke 8 baje tak"
// (24 ghante rolling), isliye agar koi raat 8:01 baje aaya toh woh agle din
// ke report mein aayega.
//
// Payments: payment ka time = jab user ne form submit kiya (createdAt) — approve kab hua isse
// farak nahi padta. Sirf APPROVED payments dikhte hain. Window "pichle 8 baje se abhi ke 8 baje tak".
// Agar koi payment pichle report ke baad approve hui par form usse pehle submit hua tha, to wo
// "Earlier payments approved later" mein apni purani date ke saath aati hai. Har payment sirf
// ek hi baar ginti hai (Payment.reportedAt se). Report se pehle paymentSync chalta hai, taaki
// DB se manually activate kiye users ki payment bhi approved ho jaye (admin panel kholna zaroori nahi).

const PDFDocument = require('pdfkit');
const User        = require('../models/User');
const Payment     = require('../models/Payment');
const Package     = require('../models/Package');
const ResumeSubscription = require('../models/ResumeSubscription');
const { syncPendingPayments } = require('./paymentSync');

// Resume (Razorpay) tiers ka asli monthly price. Agar Razorpay plan ₹149 ka bana hai to yahan '150': 149 kar do.
const RESUME_PRICE = { '49': 49, '99': 99, '150': 150 };

// IMPORTANT: timeZone explicitly 'Asia/Kolkata' diya hai — warna server UTC
// mein chalta hai (Railway), aur raat 8 PM IST ka time UTC mein 2:30 PM hota
// hai, jo galat dikh raha tha (4:23 AM wala bug isi wajah se tha).
function formatDate(d) {
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
}
function formatTime(d) {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
}
// Email (HTML, browsers render ₹ fine)
function formatMoney(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}
// PDF (PDFKit ke standard Helvetica font mein ₹ glyph nahi hota, isliye
// garbled dikhta tha — PDF ke andar hamesha "Rs." use karo)
function formatMoneyPDF(n) {
  return 'Rs. ' + Number(n || 0).toLocaleString('en-IN');
}
// "28 Oct, 07:58 PM" — payment table mein date + time
function formatShortDateTime(d) {
  const day = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', timeZone: 'Asia/Kolkata' });
  return `${day}, ${formatTime(d)}`;
}


// ── Data collect karo ek time-window ke liye ──
// respectReported: true (daily cron) = jo payment pehle kisi report mein aa chuki use dobara mat ginao.
// Custom date-range (testing) mein false — poori range dikhao.
async function collectReportData(windowStart, windowEnd, { respectReported = true } = {}) {
  const notReported = respectReported ? { reportedAt: { $exists: false } } : {};

  const [rawSignups, inWindowRaw, earlierRaw, resumeCharges, packages] = await Promise.all([
    User.find({ createdAt: { $gte: windowStart, $lt: windowEnd } })
      .select('name email college createdAt selectedPlan').sort({ createdAt: 1 }).lean(),
    // Is window mein HUI payments (payment ka time = form submit ka time = createdAt) — sirf approved
    Payment.find({
      status: 'approved',
      isLegacyImport: { $ne: true },
      createdAt: { $gte: windowStart, $lt: windowEnd },
      ...notReported
    }).select('userId name email college plan amountPaid status createdAt reviewedAt').sort({ createdAt: 1 }).lean(),
    // Pehle HUI par is window mein approve hui payments (warna kisi report mein kabhi aati hi nahi)
    Payment.find({
      status: 'approved',
      isLegacyImport: { $ne: true },
      createdAt: { $lt: windowStart },
      reviewedAt: { $gte: windowStart, $lt: windowEnd },
      ...notReported
    }).select('userId name email college plan amountPaid status createdAt reviewedAt').sort({ reviewedAt: 1 }).lean(),
    // Razorpay se Resume ki payments (inka Payment record nahi banta) — charge ka time = lastChargedAt
    ResumeSubscription.find({ lastChargedAt: { $gte: windowStart, $lt: windowEnd } })
      .select('userId tier lastChargedAt').sort({ lastChargedAt: 1 }).lean(),
    Package.find().lean()
  ]);

  const planNameMap = {};
  packages.forEach(p => { planNameMap[p.key] = p.name; });
  const planLabel = (plan) => planNameMap[plan] || (/^resume\d+$/.test(plan) ? `Resume Rs. ${plan.replace('resume', '')}` : `Plan ${plan}`);

  const inWindow = inWindowRaw;

  // Razorpay charges ke liye user ka naam/college
  const rzUserMap = {};
  if (resumeCharges.length) {
    const us = await User.find({ _id: { $in: resumeCharges.map(c => c.userId) } }).select('name email college').lean();
    us.forEach(u => { rzUserMap[String(u._id)] = u; });
  }

  // Sabko ek hi shape mein lao
  const fromPayment = (p) => ({
    name: p.name || '—', college: p.college, package: planLabel(p.plan),
    amountPaid: p.amountPaid || 0, paidAt: p.createdAt, confirmedAt: p.reviewedAt || null, paymentId: p._id
  });
  const fromResume = (c) => {
    const u = rzUserMap[String(c.userId)] || {};
    const amt = RESUME_PRICE[c.tier] || 0;
    return {
      name: u.name || '—', college: u.college,
      package: `Resume Rs. ${amt}/mo`, amountPaid: amt, paidAt: c.lastChargedAt, confirmedAt: null, paymentId: null
    };
  };

  const counted = [...inWindow.map(fromPayment), ...resumeCharges.map(fromResume)]
    .sort((x, y) => new Date(x.paidAt) - new Date(y.paidAt));
  const earlierConfirmed = earlierRaw.map(fromPayment);

  const sum = (arr) => arr.reduce((t, p) => t + (p.amountPaid || 0), 0);
  const totalRevenue = sum(counted) + sum(earlierConfirmed);

  // Har signup ke liye uski koi bhi (kisi bhi date ki) approved payment dhoondo,
  // taaki signup table mein "kaunsa package liya + kitna paid kiya" bhi dikhe
  let signupPaymentMap = {};
  if (rawSignups.length) {
    const ids = rawSignups.map(u => u._id);
    const theirPayments = await Payment.find({
      userId: { $in: ids }, status: 'approved'
    }).select('userId plan amountPaid').sort({ createdAt: -1 }).lean();
    theirPayments.forEach(p => {
      const key = String(p.userId);
      if (!signupPaymentMap[key]) signupPaymentMap[key] = p; // sabse latest wali rakho
    });
  }

  const signups = rawSignups.map(u => {
    const pay = signupPaymentMap[String(u._id)];
    return {
      name: u.name, email: u.email, college: u.college, createdAt: u.createdAt,
      planName: planNameMap[u.selectedPlan] || (u.selectedPlan ? `Plan ${u.selectedPlan}` : '—'),
      amountPaid: pay ? pay.amountPaid : null
    };
  });

  const paymentCount = counted.length + earlierConfirmed.length;
  const reportedIds = [...inWindow.map(p => p._id), ...earlierRaw.map(p => p._id)];

  return {
    signups, planNameMap, totalRevenue, paymentCount,
    payments: counted, earlierConfirmed,
    paymentsTotal: sum(counted), earlierTotal: sum(earlierConfirmed),
    reportedIds
  };
}

// ── Simple table drawer (pdfkit has no built-in tables) ──
// alignRight: column indices jo right-align hone chahiye (jaise Amount)
// totalRow: agar diya ho toh bottom mein ek highlighted bill-style total row aata hai
function drawTable(doc, headers, rows, colWidths, { alignRight = [], totalRow = null } = {}) {
  const startX = doc.x;
  let y = doc.y;
  const rowHeight = 22;
  const tableWidth = colWidths.reduce((a, b) => a + b, 0);

  const drawRow = (cells, { bg, color, font, size, border }) => {
    doc.rect(startX, y, tableWidth, rowHeight).fill(bg);
    let x = startX;
    doc.font(font).fontSize(size);
    cells.forEach((cell, i) => {
      doc.fillColor(color).text(String(cell), x + 8, y + 6, {
        width: colWidths[i] - 16,
        align: alignRight.includes(i) ? 'right' : 'left',
        ellipsis: true
      });
      x += colWidths[i];
    });
    if (border) {
      doc.rect(startX, y, tableWidth, rowHeight).strokeColor('#e5e2fb').lineWidth(1).stroke();
    }
    y += rowHeight;
  };

  // Header row
  drawRow(headers, { bg: '#4433c4', color: '#ffffff', font: 'Helvetica-Bold', size: 9.5 });

  // Data rows
  rows.forEach((row, rIdx) => {
    if (y > doc.page.height - 120) { doc.addPage(); y = doc.y; }
    drawRow(row, {
      bg: rIdx % 2 === 0 ? '#f7f6ff' : '#ffffff',
      color: '#2a2550', font: 'Helvetica', size: 9.5
    });
  });

  // Bill-style total row
  if (totalRow) {
    if (y > doc.page.height - 120) { doc.addPage(); y = doc.y; }
    drawRow(totalRow, { bg: '#e8e4fd', color: '#4433c4', font: 'Helvetica-Bold', size: 10.5, border: true });
  }

  doc.y = y + 10;
  doc.x = startX;
}

function formatDateTimeFull(d) {
  // "Wed, 14 Oct 2026, 08:00 PM" — pura clear format
  const weekday = d.toLocaleDateString('en-IN', { weekday: 'short' });
  return `${weekday}, ${formatDate(d)}, ${formatTime(d)}`;
}

// ── Poora PDF banao ──
function generateReportPDF({ signups, paymentCount, payments, earlierConfirmed, paymentsTotal, earlierTotal, totalRevenue, windowStart, windowEnd }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 48, size: 'A4' });
    const chunks = [];
    doc.on('data', c => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageW = doc.page.width - 96; // usable width (margins already removed)

    // ── Header: title + subtitle normal auto-flow mein (overlap se bachne ke liye) ──
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#4433c4').text('PlacementSphere');
    doc.moveDown(0.15);
    doc.font('Helvetica').fontSize(10).fillColor('#888').text('Daily Business Report');
    doc.moveDown(0.8);

    // ── Report period box — fixed box height, text explicit offsets isi box
    // ke andar (doc.y pe depend nahi karta, isliye overlap nahi hoga) ──
    const periodBoxY = doc.y;
    const periodBoxH = 46;
    doc.roundedRect(48, periodBoxY, pageW, periodBoxH, 6).fill('#f7f6ff');
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#4433c4')
      .text('REPORT PERIOD', 62, periodBoxY + 10, { lineBreak: false });
    doc.font('Helvetica').fontSize(10).fillColor('#333')
      .text(`${formatDateTimeFull(windowStart)}   to   ${formatDateTimeFull(windowEnd)}`, 62, periodBoxY + 25, { width: pageW - 28, lineBreak: false });
    doc.y = periodBoxY + periodBoxH + 22;
    doc.x = 48;

    // ── Summary cards (3 boxes, revenue gets more width since it has longer text) ──
    const gap = 12;
    const revW = pageW * 0.4;
    const otherW = (pageW - revW - gap * 2) / 2;
    const boxY = doc.y;
    const boxH = 60;
    const summary = [
      { label: 'NEW SIGNUPS', value: String(signups.length), color: '#7c6af7', w: otherW },
      { label: 'PAYMENTS COLLECTED', value: String(paymentCount), color: '#06b6d4', w: otherW },
      { label: 'TOTAL REVENUE (THIS REPORT)', value: formatMoneyPDF(totalRevenue), color: '#34d399', w: revW }
    ];
    let bx = 48;
    summary.forEach(s => {
      doc.roundedRect(bx, boxY, s.w, boxH, 6).fillAndStroke('#f7f6ff', '#e5e2fb');
      doc.font('Helvetica').fontSize(7.5).fillColor('#888')
        .text(s.label, bx + 12, boxY + 11, { width: s.w - 24, lineBreak: false });
      doc.font('Helvetica-Bold').fontSize(15).fillColor(s.color)
        .text(s.value, bx + 12, boxY + 28, { width: s.w - 24, lineBreak: false });
      bx += s.w + gap;
    });
    doc.y = boxY + boxH + 26;
    doc.x = 48;

    // ── 1) Payments — 8 PM se 8 PM ke beech form submit hui (approved) payments, date + time ke saath ──
    // Note: PDF ke standard fonts emoji render nahi karte, isliye yahan plain text headings hain
    const payRows = (arr) => arr.map(p => [
      formatShortDateTime(new Date(p.paidAt)), p.name, (p.college || 'kiit').toUpperCase(), p.package, formatMoneyPDF(p.amountPaid)
    ]);

    doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a2e').text('Payments Collected');
    doc.font('Helvetica').fontSize(8.5).fillColor('#888')
      .text(`Form submitted between ${formatDate(windowStart)}, ${formatTime(windowStart)}  and  ${formatDate(windowEnd)}, ${formatTime(windowEnd)}`);
    doc.moveDown(0.4);
    if (!payments.length) {
      doc.font('Helvetica').fontSize(10).fillColor('#999').text('No payments in this period.');
      doc.moveDown(1);
    } else {
      drawTable(doc, ['Paid On', 'Name', 'College', 'Package', 'Amount Paid'], payRows(payments),
        [100, 120, 62, 117, 100], { alignRight: [4], totalRow: ['', '', '', 'Total', formatMoneyPDF(paymentsTotal)] });
      doc.moveDown(0.6);
    }

    if (earlierConfirmed.length) {
      doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a2e').text('Earlier Payments Approved Later');
      doc.font('Helvetica').fontSize(8.5).fillColor('#888').text('Form was submitted before this report period, approved during it (original date shown)');
      doc.moveDown(0.4);
      drawTable(
        doc,
        ['Paid On', 'Name', 'Package', 'Amount Paid', 'Approved On'],
        earlierConfirmed.map(p => [
          formatShortDateTime(new Date(p.paidAt)), p.name, p.package, formatMoneyPDF(p.amountPaid),
          p.confirmedAt ? formatShortDateTime(new Date(p.confirmedAt)) : '-'
        ]),
        [100, 112, 107, 90, 90],
        { alignRight: [3], totalRow: ['', '', 'Total', formatMoneyPDF(earlierTotal), ''] }
      );
      doc.moveDown(0.6);
    }

    // ── 2) New Signups — neeche, package + amount paid (agar hai) ke saath ──
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a2e').text('New Signups');
    doc.moveDown(0.4);
    if (!signups.length) {
      doc.font('Helvetica').fontSize(10).fillColor('#999').text('No new signups in this period.');
    } else {
      drawTable(
        doc,
        ['Name', 'Email', 'College', 'Package', 'Amount Paid'],
        signups.map(s => [
          s.name || '—',
          s.email || '—',
          (s.college || 'kiit').toUpperCase(),
          s.planName,
          s.amountPaid != null ? formatMoneyPDF(s.amountPaid) : 'Pending'
        ]),
        [95, 150, 55, 90, 109],
        { alignRight: [4] }
      );
    }

    doc.moveDown(1.5);
    doc.font('Helvetica').fontSize(8).fillColor('#aaa')
      .text('Generated automatically by PlacementSphere - This is an internal business report.', { align: 'center' });

    doc.end();
  });
}

// ── Professional email HTML body ──
function buildEmailHtml({ signups, paymentCount, payments, earlierConfirmed, paymentsTotal, earlierTotal, totalRevenue, windowStart, windowEnd }) {
  return `
  <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff">
    <div style="background:linear-gradient(135deg,#4433c4,#7c6af7);padding:28px 32px;border-radius:12px 12px 0 0">
      <div style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.01em">PlacementSphere</div>
      <div style="color:rgba(255,255,255,0.75);font-size:13px;margin-top:2px">Daily Business Report</div>
    </div>
    <div style="padding:28px 32px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px">
      <p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px">
        Here's your snapshot for <b>${formatDateTimeFull(windowStart)} → ${formatDateTimeFull(windowEnd)}</b>.
        Full details are in the attached PDF.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:8px 0;margin:0 -8px">
        <tr>
          <td style="background:#f7f6ff;border-radius:10px;padding:16px;text-align:center;width:33%">
            <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.04em">Signups</div>
            <div style="color:#7c6af7;font-size:24px;font-weight:800;margin-top:4px">${signups.length}</div>
          </td>
          <td style="background:#f0fdfa;border-radius:10px;padding:16px;text-align:center;width:33%">
            <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.04em">Payments</div>
            <div style="color:#06b6d4;font-size:24px;font-weight:800;margin-top:4px">${paymentCount}</div>
          </td>
          <td style="background:#f0fdf6;border-radius:10px;padding:16px;text-align:center;width:33%">
            <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.04em">Revenue</div>
            <div style="color:#34d399;font-size:20px;font-weight:800;margin-top:4px">${formatMoney(totalRevenue)}</div>
          </td>
        </tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 0;font-size:13px;color:#444">
        <tr><td style="padding:5px 0">Payments submitted in this period</td><td align="right" style="padding:5px 0"><b>${payments.length}</b> &nbsp;·&nbsp; ${formatMoney(paymentsTotal)}</td></tr>
        ${earlierConfirmed.length ? `<tr><td style="padding:5px 0;border-top:1px solid #eee">Earlier payments approved later</td><td align="right" style="padding:5px 0;border-top:1px solid #eee"><b>${earlierConfirmed.length}</b> &nbsp;·&nbsp; ${formatMoney(earlierTotal)}</td></tr>` : ''}
      </table>
      <p style="color:#999;font-size:12px;line-height:1.6;margin:24px 0 0">
        📎 Full report (names, packages, per-transaction amounts) attached as PDF.
      </p>
    </div>
    <div style="text-align:center;padding:16px;color:#bbb;font-size:11px">
      Sent automatically every day at 8:00 PM IST · PlacementSphere
    </div>
  </div>`;
}

// ── Email bhejo Resend ke HTTP API se (SMTP nahi — Railway SMTP ports block
// karta hai, lekin HTTPS/443 kabhi block nahi hota) ──
async function sendViaResend({ subject, html, pdfBuffer, filename }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY env var missing');
  }
  if (!process.env.ADMIN_REPORT_EMAIL) {
    throw new Error('ADMIN_REPORT_EMAIL env var missing');
  }

  const axios = require('axios');
  const fromAddress = process.env.RESEND_FROM || 'PlacementSphere Reports <onboarding@resend.dev>';

  const resp = await axios.post('https://api.resend.com/emails', {
    from: fromAddress,
    to: [process.env.ADMIN_REPORT_EMAIL],
    subject,
    html,
    attachments: [{
      filename,
      content: pdfBuffer.toString('base64')
    }]
  }, {
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 20000
  });

  return resp.data;
}

// ── Main entry point ──
async function sendDailyReport(customStart, customEnd) {
  // Testing ke liye custom date-range diya ja sakta hai — daily 8 PM cron
  // isko bina kisi argument ke call karta hai, toh woh hamesha normal
  // 24-ghante wala rolling window hi use karega, isme koi change nahi
  const windowEnd = customEnd ? new Date(customEnd) : new Date();
  const windowStart = customStart ? new Date(customStart) : new Date(windowEnd.getTime() - 24 * 60 * 60 * 1000);

  // Report se pehle: jin pending payments ke users ko access mil chuka hai unhe approved kar do
  // (admin panel kholna zaroori nahi)
  try { await syncPendingPayments(); } catch (syncErr) { console.error('❌ paymentSync (report se pehle) failed:', syncErr.message); }

  // Custom range (testing) mein reportedAt ka filter/marking nahi — sirf asli daily cron mein
  const isCustom = !!(customStart || customEnd);
  const data = await collectReportData(windowStart, windowEnd, { respectReported: !isCustom });
  const pdfBuffer = await generateReportPDF({ ...data, windowStart, windowEnd });

  console.log('📧 Email config check:', {
    resendKeySet: !!process.env.RESEND_API_KEY,
    adminEmail: process.env.ADMIN_REPORT_EMAIL || '❌ MISSING'
  });

  const dateStr = formatDate(windowEnd).replace(/ /g, '-');

  await sendViaResend({
    subject: `📊 Daily Report — ${formatDate(windowEnd)} | ${data.signups.length} signups · ${formatMoney(data.totalRevenue)} collected`,
    html: buildEmailHtml({ ...data, windowStart, windowEnd }),
    pdfBuffer,
    filename: `PlacementSphere-Report-${dateStr}.pdf`
  });

  // Email chali gayi — ab in payments ko "report ho chuki" mark karo taaki agle din dobara count na ho
  if (!isCustom && data.reportedIds.length) {
    try {
      await Payment.updateMany({ _id: { $in: data.reportedIds } }, { $set: { reportedAt: new Date() } });
    } catch (markErr) {
      console.error('❌ reportedAt mark failed (agle report mein duplicate aa sakta hai):', markErr.message);
    }
  }

  console.log(`✅ Daily report sent — ${data.signups.length} signups, ${data.paymentCount} payments, ${formatMoney(data.totalRevenue)} revenue`);
}

module.exports = { sendDailyReport, collectReportData, generateReportPDF, sendViaResend };
