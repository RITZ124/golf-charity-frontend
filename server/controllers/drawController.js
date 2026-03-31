const supabase = require('../config/supabaseClient');
const sendEmail = require('../utils/sendEmail');

// ================= RUN MONTHLY DRAW =================
const runMonthlyDraw = async (req, res) => {
  try {
    const {
      mode = 'random',
      custom_numbers = [],
      publish_results = true
    } = req.body;

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const { data: existingDraw } = await supabase
      .from('monthly_draws')
      .select('*')
      .eq('month', currentMonth)
      .eq('year', currentYear)
      .maybeSingle();

    if (existingDraw) {
      return res.status(400).json({
        success: false,
        message: 'Monthly draw already completed for this month',
      });
    }

    let generatedNumbers = [];

    // ================= RANDOM MODE =================
    if (mode === 'random') {
      while (generatedNumbers.length < 5) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;

        if (!generatedNumbers.includes(randomNumber)) {
          generatedNumbers.push(randomNumber);
        }
      }
    }

    // ================= ALGORITHMIC / CUSTOM MODE =================
    if (mode === 'algorithmic') {
      if (!Array.isArray(custom_numbers) || custom_numbers.length !== 5) {
        return res.status(400).json({
          success: false,
          message: 'Algorithmic mode requires exactly 5 custom numbers',
        });
      }

      generatedNumbers = custom_numbers.map(Number);

      const invalidNumber = generatedNumbers.find(
        (num) => isNaN(num) || num < 1 || num > 45
      );

      if (invalidNumber) {
        return res.status(400).json({
          success: false,
          message: 'All draw numbers must be between 1 and 45',
        });
      }

      const uniqueNumbers = [...new Set(generatedNumbers)];

      if (uniqueNumbers.length !== 5) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate numbers are not allowed',
        });
      }
    }

    const { data: activeSubscriptions, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active');

    if (subscriptionError) {
      return res.status(500).json({
        success: false,
        message: subscriptionError.message,
      });
    }

    const activeUserIds = activeSubscriptions.map((sub) => sub.user_id);

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .in('id', activeUserIds);

    if (usersError) {
      return res.status(500).json({
        success: false,
        message: usersError.message,
      });
    }

    const totalPrizePool = activeSubscriptions.reduce(
      (sum, item) => sum + Number(item.amount_paid || 0),
      0
    );

    // ================= PRIZE SPLIT LOGIC =================
    const rolloverAmount = totalPrizePool * 0.1;
    const jackpotAmount = totalPrizePool - rolloverAmount;

    const fiveMatchPool = jackpotAmount * 0.4;
    const fourMatchPool = jackpotAmount * 0.35;
    const threeMatchPool = jackpotAmount * 0.25;

    const { data: drawData, error: drawError } = await supabase
      .from('monthly_draws')
      .insert([
        {
          month: currentMonth,
          year: currentYear,
          draw_type: 'monthly',
          draw_mode: mode,
          winning_numbers: generatedNumbers.join(','),
          total_prize_pool: totalPrizePool,
          rollover_amount: rolloverAmount,
          jackpot_amount: jackpotAmount,
          published: publish_results,
          status: 'completed',
        },
      ])
      .select()
      .single();

    if (drawError) {
      return res.status(500).json({
        success: false,
        message: drawError.message,
      });
    }

    const winners = [];

    let totalFiveMatchWinners = 0;
    let totalFourMatchWinners = 0;
    let totalThreeMatchWinners = 0;

    const drawResults = [];

    for (const user of users) {
      const { data: scores } = await supabase
        .from('golf_scores')
        .select('*')
        .eq('user_id', user.id);

      const scoreNumbers = Array.isArray(scores)
        ? scores.map((item) => Number(item.score))
        : [];

      const matchedNumbers = scoreNumbers.filter((score) =>
        generatedNumbers.includes(score)
      );

      const matchCount = matchedNumbers.length;

      if (matchCount === 5) totalFiveMatchWinners++;
      if (matchCount === 4) totalFourMatchWinners++;
      if (matchCount === 3) totalThreeMatchWinners++;

      drawResults.push({
        user,
        scoreNumbers,
        matchedNumbers,
        matchCount,
      });
    }

    for (const result of drawResults) {
      const { user, scoreNumbers, matchedNumbers, matchCount } = result;

      let prizeType = null;
      let winningsAmount = 0;

      if (matchCount === 5) {
        prizeType = '5-match';
        winningsAmount =
          totalFiveMatchWinners > 0
            ? fiveMatchPool / totalFiveMatchWinners
            : 0;
      } else if (matchCount === 4) {
        prizeType = '4-match';
        winningsAmount =
          totalFourMatchWinners > 0
            ? fourMatchPool / totalFourMatchWinners
            : 0;
      } else if (matchCount === 3) {
        prizeType = '3-match';
        winningsAmount =
          totalThreeMatchWinners > 0
            ? threeMatchPool / totalThreeMatchWinners
            : 0;
      }

      const winningStatus = prizeType ? 'won' : 'lost';

      const { data: drawEntryData, error: drawEntryError } = await supabase
        .from('draw_entries')
        .insert([
          {
            user_id: user.id,
            draw_id: drawData.id,
            selected_numbers: scoreNumbers.join(','),
            matched_numbers: matchedNumbers.join(','),
            match_count: matchCount,
            prize_type: prizeType,
            winnings_amount: winningsAmount,
            payment_status: 'pending',
            winning_status: winningStatus,
          },
        ])
        .select()
        .single();

      if (drawEntryError) {
        console.log(drawEntryError);
        continue;
      }

      // ================= WINNER RECORD =================
      if (prizeType) {
        winners.push({
          user_id: user.id,
          name: user.full_name,
          email: user.email,
          match_count: matchCount,
          matched_numbers: matchedNumbers,
          prize_type: prizeType,
          winnings_amount: winningsAmount,
        });

        await supabase.from('winner_proofs').insert([
          {
            user_id: user.id,
            draw_entry_id: drawEntryData.id,
            image_url: '',
            status: 'pending',
            payout_status: 'pending',
          },
        ]);

        await sendEmail(
          user.email,
          'Congratulations! You Won the Monthly Draw',
          `Hello ${user.full_name},

Congratulations! You have won in this month's golf draw.

Winning Numbers: ${generatedNumbers.join(', ')}
Matched Numbers: ${matchedNumbers.join(', ')}
Prize Type: ${prizeType}
Prize Amount: ₹${winningsAmount.toFixed(2)}

Please login to your account and upload your proof documents.`
        );
      } else {
        await sendEmail(
          user.email,
          'Monthly Draw Results',
          `Hello ${user.full_name},

This month's winning numbers are:

${generatedNumbers.join(', ')}

Unfortunately, you did not win this time.

Thank you for participating and supporting charities.`
        );
      }
    }

    res.status(200).json({
      success: true,
      message: 'Monthly draw completed successfully',
      draw: drawData,
      winning_numbers: generatedNumbers,
      draw_mode: mode,
      total_prize_pool: totalPrizePool,
      rollover_amount: rolloverAmount,
      jackpot_amount: jackpotAmount,
      five_match_pool: fiveMatchPool,
      four_match_pool: fourMatchPool,
      three_match_pool: threeMatchPool,
      winners_count: winners.length,
      winners,
    });
  } catch (error) {
    console.log('DRAW ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL DRAW RESULTS =================
const getAllDrawResults = async (req, res) => {
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

// ================= GET USER DRAW ENTRIES =================
const getUserDrawEntries = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from('draw_entries')
      .select('*')
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
      total_entries: data.length,
      entries: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  runMonthlyDraw,
  getAllDrawResults,
  getUserDrawEntries,
};