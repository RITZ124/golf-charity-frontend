const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  updateProfile,
} = require('../controllers/authController');

const { verifyToken } = require('../middleware/authMiddleware');

// ================= AUTH ROUTES =================
router.post('/signup', signup);
router.post('/login', login);

router.put('/update-profile/:id', verifyToken, updateProfile);

module.exports = router;