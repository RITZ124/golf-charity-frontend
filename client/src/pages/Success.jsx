// Success.jsx

import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

function Success() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[40px] p-10 text-center">
        <FaCheckCircle className="text-green-400 text-7xl mx-auto mb-6" />

        <h1 className="text-5xl font-black text-white mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Your subscription is now active and you can start participating in golf draws and charity contributions.
        </p>

        <Link to="/dashboard">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-cyan-500 font-bold">
            Go To Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;