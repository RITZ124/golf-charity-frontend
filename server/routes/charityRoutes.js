const express = require('express');
const router = express.Router();

const {
  getCharities,
  getFeaturedCharities,
  getSpotlightCharity,
  getCharityById,
  createCharity,
  updateCharity,
  deleteCharity
} = require('../controllers/charityController');

const {
  verifyToken,
  verifyAdmin
} = require('../middleware/authMiddleware');

// ================= PUBLIC ROUTES =================
router.get('/', getCharities);

router.get('/featured/all', getFeaturedCharities);

router.get('/spotlight/current', getSpotlightCharity);

router.get('/:id', getCharityById);

router.get('/featured', getFeaturedCharities);
router.get('/spotlight', getSpotlightCharity);

// ================= ADMIN ROUTES =================
router.post('/', verifyToken, verifyAdmin, createCharity);

router.put('/:id', verifyToken, verifyAdmin, updateCharity);

router.delete('/:id', verifyToken, verifyAdmin, deleteCharity);

module.exports = router;