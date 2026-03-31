// HeroSection.jsx

import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[40px] bg-[#0b1120] border border-white/10 px-8 py-20 lg:px-16 lg:py-28 mb-12">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-4xl">
        <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-6">
          Premium Golf Charity Experience
        </p>

        <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8">
          Play Golf.
          <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Win Big.
          </span>
          Support Charities.
        </h1>

        <p className="text-gray-400 text-lg leading-8 max-w-3xl mb-10">
          Join the premium golf charity platform where your subscription supports meaningful causes,
          enters you into exclusive monthly draws and rewards your golf performance.
        </p>

        <div className="flex flex-wrap gap-5">
          <Link to="/signup">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold flex items-center gap-3">
              Join Now
              <FaArrowRight />
            </button>
          </Link>

          <Link to="/charities">
            <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 font-bold flex items-center gap-3">
              <FaPlay />
              Explore Charities
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;