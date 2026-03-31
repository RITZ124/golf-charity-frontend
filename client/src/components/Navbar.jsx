// Navbar.jsx

import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#050816]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="text-3xl font-black text-white">
          Golf<span className="text-cyan-400">Charity</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-cyan-400 transition-all">Home</Link>
          <Link to="/about" className="hover:text-cyan-400 transition-all">About</Link>
          <Link to="/charities" className="hover:text-cyan-400 transition-all">Charities</Link>
          <Link to="/subscription" className="hover:text-cyan-400 transition-all">Pricing</Link>
          <Link to="/contact" className="hover:text-cyan-400 transition-all">Contact</Link>

          {token && user?.role === 'user' && (
            <>
              <Link to="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
              <Link to="/my-subscription" className="hover:text-cyan-400">Subscription</Link>
              <Link to="/my-golf-scores" className="hover:text-cyan-400">Scores</Link>
            </>
          )}

          {token && user?.role === 'admin' && (
            <>
              <Link to="/admin" className="hover:text-cyan-400">Admin</Link>
              <Link to="/admin/users" className="hover:text-cyan-400">Users</Link>
              <Link to="/admin/reports" className="hover:text-cyan-400">Reports</Link>
            </>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/login">
                <button className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/10">
                <FaUserCircle className="text-cyan-400 text-xl" />
                <span className="text-white">{user?.full_name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white text-2xl"
        >
          <FaBars />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 bg-[#050816] border-t border-white/10">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/charities">Charities</Link>
          <Link to="/subscription">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;