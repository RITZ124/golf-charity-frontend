// WinnerVerification.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaUserCheck,
  FaSearch
} from 'react-icons/fa';

function WinnerVerification() {
  const [proofs, setProofs] = useState([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProofs();
  }, []);

  const fetchProofs = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/admin/pending-proofs',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProofs(res.data.proofs || []);
    } catch (error) {
      toast.error('Failed to load proofs');
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/winners/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Winner proof approved');
      fetchProofs();
    } catch (error) {
      toast.error('Approval failed');
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/winners/mark-paid/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Winner marked as paid');
      fetchProofs();
    } catch (error) {
      toast.error('Failed to update payout');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/winners/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Winner proof rejected');
      fetchProofs();
    } catch (error) {
      toast.error('Rejection failed');
    }
  };

  const filteredProofs = proofs.filter((proof) =>
    proof.user_id?.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 gap-6">
          <div>
            <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
              Winner Verification
            </p>
            <h1 className="text-5xl font-black mb-4">
              Review Winner Proofs
            </h1>
          </div>

          <div className="relative w-full lg:w-[350px]">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by User ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProofs.map((proof) => (
            <div
              key={proof.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mb-6">
                <FaUserCheck className="text-white text-2xl" />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                User ID: {proof.user_id}
              </h2>

              <div className="space-y-3 mb-6">
                <p className="text-gray-400">
                  Status:
                  <span className="text-yellow-400 ml-2 font-semibold capitalize">
                    {proof.status}
                  </span>
                </p>

                <p className="text-gray-400">
                  Payout:
                  <span className="text-green-400 ml-2 font-semibold capitalize">
                    {proof.payout_status}
                  </span>
                </p>
              </div>

              {proof.image_url && (
                <a
                  href={proof.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-cyan-400 mb-6 hover:text-cyan-300"
                >
                  View Proof Image
                </a>
              )}

              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleApprove(proof.id)}
                  className="py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  Approve
                </button>

                <button
                  onClick={() => handleMarkPaid(proof.id)}
                  className="py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold flex items-center justify-center gap-2"
                >
                  <FaMoneyBillWave />
                  Mark Paid
                </button>

                <button
                  onClick={() => handleReject(proof.id)}
                  className="py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 font-semibold flex items-center justify-center gap-2"
                >
                  <FaTimesCircle />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WinnerVerification;