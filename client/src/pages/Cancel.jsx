// Cancel.jsx

import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

function Cancel() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[40px] p-10 text-center">
        <FaTimesCircle className="text-red-400 text-7xl mx-auto mb-6" />

        <h1 className="text-5xl font-black text-white mb-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          No worries. You can return anytime and complete your subscription whenever you are ready.
        </p>

        <Link to="/subscription">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 font-bold">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cancel;