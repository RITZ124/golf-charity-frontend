const supabase = require('../config/supabaseClient');
const sendEmail = require('../utils/sendEmail');

// ================= CREATE SUBSCRIPTION =================
const createSubscription = async (req, res) => {
  try {
    const user_id = req.user.id;

    const {
      plan_type,
      amount_paid,
      donation_percentage = 10
    } = req.body;

    if (!plan_type || !amount_paid) {
      return res.status(400).json({
        success: false,
        message: 'plan_type and amount_paid are required',
      });
    }

    const numericAmount = Number(amount_paid);
    const numericDonationPercentage = Number(donation_percentage);

    if (numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount paid must be greater than 0',
      });
    }

    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'active')
      .maybeSingle();

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active subscription',
      });
    }

    const renewalDate =
      plan_type === 'monthly'
        ? new Date(new Date().setMonth(new Date().getMonth() + 1))
        : new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    const donationAmount =
      (numericAmount * numericDonationPercentage) / 100;

    const companyRevenue = numericAmount - donationAmount;

    const { data: userData } = await supabase
      .from('users')
      .select('selected_charity_id, full_name, email')
      .eq('id', user_id)
      .single();

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          user_id,
          plan_type,
          amount_paid: numericAmount,
          donation_percentage: numericDonationPercentage,
          donation_amount: donationAmount,
          company_revenue: companyRevenue,
          charity_id: userData?.selected_charity_id || null,
          renewal_date: renewalDate,
          status: 'active',
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // Save donation record automatically
    if (userData?.selected_charity_id) {
      await supabase.from('donations').insert([
        {
          user_id,
          charity_id: userData.selected_charity_id,
          subscription_id: data.id,
          amount: donationAmount,
          donation_percentage: numericDonationPercentage,
          status: 'completed',
        },
      ]);
    }

    // Send email
    if (userData?.email) {
      await sendEmail(
        userData.email,
        'Subscription Activated Successfully',
        `Hello ${userData.full_name},

Your ${plan_type} subscription has been activated successfully.

Amount Paid: ₹${numericAmount}
Donation Percentage: ${numericDonationPercentage}%
Donation Amount: ₹${donationAmount}
Platform Revenue: ₹${companyRevenue}

Thank you for supporting charities through golf.`
      );
    }

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      subscription: data,
      donation_amount: donationAmount,
      company_revenue: companyRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CANCEL SUBSCRIPTION =================
const cancelSubscription = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { subscription_id } = req.body;

    if (!subscription_id) {
      return res.status(400).json({
        success: false,
        message: 'subscription_id is required',
      });
    }

    const { data: existingSubscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscription_id)
      .eq('user_id', user_id)
      .maybeSingle();

    if (fetchError) {
      return res.status(500).json({
        success: false,
        message: fetchError.message,
      });
    }

    if (!existingSubscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('id', subscription_id)
      .eq('user_id', user_id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('full_name, email')
      .eq('id', user_id)
      .single();

    if (userData?.email) {
      await sendEmail(
        userData.email,
        'Subscription Cancelled',
        `Hello ${userData.full_name},

Your subscription has been cancelled successfully.

You can reactivate a subscription anytime from your dashboard.`
      );
    }

    res.status(200).json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SUBSCRIPTION STATUS =================
const getSubscriptionStatus = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const activeSubscription = data.find(
      (item) => item.status === 'active'
    );

    res.status(200).json({
      success: true,
      has_active_subscription: !!activeSubscription,
      active_subscription: activeSubscription || null,
      total_subscriptions: data.length,
      subscriptions: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CHECK ACTIVE SUBSCRIPTION =================
const checkActiveSubscription = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'active')
      .maybeSingle();

    if (!subscription) {
      return res.status(403).json({
        success: false,
        message: 'You need an active subscription to access this feature',
      });
    }

    req.subscription = subscription;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubscription,
  cancelSubscription,
  getSubscriptionStatus,
  checkActiveSubscription,
};