const express = require('express');
const router = express.Router();

const sendEmail = require('../utils/sendEmail');
const supabase = require('../config/supabaseClient');

const {
  createSubscription,
  cancelSubscription,
  getSubscriptionStatus
} = require('../controllers/subscriptionController');

const {
  verifyToken,
  verifyAdmin
} = require('../middleware/authMiddleware');

// ================= SUBSCRIPTION ROUTES =================
router.post('/create', verifyToken, createSubscription);

router.post('/cancel', verifyToken, cancelSubscription);

router.get('/status', verifyToken, getSubscriptionStatus);

router.post('/save', verifyToken, async (req, res) => {
  try {
    const {
      user_id,
      plan_type,
      amount_paid,
      donation_percentage = 10
    } = req.body;

    if (!user_id || !plan_type || !amount_paid) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          user_id,
          plan_type,
          amount_paid,
          status: 'active'
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single();

    if (!userError && userData?.email) {
      await sendEmail(
        userData.email,
        'Subscription Activated',
        `Hello ${userData.full_name},

Your ${plan_type} subscription has been activated successfully.

Amount Paid: ₹${amount_paid}
Donation Percentage: ${donation_percentage}%

Thank you for supporting charities through golf.`
      );
    }

    res.status(201).json({
      success: true,
      message: 'Subscription saved successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;