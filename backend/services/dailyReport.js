// backend/services/dailyReport.js
//
// Har roj raat 8 baje ka automatic report — kitne naye signups hue, kitni
// payments collect hui, aur total revenue — ek professional PDF banake admin
// ko email karta hai. Window hamesha "pichle 8 baje se abhi ke 8 baje tak"
// (24 ghante rolling), isliye agar koi raat 8:01 baje aaya toh woh agle din
// ke report mein aayega.

const PDFDocument = require('pdfkit');
const nodemailer  = require('nodemailer');
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
  const [signups, payments, packages] = await Promise.all([
    User.find({ createdAt: { $gte: windowStart, $lt: windowEnd } })
      .select('name email college createdAt').sort({ createdAt: 1 }).lean(),
    Payment.find({
      status: 'approved',
      isLegacyImport: { $ne: true },
      createdAt: { $gte: windowStart, $lt: windowEnd }
    }).select('name email plan amountPaid createdAt').sort({ createdAt: 1 }).lean(),
    Package.find().lean()
  ]);

  const planNameMap = {};
  packages.forEach(p => { planNameMap[p.key] = p.name; });

  const totalRevenue = payments.reduce((sum, p) => sum + (p.amountPaid || 0), 0);

  return { signups, payments, planNameMap, totalRevenue };
}

// ── Simple table drawer (pdfkit has no built-in tables) ──
function drawTable(doc, headers, rows, colWidths) {
  const startX = doc.x;
  let y = doc.y;
  const rowHeight = 22;

  // Header row
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#ffffff');
  doc.rect(startX, y, colWidths.reduce((a, b) => a + b, 0), rowHeight).fill('#4433c4');
  let x = startX;
  headers.forEach((h, i) => {
    doc.fillColor('#ffffff').text(h, x + 8, y + 6, { width: colWidths[i] - 12 });
    x += colWidths[i];
  });
  y += rowHeight;

  // Data rows
  doc.font('Helvetica').fontSize(9.5);
  rows.forEach((row, rIdx) => {
    const bg = rIdx % 2 === 0 ? '#f7f6ff' : '#ffffff';
    doc.rect(startX, y, colWidths.reduce((a, b) => a + b, 0), rowHeight).fill(bg);
    x = startX;
    row.forEach((cell, i) => {
      doc.fillColor('#2a2550').text(String(cell), x + 8, y + 6, { width: colWidths[i] - 12, ellipsis: true });
      x += colWidths[i];
    });
    y += rowHeight;

    // Naya page agar bottom ke paas pahunch gaye
    if (y > doc.page.height - 100) {
      doc.addPage();
      y = doc.y;
    }
  });

  doc.y = y + 10;
}

// ── Poora PDF banao ──
function generateReportPDF({ signups, payments, planNameMap, totalRevenue, windowStart, windowEnd }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 48, size: 'A4' });
    const chunks = [];
    doc.on('data', c => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // ── Header ──
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#4433c4').text('PlacementSphere');
    doc.font('Helvetica').fontSize(10).fillColor('#888').text('Daily Business Report');
    doc.moveDown(0.3);
    doc.fontSize(9.5).fillColor('#555')
      .text(`Report period: ${formatDate(windowStart)} ${formatTime(windowStart)}  →  ${formatDate(windowEnd)} ${formatTime(windowEnd)}`);
    doc.moveDown(1);
    doc.moveTo(48, doc.y).lineTo(doc.page.width - 48, doc.y).strokeColor('#e5e2fb').lineWidth(1).stroke();
    doc.moveDown(1);

    // ── Summary cards (3 boxes in a row) ──
    const boxW = (doc.page.width - 96 - 24) / 3;
    const boxY = doc.y;
    const summary = [
      { label: 'New Signups', value: String(signups.length), color: '#7c6af7' },
      { label: 'Payments Collected', value: String(payments.length), color: '#06b6d4' },
      { label: 'Revenue Today', value: formatMoney(totalRevenue), color: '#34d399' }
    ];
    summary.forEach((s, i) => {
      const bx = 48 + i * (boxW + 12);
      doc.roundedRect(bx, boxY, boxW, 58, 6).fillAndStroke('#f7f6ff', '#e5e2fb');
      doc.font('Helvetica').fontSize(8.5).fillColor('#888').text(s.label, bx + 12, boxY + 10, { width: boxW - 24 });
      doc.font('Helvetica-Bold').fontSize(17).fillColor(s.color).text(s.value, bx + 12, boxY + 26, { width: boxW - 24 });
    });
    doc.y = boxY + 58 + 24;
    doc.x = 48;

    // ── New Signups table ──
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a2e').text('New Signups');
    doc.moveDown(0.4);
    if (!signups.length) {
      doc.font('Helvetica').fontSize(10).fillColor('#999').text('No new signups in this period.');
    } else {
      drawTable(
        doc,
        ['Name', 'Email', 'College'],
        signups.map(s => [s.name || '—', s.email || '—', (s.college || 'kiit').toUpperCase()]),
        [160, 250, 90]
      );
    }
    doc.moveDown(0.8);

    // ── Payments table ──
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a2e').text('Payments Collected');
    doc.moveDown(0.4);
    if (!payments.length) {
      doc.font('Helvetica').fontSize(10).fillColor('#999').text('No payments collected in this period.');
    } else {
      drawTable(
        doc,
        ['Name', 'Package', 'Amount'],
        payments.map(p => [p.name || '—', planNameMap[p.plan] || `Plan ${p.plan}`, formatMoney(p.amountPaid)]),
        [200, 200, 100]
      );
    }

    // ── Total footer ──
    doc.moveDown(1);
    if (doc.y > doc.page.height - 100) doc.addPage();
    doc.moveTo(48, doc.y).lineTo(doc.page.width - 48, doc.y).strokeColor('#e5e2fb').lineWidth(1).stroke();
    doc.moveDown(0.6);
    doc.font('Helvetica-Bold').fontSize(14).fillColor('#4433c4')
      .text(`Total Amount Collected Today: ${formatMoney(totalRevenue)}`, { align: 'right' });

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
        Here's your snapshot for <b>${formatDate(windowStart)}</b> (${formatTime(windowStart)} → ${formatTime(windowEnd)}).
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

// ── Main entry point ──
async function sendDailyReport() {
  const windowEnd = new Date();
  const windowStart = new Date(windowEnd.getTime() - 24 * 60 * 60 * 1000);

  const data = await collectReportData(windowStart, windowEnd);
  const pdfBuffer = await generateReportPDF({ ...data, windowStart, windowEnd });

  // Debug: Railway logs mein dikhega ki env vars actually set hain ya nahi
  // (password kabhi print nahi hota, sirf uski length — safe hai)
  console.log('📧 SMTP config check:', {
    host: process.env.SMTP_HOST || '❌ MISSING',
    port: process.env.SMTP_PORT || '❌ MISSING',
    user: process.env.SMTP_USER || '❌ MISSING',
    passLength: process.env.SMTP_PASS ? process.env.SMTP_PASS.length : '❌ MISSING',
    adminEmail: process.env.ADMIN_REPORT_EMAIL || '❌ MISSING'
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 15000, // 15 sec — jaldi fail ho jaye, hang na ho
    greetingTimeout: 15000,
    socketTimeout: 15000
  });

  // Pehle connection verify karo — isse pata chalega exact wajah
  // (galat host/port/auth/firewall block — sab alag error dete hain)
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified');
  } catch (verifyErr) {
    console.error('❌ SMTP verify failed:', verifyErr.message);
    throw new Error(`SMTP connection failed: ${verifyErr.message}`);
  }

  const dateStr = formatDate(windowEnd).replace(/ /g, '-');

  await transporter.sendMail({
    from: `"PlacementSphere Reports" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_REPORT_EMAIL,
    subject: `📊 Daily Report — ${formatDate(windowEnd)} | ${data.signups.length} signups · ${formatMoney(data.totalRevenue)} collected`,
    html: buildEmailHtml({ ...data, windowStart, windowEnd }),
    attachments: [{
      filename: `PlacementSphere-Report-${dateStr}.pdf`,
      content: pdfBuffer
    }]
  });

  console.log(`✅ Daily report sent — ${data.signups.length} signups, ${formatMoney(data.totalRevenue)} revenue`);
}

module.exports = { sendDailyReport, collectReportData, generateReportPDF };
