// backend/routes/masterdsa.js mein add karo, module.exports se PEHLE
const QuestionSolve = require('../models/QuestionSolve');

// Mark a question as solved
router.post('/question/:id/solve', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    await QuestionSolve.findOneAndUpdate(
      { userId: req.user.id, questionId: req.params.id },
      { userId: req.user.id, questionId: req.params.id, solvedAt: new Date() },
      { upsert: true }
    );
    res.json({ message: 'Marked solved!' });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

// Get all solved question IDs for current user (for showing ticks)
router.get('/solved-ids', verifyToken, verifyMasterDSA, async (req, res) => {
  try {
    const solved = await QuestionSolve.find({ userId: req.user.id }).select('questionId');
    res.json({ ids: solved.map(s => s.questionId.toString()) });
  } catch(err) { res.status(500).json({ message: err.message }); }
});
