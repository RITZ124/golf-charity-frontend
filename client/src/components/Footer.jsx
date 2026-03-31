// Footer.jsx

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#050816] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 xl:grid-cols-4 gap-10">
        <div>
          <h2 className="text-3xl font-black text-white mb-4">
            Golf<span className="text-cyan-400">Charity</span>
          </h2>

          <p className="text-gray-400 leading-7">
            A premium platform where golf, rewards and charity come together to create real impact.
          </p>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-3 text-gray-400">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/charities">Charities</a>
            <a href="/contact">Contact</a>
          </div>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-4">Support</h3>
          <div className="flex flex-col gap-3 text-gray-400">
            <p>support@golfcharityplatform.com</p>
            <p>+91 98765 43210</p>
            <p>Pune, Maharashtra</p>
          </div>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-4">Follow Us</h3>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-cyan-400">
              <FaFacebookF />
            </div>

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-pink-400">
              <FaInstagram />
            </div>

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
              <FaLinkedinIn />
            </div>

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-cyan-300">
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;