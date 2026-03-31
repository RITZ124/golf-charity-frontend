
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem(
        'subscriptions',
        JSON.stringify(res.data.subscriptions || [])
      );
      toast.success('Login successful');

      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Golf Charity Platform
          </p>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
            Welcome
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Back.
            </span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Access your premium dashboard, manage subscriptions, track golf scores,
            monitor charity impact, and stay updated with your winnings.
          </p>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 lg:p-10 shadow-2xl">
          <h2 className="text-3xl font-bold mb-2">Login to Continue</h2>
          <p className="text-gray-400 mb-8">Enter your credentials to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-400 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
            >
              {loading ? 'Logging In...' : 'Login'}
              <FaArrowRight />
            </button>
          </form>

          <p className="text-center text-gray-400 mt-8">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-cyan-400 font-semibold hover:text-cyan-300">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
