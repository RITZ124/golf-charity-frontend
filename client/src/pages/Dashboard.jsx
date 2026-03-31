// DASHBOARD.JSX

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaTrophy,
  FaUser,
  FaMoneyBill,
  FaGolfBall,
  FaHeart,
  FaChartBar,
  FaSignOutAlt,
  FaArrowUp
} from 'react-icons/fa';

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [subscription, setSubscription] = useState(null);
  const [scores, setScores] = useState([]);
  const [proofs, setProofs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const subRes = await axios.get(
        'http://localhost:5000/api/subscription/status',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const scoreRes = await axios.get(
        'http://localhost:5000/api/scores',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const subscriptions = subRes.data.subscriptions || [];
      const scoreData = scoreRes.data.scores || [];

      if (subscriptions.length > 0) {
        setSubscription(subscriptions[0]);
      }

      setScores(scoreData);
      setProofs([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const stats = [
    {
      title: 'Current Plan',
      value: subscription?.plan_type || 'No Active Plan',
      icon: <FaMoneyBill />,
      color: 'from-emerald-500 to-green-600'
    },
    {
      title: 'Donation Percentage',
      value: `${subscription?.donation_percentage || 0}%`,
      icon: <FaHeart />,
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Renewal Date',
      value: subscription?.renewal_date
        ? new Date(subscription.renewal_date).toLocaleDateString()
        : 'N/A',
      icon: <FaChartBar />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Golf Scores',
      value: scores.length,
      icon: <FaGolfBall />,
      color: 'from-lime-500 to-green-500'
    },
    {
      title: 'Proof Uploads',
      value: proofs.length,
      icon: <FaUser />,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Winning Status',
      value: proofs.some((proof) => proof.status === 'approved')
        ? 'Winner Approved'
        : 'No Win Yet',
      icon: <FaTrophy />,
      color: 'from-purple-500 to-fuchsia-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 mb-10 flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
              {user?.full_name?.charAt(0)}
            </div>

            <div>
              <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-3">
                Premium Dashboard
              </p>
              <h1 className="text-4xl font-black mb-2">
                Welcome back, {user?.full_name}
              </h1>
              <p className="text-gray-400">{user?.email}</p>
              <div className="mt-4 inline-flex px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm uppercase tracking-wider">
                {user?.role}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="h-fit px-6 py-4 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all flex items-center gap-3"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-7 hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl mb-6`}>
                {item.icon}
              </div>

              <p className="text-gray-400 mb-3">{item.title}</p>
              <h2 className="text-3xl font-black leading-tight">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Recent Golf Scores</h2>
              <FaArrowUp className="text-cyan-400" />
            </div>

            {scores.length === 0 ? (
              <p className="text-gray-400">No scores added yet.</p>
            ) : (
              <div className="space-y-4">
                {scores.slice(0, 5).map((score) => (
                  <div
                    key={score.id}
                    className="flex justify-between items-center bg-[#0f172a]/70 border border-white/10 rounded-2xl p-4"
                  >
                    <div>
                      <p className="font-semibold">
                        Score: {score.score}
                      </p>
                      <p className="text-sm text-gray-400">
                        {score.score_date}
                      </p>
                    </div>

                    <div className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                      Golf Entry
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
            <h2 className="text-2xl font-bold mb-8">Membership Benefits</h2>

            <div className="space-y-5">
              {[
                'Exclusive golf tournaments',
                'Monthly premium draws',
                'Priority charity access',
                'Premium dashboard insights',
                'VIP rewards and cashback'
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-[#0f172a]/70 border border-white/10 rounded-2xl p-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                    ✓
                  </div>
                  <p className="text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;