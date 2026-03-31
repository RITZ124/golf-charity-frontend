// SelectedCharity.jsx

import { FaHeart, FaHandsHelping } from 'react-icons/fa';

function SelectedCharity() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user?.selected_charity_name) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-10 text-center max-w-xl">
          <FaHandsHelping className="text-cyan-400 text-6xl mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white mb-4">
            No Charity Selected
          </h2>
          <p className="text-gray-400">
            Choose a charity to start making an impact.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[40px] p-10 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mx-auto mb-8">
          <FaHeart className="text-white text-4xl" />
        </div>

        <p className="uppercase tracking-[0.4em] text-pink-400 text-sm mb-4">
          Selected Charity
        </p>

        <h1 className="text-5xl font-black mb-6">
          {user.selected_charity_name}
        </h1>

        <p className="text-gray-400 text-lg leading-8">
          Thank you for supporting this charity. Your subscription and golf activity help create meaningful impact.
        </p>
      </div>
    </div>
  );
}

export default SelectedCharity;