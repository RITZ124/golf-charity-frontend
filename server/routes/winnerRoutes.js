const express = require('express');
const router = express.Router();

const {
  uploadProof,
  getUserWinnings,
  getAllWinners,
  approveProof,
  rejectProof,
  markPaid
} = require('../controllers/winnerController');

const {
  verifyToken,
  verifyAdmin
} = require('../middleware/authMiddleware');

// ================= USER ROUTES =================
router.post('/upload-proof', verifyToken, uploadProof);

router.get('/my-winnings', verifyToken, getUserWinnings);

// ================= ADMIN ROUTES =================
router.get('/all', verifyToken, verifyAdmin, getAllWinners);

router.put('/approve/:id', verifyToken, verifyAdmin, approveProof);

router.put('/reject/:id', verifyToken, verifyAdmin, rejectProof);

router.put('/mark-paid/:id', verifyToken, verifyAdmin, markPaid);

module.exports = router;