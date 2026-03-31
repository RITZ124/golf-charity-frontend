const supabase = require('../config/supabaseClient');

// ================= DASHBOARD STATS =================
const getDashboardStats = async (req, res) => {
  try {
    const { data: users = [] } = await supabase
      .from('users')
      .select('id');

    const { data: subscriptions = [] } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active');

    const { data: donations = [] } = await supabase
      .from('donations')
      .select('*');

    const { data: proofs = [] } = await supabase
      .from('winner_proofs')
      .select('*')
      .eq('status', 'pending');

    const { data: draws = [] } = await supabase
      .from('monthly_draws')
      .select('*');

    const totalRevenue = subscriptions.reduce(
      (sum, item) => sum + Number(item.amount_paid || 0),
      0
    );

    const totalDonations = donations.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    res.status(200).json({
      success: true,
      stats: {
        totalUsers: users.length,
        activeSubscriptions: subscriptions.length,
        totalDonations,
        monthlyRevenue: totalRevenue,
        pendingProofApprovals: proofs.length,
        drawHistory: draws.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL USERS =================
const getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, full_name, email, phone, role, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      total_users: data.length,
      users: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL SUBSCRIPTIONS =================
const getAllSubscriptions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
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

// ================= UPDATE USER ROLE =================
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be either user or admin',
      });
    }

    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', id)
      .select('id, full_name, email, role')
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL CHARITIES =================
const getAllCharities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      total_charities: data.length,
      charities: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL DRAWS =================
const getAllDraws = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('monthly_draws')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      total_draws: data.length,
      draws: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET PENDING PROOFS =================
const getPendingProofs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('winner_proofs')
      .select('*')
      .eq('status', 'pending')
      .order('uploaded_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      total_pending_proofs: data.length,
      proofs: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Add these functions inside adminController.js before module.exports

// ================= GET CONTENT =================
const getContent = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      content: data || {
        heroTitle: '',
        heroSubtitle: '',
        aboutText: '',
        contactEmail: '',
        bannerImage: ''
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= SAVE CONTENT =================
const saveContent = async (req, res) => {
  try {
    const {
      heroTitle,
      heroSubtitle,
      aboutText,
      contactEmail,
      bannerImage
    } = req.body;

    const { data: existingContent } = await supabase
      .from('site_content')
      .select('*')
      .limit(1)
      .maybeSingle();

    let response;

    if (existingContent) {
      response = await supabase
        .from('site_content')
        .update({
          heroTitle,
          heroSubtitle,
          aboutText,
          contactEmail,
          bannerImage
        })
        .eq('id', existingContent.id)
        .select()
        .single();
    } else {
      response = await supabase
        .from('site_content')
        .insert([
          {
            heroTitle,
            heroSubtitle,
            aboutText,
            contactEmail,
            bannerImage
          }
        ])
        .select()
        .single();
    }

    if (response.error) {
      return res.status(500).json({
        success: false,
        message: response.error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content saved successfully',
      content: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= DELETE CONTENT =================
const deleteContent = async (req, res) => {
  try {
    const { error } = await supabase
      .from('site_content')
      .delete()
      .neq('id', 0);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllSubscriptions,
  getAllCharities,
  getAllDraws,
  getPendingProofs,
  updateUserRole,
  getContent,
  saveContent,
  deleteContent,
};