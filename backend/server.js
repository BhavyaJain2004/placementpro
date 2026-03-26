require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://localhost:5501',

    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',        require('./routes/auth'));
app.use('/api/payment',     require('./routes/payment'));
app.use('/api/companies',   require('./routes/companies'));
app.use('/api/dsa',         require('./routes/dsa'));
app.use('/api/notes',       require('./routes/notes'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/admin',       require('./routes/admin'));

app.get('/', (_req, res) => res.json({ status: 'PlacementPro API running ✅' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server on port ${process.env.PORT || 5000}`));
  })
  .catch(err => { console.error('❌ DB error:', err); process.exit(1); });