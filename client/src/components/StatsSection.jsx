// StatsSection.jsx

import {
    FaDonate,
    FaUsers,
    FaHeart,
    FaMoneyBillWave
  } from 'react-icons/fa';
  
  function StatsSection() {
    const stats = [
      {
        icon: <FaDonate className="text-green-400 text-4xl" />,
        title: 'Total Donations',
        value: '₹12,50,000+'
      },
      {
        icon: <FaUsers className="text-cyan-400 text-4xl" />,
        title: 'Active Golfers',
        value: '2,500+'
      },
      {
        icon: <FaHeart className="text-pink-400 text-4xl" />,
        title: 'Supported Charities',
        value: '150+'
      },
      {
        icon: <FaMoneyBillWave className="text-yellow-400 text-4xl" />,
        title: 'Prize Money Given',
        value: '₹8,00,000+'
      }
    ];
  
    return (
      <section className="mb-12">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            Platform Impact
          </p>
  
          <h2 className="text-5xl font-black text-white mb-4">
            Trusted By Thousands
          </h2>
  
          <p className="text-gray-400 text-lg">
            See the real-world impact our members are creating.
          </p>
        </div>
  
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8"
            >
              <div className="mb-6">{item.icon}</div>
  
              <h3 className="text-4xl font-black text-white mb-3">
                {item.value}
              </h3>
  
              <p className="text-gray-400 text-lg">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default StatsSection;