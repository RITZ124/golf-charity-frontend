// Reports.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import RevenueChart from '../components/RevenueChart';
import {
  FaChartLine,
  FaMoneyBillWave,
  FaUsers,
  FaHeart
} from 'react-icons/fa';

function Reports() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/admin/dashboard-stats',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Analytics Dashboard
          </p>
          <h1 className="text-5xl font-black mb-4">Reports & Insights</h1>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
            <FaMoneyBillWave className="text-green-400 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Revenue</h3>
            <p className="text-4xl font-black">₹{stats?.monthlyRevenue || 0}</p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
            <FaUsers className="text-cyan-400 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Members</h3>
            <p className="text-4xl font-black">{stats?.totalUsers || 0}</p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
            <FaHeart className="text-pink-400 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Donations</h3>
            <p className="text-4xl font-black">₹{stats?.totalDonations || 0}</p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8">
            <FaChartLine className="text-purple-400 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Growth</h3>
            <p className="text-4xl font-black">+18%</p>
          </div>
        </div>

        <RevenueChart />
      </div>
    </div>
  );
}

export default Reports;