// SubscriptionsTable.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCrown, FaMoneyBillWave } from 'react-icons/fa';

function SubscriptionsTable() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const res = await axios.get(
      'https://golf-charity-frontend-r9tw.onrender.com/api/admin/subscriptions'
    );

    setSubscriptions(res.data);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Membership Analytics
          </p>
          <h1 className="text-5xl font-black mb-4">Subscriptions Table</h1>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                  <FaCrown className="text-white text-xl" />
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    subscription.status === 'active'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {subscription.status}
                </span>
              </div>

              <h2 className="text-2xl font-bold capitalize mb-4">
                {subscription.plan_type} Plan
              </h2>

              <div className="flex items-center gap-3 text-green-400">
                <FaMoneyBillWave />
                <span className="text-2xl font-bold">
                  ₹{subscription.amount_paid}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionsTable;