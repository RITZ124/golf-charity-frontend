// ADMINDASHBOARD.JSX

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaUsers,
  FaMoneyBillWave,
  FaHeart,
  FaCrown,
  FaChartLine,
  FaClipboardCheck,
  FaExclamationTriangle
} from 'react-icons/fa';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
  
      const res = await axios.get(
        'https://golf-charity-frontend-r9tw.onrender.com/api/admin/dashboard-stats',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      console.log('Admin Dashboard Response:', res.data);
  
      const dashboardStats = res.data.stats || res.data;
  
      setStats(dashboardStats);
    } catch (error) {
      console.log('Admin Dashboard Error:', error);
  
      setErrorMessage(
        error.response?.data?.message || 'Failed to load dashboard'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-white text-3xl font-black mb-2">
            Loading Admin Dashboard...
          </h2>
          <p className="text-gray-400">
            Fetching platform analytics and reports
          </p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
        <div className="max-w-xl w-full backdrop-blur-2xl bg-red-500/10 border border-red-500/20 rounded-[32px] p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-3xl mx-auto mb-6">
            <FaExclamationTriangle />
          </div>

          <h2 className="text-3xl font-black text-white mb-4">
            Failed To Load Admin Dashboard
          </h2>

          <p className="text-red-300 mb-6">
            {errorMessage}
          </p>

          <button
            onClick={fetchDashboardStats}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-[1.03] transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <FaUsers />,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Active Subscriptions',
      value: stats?.activeSubscriptions || 0,
      icon: <FaCrown />,
      color: 'from-purple-500 to-fuchsia-600'
    },
    {
      title: 'Total Donations',
      value: `₹${stats?.totalDonations || 0}`,
      icon: <FaHeart />,
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${stats?.monthlyRevenue || 0}`,
      icon: <FaMoneyBillWave />,
      color: 'from-emerald-500 to-green-600'
    },
    {
      title: 'Pending Proofs',
      value: stats?.pendingProofApprovals || 0,
      icon: <FaClipboardCheck />,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Draw History',
      value: stats?.drawHistory || 0,
      icon: <FaChartLine />,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Control Center
          </p>

          <h1 className="text-5xl font-black mb-4">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 text-lg">
            Monitor platform performance, user activity, subscriptions and revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-2xl mb-6`}>
                {card.icon}
              </div>

              <p className="text-gray-400 mb-3">{card.title}</p>

              <h2 className="text-4xl font-black">
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
            <h2 className="text-2xl font-bold mb-8">
              Platform Highlights
            </h2>

            <div className="space-y-5">
              {[
                'Revenue growth is increasing steadily',
                'Subscription activity remains strong',
                'Proof verification queue is manageable',
                'Charity donations are rising monthly'
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-5"
                >
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-4xl mx-auto mb-6">
                <FaChartLine />
              </div>

              <h2 className="text-3xl font-black mb-4">
                Growth Analytics
              </h2>

              <p className="text-gray-400 max-w-md">
                Integrate charts, revenue trends, user acquisition reports and subscription insights here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;