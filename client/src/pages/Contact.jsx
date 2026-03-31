// Contact.jsx

import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        <div>
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Contact Us
          </p>

          <h1 className="text-5xl font-black mb-6">
            Let&apos;s Connect
          </h1>

          <p className="text-gray-400 text-lg leading-8 mb-10">
            Have questions about subscriptions, charities, draws or payouts?
            Our support team is ready to help.
          </p>

          <div className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[24px] p-6 flex items-center gap-5">
              <FaEnvelope className="text-cyan-400 text-2xl" />
              <div>
                <p className="text-gray-400">Email</p>
                <h3 className="font-bold">support@golfcharityplatform.com</h3>
              </div>
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[24px] p-6 flex items-center gap-5">
              <FaPhoneAlt className="text-green-400 text-2xl" />
              <div>
                <p className="text-gray-400">Phone</p>
                <h3 className="font-bold">+91 98765 43210</h3>
              </div>
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[24px] p-6 flex items-center gap-5">
              <FaClock className="text-yellow-400 text-2xl" />
              <div>
                <p className="text-gray-400">Office Hours</p>
                <h3 className="font-bold">Monday - Friday | 9 AM - 6 PM</h3>
              </div>
            </div>

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[24px] p-6 flex items-center gap-5">
              <FaMapMarkerAlt className="text-pink-400 text-2xl" />
              <div>
                <p className="text-gray-400">Address</p>
                <h3 className="font-bold">Pune, Maharashtra, India</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
          <h2 className="text-3xl font-bold mb-6">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
            />

            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
            />

            <textarea
              rows="5"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
            />

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;