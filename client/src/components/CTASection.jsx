// CTASection.jsx

import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-8 py-16 mb-12">
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[100px] rounded-full" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Premium Membership
          </p>

          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Turn Every Golf Round Into Real Impact
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl leading-8">
            Support charities, compete in monthly prize draws and become part of a premium golf community built for winners.
          </p>
        </div>

        <Link to="/subscription">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold flex items-center gap-3 whitespace-nowrap">
            View Plans
            <FaArrowRight />
          </button>
        </Link>
      </div>
    </section>
  );
}

export default CTASection;