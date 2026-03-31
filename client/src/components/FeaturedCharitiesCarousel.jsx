// FeaturedCharitiesCarousel.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaArrowRight } from 'react-icons/fa';

function FeaturedCharitiesCarousel() {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const res = await axios.get('https://golf-charity-frontend-r9tw.onrender.com/api/charities');
      setCharities(res.data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-10">
        <p className="uppercase tracking-[0.4em] text-green-400 text-sm mb-4">
          Featured Causes
        </p>

        <h2 className="text-5xl font-black text-white mb-4">
          Featured Charities
        </h2>

        <p className="text-gray-400 text-lg">
          Explore some of the charities supported by our members.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {charities.map((charity) => (
          <div
            key={charity.id}
            className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mb-6">
              <FaHeart className="text-white text-2xl" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              {charity.name}
            </h3>

            <p className="text-gray-400 leading-7 mb-4">
              {charity.description}
            </p>

            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm mb-6">
              {charity.category}
            </span>

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold flex items-center justify-center gap-3">
              Learn More
              <FaArrowRight />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCharitiesCarousel;