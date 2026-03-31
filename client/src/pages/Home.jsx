import HeroSection from '../components/HeroSection';
import CTASection from '../components/CTASection';
import HowItWorks from '../components/HowItWorks';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import FeaturedCharitiesCarousel from '../components/FeaturedCharitiesCarousel';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaGolfBall,
  FaHeart,
  FaTrophy
} from 'react-icons/fa';

function Home() {
  const highlights = [
    {
      icon: <FaGolfBall className="text-cyan-400 text-3xl" />,
      title: 'Track Golf Scores',
      description:
        'Upload your scores, track performance and compete with fellow golfers.'
    },
    {
      icon: <FaHeart className="text-pink-400 text-3xl" />,
      title: 'Support Charities',
      description:
        'Choose your favorite charity and make every membership count.'
    },
    {
      icon: <FaTrophy className="text-yellow-400 text-3xl" />,
      title: 'Win Premium Rewards',
      description:
        'Participate in exclusive monthly draws, prizes and member rewards.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <HeroSection />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-14">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 hover:scale-[1.03] transition-all duration-300"
            >
              <div className="mb-6">{item.icon}</div>

              <h3 className="text-2xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <CTASection />

        <HowItWorks />

        <StatsSection />

        <FeaturedCharitiesCarousel />

        <Testimonials />

        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-8 py-16 mt-14">
          <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[100px] rounded-full" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
              Join Today
            </p>

            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Ready To Make An Impact?
            </h2>

            <p className="text-gray-400 text-lg leading-8 mb-10">
              Join today and become part of a premium golf community that rewards players while supporting charities around the world.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link to="/signup">
                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold flex items-center gap-3">
                  Get Started
                  <FaArrowRight />
                </button>
              </Link>

              <Link to="/subscription">
                <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 font-bold hover:bg-white/10 transition-all">
                  View Pricing
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;