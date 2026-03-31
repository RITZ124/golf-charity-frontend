// DashboardLayout.jsx

import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaCreditCard,
  FaGolfBall,
  FaHeart,
  FaDice,
  FaTrophy,
  FaUpload,
  FaUserCog,
  FaUsers,
  FaMoneyBillWave,
  FaHandsHelping,
  FaClipboardCheck,
  FaChartBar,
  FaFileAlt,
  FaCogs
} from 'react-icons/fa';

function DashboardLayout({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const userMenuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FaHome />
    },
    {
      name: 'My Subscription',
      path: '/my-subscription',
      icon: <FaCreditCard />
    },
    {
      name: 'Golf Scores',
      path: '/my-golf-scores',
      icon: <FaGolfBall />
    },
    {
      name: 'Selected Charity',
      path: '/selected-charity',
      icon: <FaHeart />
    },
    {
      name: 'Draw Participation',
      path: '/draw-participation',
      icon: <FaDice />
    },
    {
      name: 'Winnings',
      path: '/winnings',
      icon: <FaTrophy />
    },
    {
      name: 'Upload Proof',
      path: '/upload-proof',
      icon: <FaUpload />
    },
    {
      name: 'Profile Settings',
      path: '/profile-settings',
      icon: <FaUserCog />
    }
  ];

  const adminMenuItems = [
    {
      name: 'Admin Dashboard',
      path: '/admin',
      icon: <FaHome />
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: <FaUsers />
    },
    {
      name: 'Subscriptions',
      path: '/admin/subscriptions',
      icon: <FaMoneyBillWave />
    },
    {
      name: 'Charities',
      path: '/admin/charities',
      icon: <FaHandsHelping />
    },
    {
      name: 'Draw Management',
      path: '/admin/draw-management',
      icon: <FaClipboardCheck />
    },
    {
      name: 'Winner Verification',
      path: '/admin/winner-verification',
      icon: <FaTrophy />
    },
    {
      name: 'Reports',
      path: '/admin/reports',
      icon: <FaChartBar />
    },
    {
      name: 'Content Management',
      path: '/admin/content-management',
      icon: <FaFileAlt />
    }
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <div className="min-h-screen bg-[#050816] text-white flex">
      <div className="hidden lg:flex w-[300px] min-h-screen border-r border-white/10 bg-[#0b1120] p-8 flex-col sticky top-0">
        <h2 className="text-3xl font-black mb-3">
          {user?.role === 'admin' ? (
            <>
              Admin<span className="text-cyan-400">Panel</span>
            </>
          ) : (
            <>
              User<span className="text-cyan-400">Panel</span>
            </>
          )}
        </h2>

        <p className="text-sm text-gray-400 mb-10">
          {user?.role === 'admin'
            ? 'Manage users, subscriptions, reports and platform activity'
            : 'Manage your subscription, scores, winnings and profile'}
        </p>

        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                {user?.full_name?.charAt(0)}
              </div>

              <div>
                <p className="font-semibold">{user?.full_name}</p>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>

            <div className="inline-flex px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs uppercase tracking-wider">
              {user?.role}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;