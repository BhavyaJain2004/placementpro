const express      = require('express');
const router       = express.Router();
const Test         = require('../models/Test');
const TestAttempt  = require('../models/TestAttempt');
const { verifyToken } = require('../middleware/auth');
const User         = require('../models/User');

// Middleware — test access check
const verifyTestAccess = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('hasTestAccess');
  if (!user || !user.hasTestAccess)
    return res.status(403).json({ message: 'TEST_LOCKED' });
  next();
};

// GET /api/tests — sabhi tests ki list (no questions, no access needed)
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('hasTestAccess');
    const tests = await Test.find({ isActive: true })
      .select('-questions')
      .sort({ testId: 1 });

    const attempts = await TestAttempt.find({ userId: req.user.id })
      .select('testId score percentage completedAt');

    const attemptMap = {};
    attempts.forEach(a => attemptMap[a.testId] = a);

    res.json({
      hasAccess: user.hasTestAccess || false,
      tests: tests.map(t => ({
        ...t.toObject(),
        attempted:   !!attemptMap[t.testId],
        score:       attemptMap[t.testId]?.score,
        percentage:  attemptMap[t.testId]?.percentage,
        completedAt: attemptMap[t.testId]?.completedAt
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/tests/:testId/start — test shuru karo
router.get('/:testId/start', verifyToken, verifyTestAccess, async (req, res) => {
  try {
    const test = await Test.findOne({ testId: req.params.testId, isActive: true });
    if (!test) return res.status(404).json({ message: 'Test not found' });

    const existing = await TestAttempt.findOne({
      userId: req.user.id, testId: req.params.testId
    });
    if (existing) return res.status(400).json({ message: 'ALREADY_ATTEMPTED' });

    const questions = test.questions.map((q, i) => ({
      index:      i,
      question:   q.question,
      options:    q.options,
      difficulty: q.difficulty
    }));

    res.json({
      testId:   test.testId,
      title:    test.title,
      duration: test.duration,
      totalQ:   test.totalQ,
      questions
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tests/:testId/submit — answers submit karo
router.post('/:testId/submit', verifyToken, verifyTestAccess, async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;

    const test = await Test.findOne({ testId: req.params.testId });
    if (!test) return res.status(404).json({ message: 'Test not found' });

    const existing = await TestAttempt.findOne({
      userId: req.user.id, testId: req.params.testId
    });
    if (existing) return res.status(400).json({ message: 'ALREADY_ATTEMPTED' });

    let score = 0;
    const results = test.questions.map((q, i) => {
      const isCorrect = answers[i] === q.correct;
      if (isCorrect) score++;
      return {
        question:    q.question,
        options:     q.options,
        userAnswer:  answers[i],
        correct:     q.correct,
        isCorrect,
        explanation: q.explanation,
        difficulty:  q.difficulty
      };
    });

    const percentage = Math.round((score / test.questions.length) * 100);

    await TestAttempt.create({
      userId:    req.user.id,
      email:     req.user.email,
      testId:    req.params.testId,
      testTitle: test.title,
      answers,
      score,
      total:     test.questions.length,
      percentage,
      timeTaken: timeTaken || 0
    });

    res.json({
      score,
      total:      test.questions.length,
      percentage,
      timeTaken,
      results,
      message: percentage >= 70 ? '🔥 Great job!' : percentage >= 50 ? '👍 Good effort!' : '💪 Keep practicing!'
    });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'ALREADY_ATTEMPTED' });
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
