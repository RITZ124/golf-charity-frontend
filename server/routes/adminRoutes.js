const express = require('express');
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  getAllSubscriptions,
  getAllCharities,
  getAllDraws,
  getPendingProofs,
  updateUserRole,
  getContent,
  saveContent,
  deleteContent
} = require('../controllers/adminController');

const {
  verifyToken,
  verifyAdmin
} = require('../middleware/authMiddleware');

// ================= ADMIN ROUTES =================
router.get('/dashboard-stats', verifyToken, verifyAdmin, getDashboardStats);

router.get('/users', verifyToken, verifyAdmin, getAllUsers);

router.get('/subscriptions', verifyToken, verifyAdmin, getAllSubscriptions);

router.get('/charities', verifyToken, verifyAdmin, getAllCharities);

router.get('/draws', verifyToken, verifyAdmin, getAllDraws);

router.get('/pending-proofs', verifyToken, verifyAdmin, getPendingProofs);

router.put('/users/:id', verifyToken, verifyAdmin, updateUserRole);

router.get('/content', verifyToken, verifyAdmin, getContent);

router.post('/content', verifyToken, verifyAdmin, saveContent);

router.delete('/content', verifyToken, verifyAdmin, deleteContent);

module.exports = router;