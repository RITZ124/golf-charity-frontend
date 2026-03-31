// EmptyState.jsx

import { FaInbox } from 'react-icons/fa';

function EmptyState({ title, message }) {
  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-12 text-center max-w-3xl mx-auto">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-8">
        <FaInbox className="text-white text-4xl" />
      </div>

      <h2 className="text-4xl font-black text-white mb-4">
        {title}
      </h2>

      <p className="text-gray-400 text-lg leading-8">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;