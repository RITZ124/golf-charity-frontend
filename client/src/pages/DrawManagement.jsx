// DrawManagement.jsx

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaPlayCircle,
  FaDice,
  FaTrophy,
  FaMoneyBillWave,
  FaRobot,
  FaRandom
} from 'react-icons/fa';

function DrawManagement() {
  const [drawResult, setDrawResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drawMode, setDrawMode] = useState('random');
  const token = localStorage.getItem('token');

  const handleRunSimulation = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:5000/api/draws/run',
        {
          draw_mode: drawMode
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDrawResult(res.data);
      toast.success('Monthly draw completed successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to run draw');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-yellow-400 text-sm mb-4">
            Draw Management
          </p>
          <h1 className="text-5xl font-black mb-4">
            Monthly Draw Simulation
          </h1>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-10 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex gap-4">
              <button
                onClick={() => setDrawMode('random')}
                className={`px-6 py-4 rounded-2xl flex items-center gap-3 ${
                  drawMode === 'random'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    : 'bg-white/10'
                }`}
              >
                <FaRandom />
                Random Mode
              </button>

              <button
                onClick={() => setDrawMode('algorithmic')}
                className={`px-6 py-4 rounded-2xl flex items-center gap-3 ${
                  drawMode === 'algorithmic'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600'
                    : 'bg-white/10'
                }`}
              >
                <FaRobot />
                Algorithmic Mode
              </button>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 font-bold flex items-center gap-3"
            >
              <FaPlayCircle />
              {loading ? 'Running Draw...' : 'Run Draw'}
            </button>
          </div>
        </div>

        {drawResult && (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
                <FaDice className="text-cyan-400 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Winning Numbers</h3>
                <p className="text-2xl font-black">
                  {drawResult.winning_numbers?.join(', ')}
                </p>
              </div>

              <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
                <FaTrophy className="text-yellow-400 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Winners</h3>
                <p className="text-4xl font-black">
                  {drawResult.winners_count}
                </p>
              </div>

              <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
                <FaMoneyBillWave className="text-green-400 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Prize Pool</h3>
                <p className="text-4xl font-black">
                  ₹{drawResult.total_prize_pool}
                </p>
              </div>

              <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
                <FaMoneyBillWave className="text-purple-400 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Jackpot</h3>
                <p className="text-4xl font-black">
                  ₹{drawResult.jackpot_amount}
                </p>
              </div>
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
              <h2 className="text-3xl font-bold mb-8">Winner List</h2>

              <div className="space-y-4">
                {drawResult.winners?.map((winner, index) => (
                  <div
                    key={index}
                    className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold">{winner.name}</h3>
                      <p className="text-gray-400">{winner.email}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300">
                        {winner.prize_type}
                      </span>

                      <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300">
                        Matches: {winner.match_count}
                      </span>

                      <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-300">
                        ₹{winner.winnings_amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DrawManagement;