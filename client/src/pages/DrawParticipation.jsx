// DrawParticipation.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrophy, FaDice, FaAward } from 'react-icons/fa';

function DrawParticipation() {
  const [entries, setEntries] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchEntries();
  }, []);

  // Replace fetchEntries in DrawParticipation.jsx

const fetchEntries = async () => {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.get(
      `https://golf-charity-frontend-r9tw.onrender.com/api/draws/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setEntries(res.data.entries || []);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-yellow-400 text-sm mb-4">
            Monthly Draws
          </p>
          <h1 className="text-5xl font-black mb-4">Draw Participation</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
            <FaDice className="text-cyan-400 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Total Entries</h3>
            <p className="text-5xl font-black">{entries.length}</p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
            <FaTrophy className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Winning Entries</h3>
            <p className="text-5xl font-black">
              {entries.filter((entry) => entry.prize_type).length}
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
            <FaAward className="text-green-400 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Best Match</h3>
            <p className="text-5xl font-black">
              {entries.length > 0
                ? Math.max(...entries.map((entry) => entry.match_count || 0))
                : 0}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-6">
                <FaTrophy className="text-white text-2xl" />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Match Count: {entry.match_count}
              </h2>

              <p className="text-gray-400 mb-3">
                Prize Type: {entry.prize_type || 'No Prize'}
              </p>

              <p className="text-gray-400">
                Prize Amount: ₹{entry.prize_amount || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrawParticipation;