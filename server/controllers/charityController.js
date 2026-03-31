const supabase = require('../config/supabaseClient');

// ================= GET ALL CHARITIES =================
const getCharities = async (req, res) => {
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

// ================= GET FEATURED CHARITIES =================
const getFeaturedCharities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      total_featured_charities: data.length,
      charities: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SPOTLIGHT CHARITY =================
const getSpotlightCharity = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .eq('spotlight', true)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      charity: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET CHARITY BY ID =================
const getCharityById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      charity: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CREATE CHARITY =================
const createCharity = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      image_url,
      featured = false,
      spotlight = false,
      upcoming_event_title,
      upcoming_event_date,
    } = req.body;

    if (!name || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'name, description and category are required',
      });
    }

    const { data, error } = await supabase
      .from('charities')
      .insert([
        {
          name,
          description,
          category,
          image_url,
          featured,
          spotlight,
          upcoming_event_title,
          upcoming_event_date,
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

    res.status(201).json({
      success: true,
      message: 'Charity created successfully',
      charity: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE CHARITY =================
const updateCharity = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      category,
      image_url,
      featured,
      spotlight,
      upcoming_event_title,
      upcoming_event_date,
    } = req.body;

    const { data, error } = await supabase
      .from('charities')
      .update({
        name,
        description,
        category,
        image_url,
        featured,
        spotlight,
        upcoming_event_title,
        upcoming_event_date,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Charity updated successfully',
      charity: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE CHARITY =================
const deleteCharity = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('charities')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Charity deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCharities,
  getFeaturedCharities,
  getSpotlightCharity,
  getCharityById,
  createCharity,
  updateCharity,
  deleteCharity,
};