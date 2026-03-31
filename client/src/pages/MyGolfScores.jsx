// MyGolfScores.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaGolfBall,
  FaPlus,
  FaChartLine,
  FaCalendarAlt
} from 'react-icons/fa';

function MyGolfScores() {
  const [scores, setScores] = useState([]);
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchScores();
  }, []);

  // Replace fetchScores in MyGolfScores.jsx

const fetchScores = async () => {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.get(
      'https://golf-charity-frontend-r9tw.onrender.com/api/scores',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setScores(res.data.scores || []);
    localStorage.setItem(
      'subscriptions',
      JSON.stringify(
        JSON.parse(localStorage.getItem('subscriptions')) || []
      )
    );
  } catch (error) {
    toast.error('Failed to load scores');
  }
};

  // Replace handleAddScore in MyGolfScores.jsx

const handleAddScore = async () => {
  if (!score) {
    return toast.error('Please enter a score');
  }

  try {
    setLoading(true);

    const token = localStorage.getItem('token');

    const res = await axios.post(
      'https://golf-charity-frontend-r9tw.onrender.com/api/scores/add',
      {
        score: Number(score),
        score_date: new Date().toISOString().split('T')[0]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setScores(res.data.scores || []);
    toast.success('Score added successfully');
    setScore('');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add score');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Performance Center
          </p>
          <h1 className="text-5xl font-black mb-4">My Golf Scores</h1>
          <p className="text-gray-400 text-lg">
            Track your recent golf scores and improve your performance over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaPlus className="text-cyan-400 text-2xl" />
              <h2 className="text-2xl font-bold">Add New Score</h2>
            </div>

            <input
              type="number"
              placeholder="Enter golf score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-cyan-400 mb-6"
            />

            <button
              onClick={handleAddScore}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:scale-[1.02] transition-all"
            >
              {loading ? 'Adding Score...' : 'Add Score'}
            </button>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
              <div className="flex items-center gap-3 mb-4">
                <FaGolfBall className="text-green-400 text-2xl" />
                <h3 className="text-xl font-bold">Total Scores</h3>
              </div>
              <p className="text-5xl font-black">{scores.length}</p>
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
              <div className="flex items-center gap-3 mb-4">
                <FaChartLine className="text-yellow-400 text-2xl" />
                <h3 className="text-xl font-bold">Latest Score</h3>
              </div>
              <p className="text-5xl font-black">
                {scores[0]?.score || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {scores.map((item) => (
            <div
              key={item.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6 hover:scale-[1.02] transition-all"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <FaGolfBall className="text-white text-xl" />
                </div>

                <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                  Score Entry
                </span>
              </div>

              <h2 className="text-4xl font-black mb-4">{item.score}</h2>

              <div className="flex items-center gap-3 text-gray-400">
                <FaCalendarAlt />
                <span>{item.score_date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyGolfScores;