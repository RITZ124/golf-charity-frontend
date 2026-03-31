// Replace CharityDetails.jsx بالكامل

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  FaHeart,
  FaCalendarAlt,
  FaStar,
  FaArrowRight
} from 'react-icons/fa';
import { toast } from 'react-toastify';

function CharityDetails() {
  const { id } = useParams();
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    fetchCharity();
  }, []);

  const fetchCharity = async () => {
    try {
      const res = await axios.get(
        `https://golf-charity-frontend-r9tw.onrender.com/api/charities/${id}`
      );

      setCharity(res.data.charity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCharity = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const updatedUser = {
      ...user,
      selected_charity_id: charity.id,
      selected_charity_name: charity.name
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success(`${charity.name} selected successfully`);
  };

  if (!charity) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-3xl font-bold">
        Loading Charity Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={
            charity.image_url ||
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c'
          }
          alt={charity.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-black/70 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
          {charity.featured && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-300 mb-6">
              <FaStar />
              Featured Charity
            </div>
          )}

          <h1 className="text-5xl lg:text-7xl font-black mb-4">
            {charity.name}
          </h1>

          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300">
              {charity.category}
            </span>

            {charity.spotlight && (
              <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-300">
                Spotlight Charity
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-8">
              <FaHeart className="text-pink-400 text-3xl" />
              <h2 className="text-3xl font-bold">About This Charity</h2>
            </div>

            <p className="text-gray-300 text-lg leading-8">
              {charity.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
              <h2 className="text-2xl font-bold mb-6">
                Upcoming Event
              </h2>

              {charity.upcoming_event_title ? (
                <>
                  <div className="flex items-center gap-3 text-yellow-300 mb-4">
                    <FaCalendarAlt />
                    <span>{charity.upcoming_event_title}</span>
                  </div>

                  <p className="text-gray-400">
                    {charity.upcoming_event_date
                      ? new Date(
                          charity.upcoming_event_date
                        ).toLocaleDateString()
                      : 'Date Coming Soon'}
                  </p>
                </>
              ) : (
                <p className="text-gray-400">
                  No upcoming events available.
                </p>
              )}
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
              <button
                onClick={handleSelectCharity}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold flex items-center justify-center gap-3"
              >
                Select This Charity
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharityDetails;