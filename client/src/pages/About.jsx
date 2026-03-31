// About.jsx

import { FaBullseye, FaEye, FaHeart, FaTrophy } from 'react-icons/fa';

function About() {
  const cards = [
    {
      icon: <FaBullseye className="text-cyan-400 text-3xl" />,
      title: 'Our Mission',
      description:
        'To combine golf, charity and rewards into one premium experience that motivates people to give back.'
    },
    {
      icon: <FaEye className="text-purple-400 text-3xl" />,
      title: 'Our Vision',
      description:
        'To become the leading golf-based charity subscription platform with global reach and measurable impact.'
    },
    {
      icon: <FaHeart className="text-pink-400 text-3xl" />,
      title: 'Community Impact',
      description:
        'Every subscription directly contributes to meaningful causes and supports charities around the world.'
    },
    {
      icon: <FaTrophy className="text-yellow-400 text-3xl" />,
      title: 'Premium Experience',
      description:
        'Members enjoy golf tracking, exclusive rewards, monthly draws and a luxury dashboard experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[40px] p-10 mb-12">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            About Us
          </p>

          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Golf Charity Platform
          </h1>

          <p className="text-gray-300 text-lg leading-8 max-w-4xl mb-6">
            Golf Charity Platform is a premium golf-based fundraising platform where players can
            participate in monthly draws, support charities, upload golf scores and win rewards.
          </p>

          <p className="text-gray-400 leading-8 max-w-4xl">
            Our platform creates a powerful connection between sports, community support and
            meaningful giving while delivering a premium member experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-8 hover:scale-[1.03] transition-all duration-300"
            >
              <div className="mb-6">{item.icon}</div>
              <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
              <p className="text-gray-400 leading-7">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;