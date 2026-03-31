// Replace CharityDirectory.jsx بالكامل

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaSearch,
  FaHeart,
  FaArrowRight,
  FaStar,
  FaCalendarAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CharityDirectory() {
  const [charities, setCharities] = useState([]);
  const [filteredCharities, setFilteredCharities] = useState([]);
  const [spotlightCharity, setSpotlightCharity] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharities();
    fetchSpotlightCharity();
  }, []);

  useEffect(() => {
    const filtered = charities.filter((charity) =>
      charity.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCharities(filtered);
  }, [search, charities]);

  const fetchCharities = async () => {
    try {
      const res = await axios.get('https://golf-charity-frontend-r9tw.onrender.com/api/charities');
      const charityData = res.data.charities || [];
      setCharities(charityData);
      setFilteredCharities(charityData);
    } catch (error) {
      toast.error('Failed to load charities');
    } finally {
      setLoading(false);
    }
  };

  const fetchSpotlightCharity = async () => {
    try {
      const res = await axios.get(
        'https://golf-charity-frontend-r9tw.onrender.com/api/charities/spotlight'
      );

      setSpotlightCharity(res.data.charity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCharity = (charity) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const updatedUser = {
      ...user,
      selected_charity_id: charity.id,
      selected_charity_name: charity.name
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success(`${charity.name} selected successfully`);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-pink-400 text-sm mb-4">
            Charity Directory
          </p>
          <h1 className="text-5xl font-black mb-4">Explore Charities</h1>
          <p className="text-gray-400 text-lg">
            Find and support causes that matter to you.
          </p>
        </div>

        {spotlightCharity && (
          <div className="relative overflow-hidden rounded-[40px] mb-12 border border-white/10">
            <img
              src={
                spotlightCharity.image_url ||
                'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c'
              }
              alt={spotlightCharity.name}
              className="w-full h-[400px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40 p-10 flex flex-col justify-end">
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-300 mb-6">
                <FaStar />
                Spotlight Charity
              </div>

              <h2 className="text-5xl font-black mb-4">
                {spotlightCharity.name}
              </h2>

              <p className="text-lg text-gray-300 max-w-3xl mb-6">
                {spotlightCharity.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/charities/${spotlightCharity.id}`}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleSelectCharity(spotlightCharity)}
                  className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 font-bold"
                >
                  Select Charity
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative mb-10">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400" />
          <input
            type="text"
            placeholder="Search charities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-5 pl-14 pr-4 outline-none focus:border-cyan-400"
          />
        </div>

        {!loading && filteredCharities.length === 0 ? (
          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">No Charity Found</h2>
            <p className="text-gray-400">Try another search keyword.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCharities.map((charity) => (
              <div
                key={charity.id}
                className="overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] hover:scale-[1.02] transition-all"
              >
                <div className="relative">
                  <img
                    src={
                      charity.image_url ||
                      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6'
                    }
                    alt={charity.name}
                    className="w-full h-[220px] object-cover"
                  />

                  {charity.featured && (
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-yellow-500 text-black text-sm font-bold">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mb-6">
                    <FaHeart className="text-white text-2xl" />
                  </div>

                  <h2 className="text-2xl font-bold mb-4">{charity.name}</h2>

                  <p className="text-gray-400 mb-4 leading-7 line-clamp-3">
                    {charity.description}
                  </p>

                  <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm mb-4">
                    {charity.category}
                  </span>

                  {charity.upcoming_event_title && (
                    <div className="flex items-center gap-3 text-yellow-300 mb-6">
                      <FaCalendarAlt />
                      <span className="text-sm">
                        {charity.upcoming_event_title}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={`/charities/${charity.id}`}
                      className="py-4 rounded-2xl border border-white/10 text-center font-bold bg-white/5 hover:bg-white/10"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => handleSelectCharity(charity)}
                      className="py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold flex items-center justify-center gap-2"
                    >
                      Select
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CharityDirectory;