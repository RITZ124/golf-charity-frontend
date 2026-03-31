// MainLayout.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;