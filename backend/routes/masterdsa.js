const express = require('express');
const router = express.Router();
const DailySolve = require('../models/DailySolve');
const axios = require('axios');

const Q = require('../models/MasterDSAQuestion');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Access check middleware
const verifyMasterDSA = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select('masterDsaAccess');

    if (!user || !user.masterDsaAccess) {
      return res.status(403).json({
        message: 'MASTER_DSA_LOCKED'
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

// GET /api/masterdsa/topics
router.get(
  '/topics',
  verifyToken,
  verifyMasterDSA,
  async (req, res) => {
    try {
      const topics = await Q.aggregate([
        {
          $match: { isActive: true }
        },
        {
          $group: {
            _id: '$topicSlug',
            topic: { $first: '$topic' },
            count: { $sum: 1 },

            easy: {
              $sum: {
                $cond: [
                  { $eq: ['$difficulty', 'Easy'] },
                  1,
                  0
                ]
              }
            },

            medium: {
              $sum: {
                $cond: [
                  { $eq: ['$difficulty', 'Medium'] },
                  1,
                  0
                ]
              }
            },

            hard: {
              $sum: {
                $cond: [
                  { $eq: ['$difficulty', 'Hard'] },
                  1,
                  0
                ]
              }
            }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);

      res.json(topics);

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);

// GET /api/masterdsa/questions/:topicSlug
router.get(
  '/questions/:topicSlug',
  verifyToken,
  verifyMasterDSA,
  async (req, res) => {
    try {
      const questions = await Q.find({
        topicSlug: req.params.topicSlug,
        isActive: true
      })
        .select(
          '-hint -approach -java_code -python_code -cpp_code -c_code'
        )
        .sort({ order: 1 });

      res.json(questions);

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);

// GET /api/masterdsa/question/:id
router.get(
  '/question/:id',
  verifyToken,
  verifyMasterDSA,
  async (req, res) => {
    try {
      const question = await Q.findById(req.params.id);

      if (!question) {
        return res.status(404).json({
          message: 'Not found'
        });
      }

      res.json(question);

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);

// GET /api/masterdsa/daily
router.get('/daily', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    const total = await Q.countDocuments({ isActive: true });
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const idx = dayOfYear % total;
    const question = await Q.findOne({ isActive: true })
      .sort({ globalOrder: 1 }).skip(idx)
      .select('-java_code -python_code -cpp_code -c_code -hint -approach');

    const today = new Date().toISOString().split('T')[0];
    const solvedToday = await DailySolve.countDocuments({ date: today });
    const mine = await DailySolve.findOne({ userId: req.user.id, date: today });

    res.json({ question, solvedToday, alreadySolvedByMe: !!mine });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// GET /api/masterdsa/search?q=keyword
router.get(
  '/search',
  verifyToken,
  verifyMasterDSA,
  async (req, res) => {
    try {
      const { q } = req.query;

      if (!q) {
        return res.json([]);
      }

      const results = await Q.find({
        isActive: true,
        $or: [
          {
            title: {
              $regex: q,
              $options: 'i'
            }
          },
          {
            tags: {
              $in: [new RegExp(q, 'i')]
            }
          },
          {
            topic: {
              $regex: q,
              $options: 'i'
            }
          }
        ]
      })
        .select(
          '-java_code -python_code -cpp_code -c_code -hint -approach'
        )
        .limit(20);

      res.json(results);

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);



router.post('/daily/solve', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    // Upsert — one solve per user per day
    await DailySolve.findOneAndUpdate(
      { userId: req.user.id, date: today },
      { userId: req.user.id, email: req.user.email, name: req.user.name, date: today },
      { upsert: true }
    );
    res.json({ message: 'Marked!' });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// GET /api/masterdsa/leaderboard — top 20 by questions solved
router.get('/leaderboard', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    const solves = await DailySolve.aggregate([
      { $group: { _id: '$userId', name: { $first: '$name' }, count: { $sum: 1 } } }
    ]);
    const solveMap = {};
    solves.forEach(s => solveMap[s._id.toString()] = { name: s.name, count: s.count });

    const allUsers = await User.find({ masterDsaAccess: true }).select('_id name');
    const combined = allUsers.map(u => ({
      userId: u._id.toString(),
      name: solveMap[u._id.toString()]?.name || u.name,
      count: solveMap[u._id.toString()]?.count || 0
    }));
    combined.sort((a,b) => b.count - a.count);

    const top = combined.slice(0, 20);
    const myIndex = combined.findIndex(c => c.userId === req.user.id.toString());
    const myRank  = myIndex + 1;
    const myCount = combined[myIndex]?.count || 0;

    res.json({ leaderboard: top, myRank, myCount });
  } catch(err) { res.status(500).json({ message: err.message }); }
});



router.post('/run-code', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    const { code, language } = req.body;
    const langMap = { java:'java', python:'python3', cpp:'cpp17', c:'c' };
    const versionMap = { java:'4', python:'4', cpp:'5', c:'5' };

    const resp = await axios.post('https://api.jdoodle.com/v1/execute', {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: code,
      language: langMap[language],
      versionIndex: versionMap[language]
    });
    res.json(resp.data);
  } catch(err) {
    res.status(500).json({ output: 'Compiler error: ' + err.message });
  }
});
// backend/routes/masterdsa.js mein add karo, module.exports se PEHLE
// backend/routes/masterdsa.js mein PURANA /mentor/chat route POORA REPLACE karo isse

// backend/routes/masterdsa.js mein PURANA /mentor/chat + callGemini POORA REPLACE karo isse

const axios2 = require('axios');
const GEMINI_MODEL = 'gemini-2.0-flash'; // stable, widely available

router.post('/mentor/chat', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY missing in env');
      return res.status(500).json({ reply: "Mentor setup incomplete — API key missing." });
    }

    const { message, history } = req.body;
    const sysPrompt = "You are a friendly DSA mentor for placement prep students. Keep replies short (3-5 lines), encouraging, in simple Hindi+English mix (Hinglish).";

    const contents = (history||[]).map(h => ({ role: h.role, parts: [{text: h.text}] }));
    contents.push({ role: 'user', parts: [{text: message}] });

    const resp = await axios2.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents, systemInstruction: { parts: [{text: sysPrompt}] } },
      { timeout: 15000 }
    );

    const reply = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      console.error('Gemini empty response:', JSON.stringify(resp.data));
      return res.json({ reply: "Samajh nahi paya, dobara try karo." });
    }
    res.json({ reply });
  } catch(err) {
    console.error('Mentor error:', JSON.stringify(err.response?.data || err.message));
    res.status(500).json({ reply: "Mentor abhi busy hai, thodi der mein try karo." });
  }
});
module.exports = router;
