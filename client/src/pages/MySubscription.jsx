// MySubscription.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCrown, FaHeart, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

function MySubscription() {
  const [subscription, setSubscription] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await axios.get(
        `https://golf-charity-frontend-r9tw.onrender.com/api/subscription/status?user_id=${user.id}`
      );

      if (Array.isArray(res.data) && res.data.length > 0) {
        setSubscription(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!subscription) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-10 text-center max-w-xl">
          <h2 className="text-4xl font-black text-white mb-4">
            No Active Subscription
          </h2>
          <p className="text-gray-400">
            Subscribe to unlock premium golf features, rewards and charity support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Membership Details
          </p>
          <h1 className="text-5xl font-black mb-4">My Subscription</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-[32px] p-8">
            <FaCrown className="text-yellow-400 text-5xl mb-6" />
            <h2 className="text-3xl font-black capitalize mb-4">
              {subscription.plan_type} Plan
            </h2>
            <p className="text-gray-300">
              Status: {subscription.status}
            </p>
          </div>

          <div className="grid gap-6">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6 flex items-center gap-5">
              <FaMoneyBillWave className="text-green-400 text-3xl" />
              <div>
                <p className="text-gray-400">Amount Paid</p>
                <h3 className="text-3xl font-black">₹{subscription.amount_paid}</h3>
              </div>
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6 flex items-center gap-5">
              <FaHeart className="text-pink-400 text-3xl" />
              <div>
                <p className="text-gray-400">Donation Percentage</p>
                <h3 className="text-3xl font-black">
                  {subscription.donation_percentage || 0}%
                </h3>
              </div>
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6 flex items-center gap-5">
              <FaCalendarAlt className="text-cyan-400 text-3xl" />
              <div>
                <p className="text-gray-400">Renewal Date</p>
                <h3 className="text-xl font-bold">
                  {subscription.renewal_date || 'N/A'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySubscription;