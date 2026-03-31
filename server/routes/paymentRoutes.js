const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const { verifyToken } = require('../middleware/authMiddleware');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', verifyToken, async (req, res) => {
  try {
    const { planType } = req.body;

    if (!planType) {
      return res.status(400).json({
        success: false,
        message: 'Plan type is required',
      });
    }

    if (!['monthly', 'yearly'].includes(planType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan type',
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name:
                planType === 'monthly'
                  ? 'Monthly Golf Charity Plan'
                  : 'Yearly Golf Charity Plan'
            },
            unit_amount: planType === 'monthly' ? 100000 : 1000000
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`
    });

    res.status(200).json({
      success: true,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;