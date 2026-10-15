// backend/services/dailyReport.js
//
// Har roj raat 8 baje ka automatic report — kitne naye signups hue, kitni
// payments collect hui, aur total revenue — ek professional PDF banake admin
// ko email karta hai. Window hamesha "pichle 8 baje se abhi ke 8 baje tak"
// (24 ghante rolling), isliye agar koi raat 8:01 baje aaya toh woh agle din
// ke report mein aayega.

const PDFDocument = require('pdfkit');
const User        = require('../models/User');
const Payment     = require('../models/Payment');
const Package     = require('../models/Package');

function formatDate(d) {
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatTime(d) {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}
function formatMoney(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}

// ── Data collect karo ek time-window ke liye ──
async function collectReportData(windowStart, windowEnd) {
  const [rawSignups, payments, packages] = await Promise.all([
    User.find({ createdAt: { $gte: windowStart, $lt: windowEnd } })
      .select('name email college createdAt selectedPlan').sort({ createdAt: 1 }).lean(),
    Payment.find({
      status: 'approved',
      isLegacyImport: { $ne: true },
      createdAt: { $gte: windowStart, $lt: windowEnd }
    }).select('userId name email college plan amountPaid createdAt').sort({ createdAt: 1 }).lean(),
    Package.find().lean()
  ]);

  const planNameMap = {};
  packages.forEach(p => { planNameMap[p.key] = p.name; });

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

  const totalRevenue = payments.reduce((sum, p) => sum + (p.amountPaid || 0), 0);

  return { signups, payments, planNameMap, totalRevenue };
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
function generateReportPDF({ signups, payments, planNameMap, totalRevenue, windowStart, windowEnd }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 48, size: 'A4' });
    const chunks = [];
    doc.on('data', c => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageW = doc.page.width - 96; // usable width (margins already removed)

    // ── Header ──
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#4433c4').text('PlacementSphere');
    doc.font('Helvetica').fontSize(10).fillColor('#888').text('Daily Business Report');
    doc.moveDown(0.5);
    doc.roundedRect(48, doc.y, pageW, 36, 6).fill('#f7f6ff');
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#4433c4')
      .text('REPORT PERIOD', 60, doc.y - 28);
    doc.font('Helvetica').fontSize(10).fillColor('#333')
      .text(`${formatDateTimeFull(windowStart)}   →   ${formatDateTimeFull(windowEnd)}`, 60, doc.y + 1);
    doc.y += 16;
    doc.moveDown(1.2);

    // ── Summary cards (3 boxes, revenue gets more width since it has longer text) ──
    const gap = 12;
    const revW = pageW * 0.38;
    const otherW = (pageW - revW - gap * 2) / 2;
    const boxY = doc.y;
    const summary = [
      { label: 'NEW SIGNUPS', value: String(signups.length), color: '#7c6af7', w: otherW },
      { label: 'PAYMENTS COLLECTED', value: String(payments.length), color: '#06b6d4', w: otherW },
      { label: 'REVENUE TODAY', value: formatMoney(totalRevenue), color: '#34d399', w: revW }
    ];
    let bx = 48;
    summary.forEach(s => {
      doc.roundedRect(bx, boxY, s.w, 62, 6).fillAndStroke('#f7f6ff', '#e5e2fb');
      doc.font('Helvetica').fontSize(8).fillColor('#888').text(s.label, bx + 14, boxY + 12, { width: s.w - 28 });
      doc.font('Helvetica-Bold').fontSize(16).fillColor(s.color).text(s.value, bx + 14, boxY + 30, { width: s.w - 28, lineBreak: false });
      bx += s.w + gap;
    });
    doc.y = boxY + 62 + 26;
    doc.x = 48;

    // ── 1) Payments Collected (bill-style, with total row) — ab sabse upar ──
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a2e').text('💰 Payments Collected');
    doc.moveDown(0.4);
    if (!payments.length) {
      doc.font('Helvetica').fontSize(10).fillColor('#999').text('No payments collected in this period.');
      doc.moveDown(1);
    } else {
      drawTable(
        doc,
        ['Name', 'College', 'Package', 'Amount Paid'],
        payments.map(p => [
          p.name || '—',
          (p.college || 'kiit').toUpperCase(),
          planNameMap[p.plan] || `Plan ${p.plan}`,
          formatMoney(p.amountPaid)
        ]),
        [150, 75, 139, 135],
        {
          alignRight: [3],
          totalRow: ['', '', 'Total Collected', formatMoney(totalRevenue)]
        }
      );
      doc.moveDown(0.6);
    }

    // ── 2) New Signups — neeche, package + amount paid (agar hai) ke saath ──
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a2e').text('🆕 New Signups');
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
          s.amountPaid != null ? formatMoney(s.amountPaid) : 'Pending'
        ]),
        [95, 150, 55, 90, 109],
        { alignRight: [4] }
      );
    }

    doc.moveDown(1.5);
    doc.font('Helvetica').fontSize(8).fillColor('#aaa')
      .text('Generated automatically by PlacementSphere · This is an internal business report.', { align: 'center' });

    doc.end();
  });
}

// ── Professional email HTML body ──
function buildEmailHtml({ signups, payments, totalRevenue, windowStart, windowEnd }) {
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
            <div style="color:#06b6d4;font-size:24px;font-weight:800;margin-top:4px">${payments.length}</div>
          </td>
          <td style="background:#f0fdf6;border-radius:10px;padding:16px;text-align:center;width:33%">
            <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.04em">Revenue</div>
            <div style="color:#34d399;font-size:20px;font-weight:800;margin-top:4px">${formatMoney(totalRevenue)}</div>
          </td>
        </tr>
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
async function sendDailyReport() {
  const windowEnd = new Date();
  const windowStart = new Date(windowEnd.getTime() - 24 * 60 * 60 * 1000);

  const data = await collectReportData(windowStart, windowEnd);
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

  console.log(`✅ Daily report sent — ${data.signups.length} signups, ${formatMoney(data.totalRevenue)} revenue`);
}

module.exports = { sendDailyReport, collectReportData, generateReportPDF, sendViaResend };
