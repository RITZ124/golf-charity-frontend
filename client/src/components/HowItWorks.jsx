// HowItWorks.jsx

import {
    FaUserPlus,
    FaHeart,
    FaGolfBall,
    FaDice,
    FaTrophy
  } from 'react-icons/fa';
  
  function HowItWorks() {
    const steps = [
      {
        icon: <FaUserPlus className="text-cyan-400 text-3xl" />,
        title: 'Create Account',
        description: 'Sign up and choose the subscription plan that suits you.'
      },
      {
        icon: <FaHeart className="text-pink-400 text-3xl" />,
        title: 'Select Charity',
        description: 'Pick your preferred charity and support meaningful causes.'
      },
      {
        icon: <FaGolfBall className="text-green-400 text-3xl" />,
        title: 'Upload Scores',
        description: 'Track your golf scores and improve your performance.'
      },
      {
        icon: <FaDice className="text-yellow-400 text-3xl" />,
        title: 'Enter Draws',
        description: 'Automatically participate in exclusive monthly prize draws.'
      },
      {
        icon: <FaTrophy className="text-purple-400 text-3xl" />,
        title: 'Win Rewards',
        description: 'Earn prizes, recognition and premium member benefits.'
      }
    ];
  
    return (
      <section className="mb-12">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-yellow-400 text-sm mb-4">
            Process
          </p>
  
          <h2 className="text-5xl font-black text-white mb-4">
            How It Works
          </h2>
  
          <p className="text-gray-400 text-lg">
            Start your journey in just a few simple steps.
          </p>
        </div>
  
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 hover:scale-[1.03] transition-all duration-300"
            >
              <div className="mb-6">{step.icon}</div>
  
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-cyan-400 mb-4">
                {index + 1}
              </div>
  
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
  
              <p className="text-gray-400 leading-7">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default HowItWorks;