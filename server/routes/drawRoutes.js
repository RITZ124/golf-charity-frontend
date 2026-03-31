const express = require('express');
const router = express.Router();

const {
  runMonthlyDraw,
  getAllDrawResults,
  getUserDrawEntries,
} = require('../controllers/drawController');

const {
  verifyToken,
  verifyAdmin
} = require('../middleware/authMiddleware');

// ================= DRAW ROUTES =================
router.post('/run', verifyToken, verifyAdmin, runMonthlyDraw);

router.get('/all', verifyToken, verifyAdmin, getAllDrawResults);

router.get('/my-entries', verifyToken, getUserDrawEntries);

module.exports = router;