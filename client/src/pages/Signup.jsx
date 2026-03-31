
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
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
        'https://golf-charity-frontend-r9tw.onrender.com/api/auth/signup',
        formData
      );

      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center px-6 py-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-2xl relative z-10 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 lg:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black mb-4">Create Account</h1>
          <p className="text-gray-400 text-lg">
            Join the future of golf, charity, rewards and premium experiences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400" />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-400" />
          </div>

          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400" />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-green-400" />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
            <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-pink-400" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 shadow-xl">
            {loading ? 'Creating Account...' : 'Create Premium Account'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

