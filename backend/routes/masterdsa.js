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
// backend/routes/masterdsa.js mein PURANA /mentor/chat block POORA REPLACE karo isse
const axios2 = require('axios');
const MentorChat = require('../models/MentorChat');

router.post('/mentor/chat', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) return res.status(500).json({ reply: "Mentor setup incomplete." });
    const { message } = req.body;

    // Load or create chat record
    let chat = await MentorChat.findOne({ userId: req.user.id });
    if (!chat) chat = await MentorChat.create({ userId: req.user.id, messages: [] });

    // Get list of topics+counts AND actual question titles so mentor never invents names
    const topicCounts = await Q.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$topic', count: { $sum: 1 } } }
    ]);
    const topicList = topicCounts.map(t => `${t._id} (${t.count} questions)`).join(', ');

    const sampleQs = await Q.find({ isActive: true }).select('topic title difficulty order').sort({ globalOrder: 1 }).limit(60).lean();
    const qListByTopic = {};
    sampleQs.forEach(q => {
      if (!qListByTopic[q.topic]) qListByTopic[q.topic] = [];
      qListByTopic[q.topic].push(`${q.order}. ${q.title} (${q.difficulty})`);
    });
    const qListText = Object.entries(qListByTopic).map(([topic, qs]) => `${topic}: ${qs.join(', ')}`).join('\n');

    // Get user's solved count for context
    const DailySolve = require('../models/DailySolve');
    const solvedCount = await DailySolve.countDocuments({ userId: req.user.id });

    const sysPrompt = `You are the DSA Mentor inside PlacementPro's Master DSA platform (NOT LeetCode, NOT any external site).
Topics available on THIS platform right now: ${topicList}.
EXACT question titles that exist on this platform (use ONLY these names, never invent or use LeetCode names not in this list):
${qListText}
The student has solved ${solvedCount} questions so far on this platform.
RULES:
- ONLY recommend question titles EXACTLY as they appear in the list above. Never invent a question name. If unsure a question exists, just recommend the topic generally instead of naming one.
- Never mention LeetCode or external sites.
- If the student asks something unrelated to DSA, placements, or this platform, politely refuse and redirect: say you're a DSA mentor and can only help with DSA/placement prep.
- If they mention what they know (e.g. "Arrays aata hai"), remember it, acknowledge it, and suggest the next logical topic from the list.
- Keep replies short (3-5 lines), encouraging, Hinglish (Hindi+English mix).
- Explain concepts briefly when asked (3-4 lines), like a real mentor.
- When pointing to a question, tell them to open the Practice page, select that topic, and find that exact question title in the list.`;

    // Build message history from DB (memory!)
    const history = chat.messages.slice(-12).map(m => ({ role: m.role==='assistant'?'assistant':'user', content: m.text }));
    const messages = [{ role: 'system', content: sysPrompt }, ...history, { role: 'user', content: message }];

    const resp = await axios2.post(
      'https://api.groq.com/openai/v1/chat/completions',
      { model: 'llama-3.3-70b-versatile', messages, max_tokens: 300 },
      { headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' }, timeout: 15000 }
    );

    const reply = resp.data?.choices?.[0]?.message?.content || "Samajh nahi paya, dobara try karo.";

    // Save both messages to memory
    chat.messages.push({ role: 'user', text: message });
    chat.messages.push({ role: 'assistant', text: reply });
    if (chat.messages.length > 60) chat.messages = chat.messages.slice(-60); // cap history size
    await chat.save();

    res.json({ reply });
  } catch(err) {
    console.error('Mentor error:', JSON.stringify(err.response?.data || err.message));
    res.status(500).json({ reply: "Mentor abhi busy hai, thodi der mein try karo." });
  }
});

// GET previous chat history (for loading on page open)
router.get('/mentor/history', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    const chat = await MentorChat.findOne({ userId: req.user.id });
    res.json({ messages: chat?.messages || [] });
  } catch(err) { res.status(500).json({ message: err.message }); }
});
// backend/routes/masterdsa.js mein add karo, /mentor/history route ke baad

router.get('/mentor/proactive', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    const DailySolve = require('../models/DailySolve');
    const chat = await MentorChat.findOne({ userId: req.user.id });

    // Get last solve
    const lastSolve = await DailySolve.findOne({ userId: req.user.id }).sort({ date: -1 });
    const totalSolved = await DailySolve.countDocuments({ userId: req.user.id });

    // Check if we already sent a proactive nudge recently (avoid spam)
    const now = new Date();
    if (chat?.lastNudgeAt && (now - chat.lastNudgeAt) < 3600000) {
      return res.json({ message: null }); // already nudged in last hour
    }

    let message = null;
    if (totalSolved === 0) {
      message = "Hey! Abhi tak koi question solve nahi kiya hai. Arrays & Strings se shuru karte hain? Practice page khol ke first topic try karo 💪";
    } else if (lastSolve) {
      const daysSince = Math.floor((now - new Date(lastSolve.date)) / 86400000);
      if (daysSince === 0) {
        message = `Maine dekha aaj aapne practice ki hai 🎉 Total ${totalSolved} questions solve ho gaye. Ab next topic try karo, momentum maintain rakho!`;
      } else if (daysSince >= 2) {
        message = `${daysSince} din se aaye nahi the! Tension nahi, chalo wapas track pe aate hain. Total ${totalSolved} solved hain abhi tak — aaj ek aur karte hain?`;
      }
    }

    if (message) {
      if (!chat) await MentorChat.create({ userId: req.user.id, messages: [{role:'assistant', text: message}], lastNudgeAt: now });
      else { chat.messages.push({role:'assistant', text: message}); chat.lastNudgeAt = now; await chat.save(); }
    }

    res.json({ message });
  } catch(err) { res.status(500).json({ message: null }); }
});

module.exports = router;
