// UploadProof.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import supabase from '../supabaseClient';
import { toast } from 'react-toastify';
import {
  FaUpload,
  FaFileImage,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave
} from 'react-icons/fa';

function UploadProof() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proofs, setProofs] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProofs();
  }, []);

  // Replace fetchProofs in UploadProof.jsx

const fetchProofs = async () => {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.get(
      `http://localhost:5000/api/winners/user/${user.id}`,
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

  // Replace handleUpload in UploadProof.jsx

const handleUpload = async () => {
  if (!file) {
    toast.error('Please select a file');
    return;
  }

  try {
    setLoading(true);

    const token = localStorage.getItem('token');

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('winner-proofs')
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from('winner-proofs')
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    await axios.post(
      'http://localhost:5000/api/winners/upload-proof',
      {
        draw_entry_id: proofs[0]?.draw_entry_id,
        image_url: imageUrl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success('Proof uploaded successfully');
    setFile(null);
    fetchProofs();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Upload failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Winner Verification
          </p>
          <h1 className="text-5xl font-black mb-4">Upload Winner Proof</h1>
          <p className="text-gray-400 text-lg">
            Submit your winning proof documents for approval and payout verification.
          </p>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
              <FaUpload className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Upload Document</h2>
              <p className="text-gray-400">
                Accepted formats: JPG, PNG, PDF
              </p>
            </div>
          </div>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-cyan-400 mb-6"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold hover:scale-[1.02] transition-all"
          >
            {loading ? 'Uploading...' : 'Upload Proof'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {proofs.map((proof) => (
            <div
              key={proof.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <FaFileImage className="text-white text-xl" />
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
                  <span className="text-gray-300">
                    Verification: {proof.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-green-400" />
                  <span className="text-gray-300">
                    Payout: {proof.payout_status || 'pending'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaClock className="text-yellow-400" />
                  <span className="text-gray-300">
                    Uploaded Proof
                  </span>
                </div>

                <a
                  href={proof.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  View Uploaded File →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadProof;