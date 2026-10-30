// require('dotenv').config();
// const express  = require('express');
// const mongoose = require('mongoose');
// const cors     = require('cors');

// const app = express();
// app.set('trust proxy', 1);

// app.use(cors({
//   origin: [
//     process.env.FRONTEND_URL,
//     'http://localhost:5500',
//     'http://127.0.0.1:5500',
//     'http://localhost:3000',
//     'http://localhost:5501',
//     'https://placementsphere.in',
//     'https://www.placementsphere.in',

//     /\.vercel\.app$/
//   ],
//   credentials: true
// }));
// app.use(express.json());

// app.use('/api/auth',        require('./routes/auth'));
// app.use('/api/payment',     require('./routes/payment'));
// app.use('/api/companies2026', require('./routes/companies2026'));
// app.use('/api/resume', require('./routes/resume'));
// app.use('/api/companies',   require('./routes/companies'));
// app.use('/api/dsa',         require('./routes/dsa'));
// app.use('/api/notes',       require('./routes/notes'));
// app.use('/api/experiences', require('./routes/experiences'));
// app.use('/api/admin',       require('./routes/admin'));
app.use('/api/mail',  require('./routes/mail'));
// app.use('/api/activity', require('./routes/activity'));
// app.use('/api/feedback', require('./routes/feedback'));
// app.use('/api/tests', require('./routes/tests'));
// app.use('/api/masterdsa', require('./routes/masterdsa'));
// app.use('/api/masterdsa', require('./routes/masterdsa'));

// app.get('/', (_req, res) => res.json({ status: 'PlacementSphere API running ✅' }));

// app.use((err, _req, res, _next) => {
//   console.error(err);
//   res.status(500).json({ error: err.message });
// });

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(process.env.PORT || 5000, () =>
//       console.log(`🚀 Server on port ${process.env.PORT || 5000}`));
//   })
//   .catch(err => { console.error('❌ DB error:', err); process.exit(1); });

require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const cron     = require('node-cron');
const { sendDailyReport } = require('./services/dailyReport');
const { cutoffOldManualResumeUsers } = require('./services/resumeMonthlyCutoff');
const { syncPendingPayments } = require('./services/paymentSync');
const { processMailQueue } = require('./services/mailCampaign');

const app = express();
app.set('trust proxy', 1);

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://localhost:5501',
    'https://placementsphere.in',
    'https://www.placementsphere.in',

    /\.vercel\.app$/
  ],
  credentials: true
}));
// IMPORTANT: webhook route ko raw body chahiye signature verify karne ke liye —
// isliye global express.json() se PEHLE, sirf isi path ke liye raw parser
app.use('/api/webhooks', express.raw({ type: 'application/json' }), require('./routes/razorpayWebhook'));

app.use(express.json({ limit: '10mb' }));

app.use('/api/auth',        require('./routes/auth'));
app.use('/api/payment',     require('./routes/payment'));
app.use('/api/companies2026', require('./routes/companies2026'));
app.use('/api/resume', require('./routes/resume'));
app.use('/api/resume-subscription', require('./routes/resumeSubscription'));
app.use('/api/companies',   require('./routes/companies'));
app.use('/api/packages',    require('./routes/packages'));
app.use('/api/colleges',    require('./routes/colleges'));
app.use('/api/dsa',         require('./routes/dsa'));
app.use('/api/notes',       require('./routes/notes'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/admin',       require('./routes/admin'));
app.use('/api/activity', require('./routes/activity'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/masterdsa', require('./routes/masterdsa'));
app.use('/api/pageview', require('./routes/pageview'));

app.get('/', (_req, res) => res.json({ status: 'PlacementSphere API running ✅' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // Purane users ke document mein isGoogleReq field hota hi nahi tha (Mongoose default DB mein save nahi karta).
    // Ek baar sabme true set kar do — jinke paas pehle se value hai (jaise tumne false kiya) unhe nahi chhedta,
    // aur dobara chalane par kuch nahi badalta. (collection.updateMany => updatedAt/timestamps pe koi asar nahi)
    require('./models/User').collection
      .updateMany({ isGoogleReq: { $exists: false } }, { $set: { isGoogleReq: true } })
      .then(r => console.log(`🔑 isGoogleReq added to ${r.modifiedCount} users`))
      .catch(err => console.error('❌ isGoogleReq migration failed:', err.message));

    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server on port ${process.env.PORT || 5000}`));

    // Har roj raat 8 baje (IST) daily report email bhej do
    cron.schedule('0 20 * * *', () => {
      sendDailyReport().catch(err => {
        console.error('❌ Daily report failed, retrying once:', err.message);
        setTimeout(() => {
          sendDailyReport().catch(e => console.error('❌ Retry also failed:', e.message));
        }, 60000);
      });
    }, { timezone: 'Asia/Kolkata' });
    console.log('📅 Daily report scheduled for 8:00 PM IST');

    // Har mahine ke pehle din — purane manual resume users ka access band karo
    cron.schedule('5 0 1 * *', () => {
      cutoffOldManualResumeUsers().catch(err => console.error('❌ Resume cutoff failed:', err));
    }, { timezone: 'Asia/Kolkata' });
    console.log('📅 Resume monthly cutoff scheduled for 1st of month, 12:05 AM IST');

    // Har 10 minute: jin pending payments ke users ko access mil chuka hai (DB se manually active kiya)
    // unhe approved mark karo — admin panel kholna zaroori nahi
    cron.schedule('*/10 * * * *', () => {
      syncPendingPayments()
        .then(n => { if (n) console.log(`🔄 paymentSync: ${n} pending payment(s) approved`); })
        .catch(err => console.error('❌ paymentSync failed:', err.message));
    }, { timezone: 'Asia/Kolkata' });
    console.log('📅 Payment auto-sync scheduled every 10 minutes');

    // Admin panel ki mail campaigns: har 2 minute queue check (daily limit ke andar bhejti hai, agle din aage chalti hai)
    cron.schedule('*/2 * * * *', () => {
      processMailQueue().catch(err => console.error('❌ mail queue failed:', err.message));
    }, { timezone: 'Asia/Kolkata' });
  })
  .catch(err => { console.error('❌ DB error:', err); process.exit(1); });
