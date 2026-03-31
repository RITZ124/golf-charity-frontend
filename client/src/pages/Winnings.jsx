

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaTrophy,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

function Winnings() {
  const [proofs, setProofs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchWinnings();
  }, []);

  

const fetchWinnings = async () => {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.get(
      `https://golf-charity-frontend-r9tw.onrender.com/api/winners/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setProofs(res.data.proofs || []);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-yellow-400 text-sm mb-4">
            Reward Center
          </p>
          <h1 className="text-5xl font-black mb-4">My Winnings</h1>
          <p className="text-gray-400 text-lg">
            Track your proof approvals, payouts and reward history.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {proofs.map((proof) => (
            <div
              key={proof.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6 hover:scale-[1.02] transition-all"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <FaTrophy className="text-white text-2xl" />
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    proof.status === 'approved'
                      ? 'bg-green-500/20 text-green-300'
                      : proof.status === 'rejected'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}
                >
                  {proof.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-cyan-400" />
                  <span>Status: {proof.status}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-green-400" />
                  <span>Payout: {proof.payout_status || 'pending'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaClock className="text-yellow-400" />
                  <span>
                    Uploaded On:{' '}
                    {new Date(proof.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Winnings;