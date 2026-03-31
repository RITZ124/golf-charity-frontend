const supabase = require('../config/supabaseClient');

// ================= ADD SCORE =================
const addScore = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { score, score_date } = req.body;

    if (!score || !score_date) {
      return res.status(400).json({
        success: false,
        message: 'score and score_date are required',
      });
    }

    const numericScore = Number(score);

    if (isNaN(numericScore) || numericScore < 1 || numericScore > 45) {
      return res.status(400).json({
        success: false,
        message: 'Score must be between 1 and 45',
      });
    }

    const enteredDate = new Date(score_date);
    const today = new Date();

    if (enteredDate > today) {
      return res.status(400).json({
        success: false,
        message: 'Score date cannot be in the future',
      });
    }

    const { data: existingScores, error: fetchError } = await supabase
      .from('golf_scores')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: true });

    if (fetchError) {
      return res.status(500).json({
        success: false,
        message: fetchError.message,
      });
    }

    // Keep only latest 5 scores
    if (existingScores.length >= 5) {
      const oldestScore = existingScores[0];

      const { error: deleteError } = await supabase
        .from('golf_scores')
        .delete()
        .eq('id', oldestScore.id);

      if (deleteError) {
        return res.status(500).json({
          success: false,
          message: deleteError.message,
        });
      }
    }

    const { data, error } = await supabase
      .from('golf_scores')
      .insert([
        {
          user_id,
          score: numericScore,
          score_date,
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

    const { data: updatedScores, error: updatedError } = await supabase
      .from('golf_scores')
      .select('*')
      .eq('user_id', user_id)
      .order('score_date', { ascending: false });

    if (updatedError) {
      return res.status(500).json({
        success: false,
        message: updatedError.message,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Score added successfully',
      latest_added_score: data,
      total_scores: updatedScores.length,
      scores: updatedScores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SCORES =================
const getScores = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from('golf_scores')
      .select('*')
      .eq('user_id', user_id)
      .order('score_date', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      total_scores: data.length,
      scores: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE SCORE =================
const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, score_date } = req.body;

    const numericScore = Number(score);

    if (isNaN(numericScore) || numericScore < 1 || numericScore > 45) {
      return res.status(400).json({
        success: false,
        message: 'Score must be between 1 and 45',
      });
    }

    const { data, error } = await supabase
      .from('golf_scores')
      .update({
        score: numericScore,
        score_date,
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
      message: 'Score updated successfully',
      score: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE SCORE =================
const deleteScore = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('golf_scores')
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
      message: 'Score deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addScore,
  getScores,
  updateScore,
  deleteScore,
};