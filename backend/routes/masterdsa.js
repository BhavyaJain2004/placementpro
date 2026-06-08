const express = require('express');
const router = express.Router();

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
router.get(
  '/daily',
  verifyToken,
  verifyMasterDSA,
  async (req, res) => {
    try {
      const total = await Q.countDocuments({
        isActive: true
      });

      const dayOfYear = Math.floor(
        (
          Date.now() -
          new Date(new Date().getFullYear(), 0, 0)
        ) / 86400000
      );

      const idx = dayOfYear % total;

      const question = await Q.findOne({
        isActive: true
      })
        .skip(idx)
        .select(
          '-java_code -python_code -cpp_code -c_code -hint -approach'
        );

      res.json(question);

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);

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

module.exports = router;
