// Testimonials.jsx

import { FaQuoteLeft, FaStar } from 'react-icons/fa';

function Testimonials() {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Premium Member',
      message:
        'This platform combines golf, rewards and charity in the best possible way.'
    },
    {
      name: 'Anjali Mehta',
      role: 'Monthly Winner',
      message:
        'I love being able to support causes while enjoying monthly prize draws.'
    },
    {
      name: 'Rohit Verma',
      role: 'Golf Enthusiast',
      message:
        'The dashboard and overall experience feel premium and motivating.'
    }
  ];

  return (
    <section className="mb-12">
      <div className="mb-10">
        <p className="uppercase tracking-[0.4em] text-pink-400 text-sm mb-4">
          Testimonials
        </p>

        <h2 className="text-5xl font-black text-white mb-4">
          What Members Say
        </h2>

        <p className="text-gray-400 text-lg">
          Hear from people who are already part of the platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8"
          >
            <FaQuoteLeft className="text-cyan-400 text-3xl mb-6" />

            <p className="text-gray-300 leading-8 mb-8">
              "{item.message}"
            </p>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.role}</p>
              </div>

              <div className="flex gap-1 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;