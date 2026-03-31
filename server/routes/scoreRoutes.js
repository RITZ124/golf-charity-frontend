const express = require('express');
const router = express.Router();

const {
  addScore,
  getScores,
  updateScore,
  deleteScore,
} = require('../controllers/scoreController');

const { verifyToken } = require('../middleware/authMiddleware');

// ================= SCORE ROUTES =================
router.post('/add', verifyToken, addScore);

router.get('/', verifyToken, getScores);

router.put('/:id', verifyToken, updateScore);

router.delete('/:id', verifyToken, deleteScore);

module.exports = router;