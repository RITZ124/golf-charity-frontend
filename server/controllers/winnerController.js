const supabase = require('../config/supabaseClient');
const sendEmail = require('../utils/sendEmail');

// ================= UPLOAD PROOF =================
const uploadProof = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { draw_entry_id, image_url } = req.body;

    if (!draw_entry_id || !image_url) {
      return res.status(400).json({
        success: false,
        message: 'draw_entry_id and image_url are required',
      });
    }

    const { data: existingEntry, error: entryError } = await supabase
      .from('draw_entries')
      .select('*')
      .eq('id', draw_entry_id)
      .eq('user_id', user_id)
      .maybeSingle();

    if (entryError) {
      return res.status(500).json({
        success: false,
        message: entryError.message,
      });
    }

    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        message: 'Draw entry not found',
      });
    }

    if (existingEntry.winning_status !== 'won') {
      return res.status(400).json({
        success: false,
        message: 'You can only upload proof for winning entries',
      });
    }

    const { data: existingProof } = await supabase
      .from('winner_proofs')
      .select('*')
      .eq('draw_entry_id', draw_entry_id)
      .maybeSingle();

    if (existingProof) {
      return res.status(400).json({
        success: false,
        message: 'Proof already uploaded for this draw entry',
      });
    }

    const { data, error } = await supabase
      .from('winner_proofs')
      .insert([
        {
          user_id,
          draw_entry_id,
          image_url,
          status: 'pending',
          payout_status: 'pending',
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
      message: 'Proof uploaded successfully',
      proof: data,
    });
  } catch (error) {
    console.log('UPLOAD PROOF ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET USER WINNINGS =================
const getUserWinnings = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from('winner_proofs')
      .select(`
        *,
        draw_entries (
          id,
          prize_type,
          winnings_amount,
          matched_numbers,
          match_count
        )
      `)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      total_winnings: data.length,
      winnings: data,
    });
  } catch (error) {
    console.log('GET USER WINNINGS ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL WINNERS =================
const getAllWinners = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('winner_proofs')
      .select(`
        *,
        users (
          full_name,
          email
        ),
        draw_entries (
          prize_type,
          winnings_amount,
          match_count
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      total_winners: data.length,
      winners: data,
    });
  } catch (error) {
    console.log('GET ALL WINNERS ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= APPROVE PROOF =================
const approveProof = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('winner_proofs')
      .update({
        status: 'approved',
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

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Proof not found',
      });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user_id)
      .single();

    if (userData) {
      await sendEmail(
        userData.email,
        'Winner Proof Approved',
        `Hello ${userData.full_name},

Your uploaded proof has been approved successfully.

Your payout request is now under review and will be marked as paid soon.

Thank you for participating in the Golf Charity Platform.`
      );
    }

    res.status(200).json({
      success: true,
      message: 'Proof approved successfully',
      proof: data,
    });
  } catch (error) {
    console.log('APPROVE ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= REJECT PROOF =================
const rejectProof = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('winner_proofs')
      .update({
        status: 'rejected',
        payout_status: 'rejected',
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

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Proof not found',
      });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user_id)
      .single();

    if (userData) {
      await sendEmail(
        userData.email,
        'Winner Proof Rejected',
        `Hello ${userData.full_name},

Unfortunately, your uploaded proof has been rejected.

Please login to your account and upload a valid proof document to continue your payout process.`
      );
    }

    res.status(200).json({
      success: true,
      message: 'Proof rejected successfully',
      proof: data,
    });
  } catch (error) {
    console.log('REJECT ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MARK PAID =================
const markPaid = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('winner_proofs')
      .update({
        payout_status: 'paid',
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

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Proof not found',
      });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user_id)
      .single();

    const { data: drawEntry } = await supabase
      .from('draw_entries')
      .select('*')
      .eq('id', data.draw_entry_id)
      .single();

    if (userData && drawEntry) {
      await sendEmail(
        userData.email,
        'Payout Completed Successfully',
        `Hello ${userData.full_name},

Your winnings have now been marked as paid successfully.

Prize Type: ${drawEntry.prize_type}
Prize Amount: ₹${drawEntry.winnings_amount}

Thank you for participating in the Golf Charity Platform.`
      );
    }

    res.status(200).json({
      success: true,
      message: 'Payout marked as paid successfully',
      proof: data,
    });
  } catch (error) {
    console.log('MARK PAID ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadProof,
  getUserWinnings,
  getAllWinners,
  approveProof,
  rejectProof,
  markPaid,
};