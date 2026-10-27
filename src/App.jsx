import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import RoboticsInterface from './components/RoboticsInterface';
import Registration from './components/Registration';
import Footer from './components/Footer';
import CyberBackground from './components/CyberBackground';
import CyberCursor from './components/CyberCursor';
import RegistrationModal from './components/RegistrationModal';

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    // Support deep-linking via query parameter for automated testing and inspection
    const params = new URLSearchParams(window.location.search);
    const sec = params.get('section');
    if (sec) {
      setTimeout(() => {
        const el = document.getElementById(sec);
        if (el) {
          el.scrollIntoView({ behavior: 'instant' });
        }
      }, 100);
    }
  }, []);

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#172338] text-slate-100 flex flex-col font-sans selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">
      {/* Cyber Cursor Reticle for desktop */}
      <CyberCursor />

      {/* Ambient Cyber Background (Particles, Glows & Grid) */}
      <CyberBackground />

      {/* Main Top Navigation */}
      <Navbar onOpenRegisterModal={handleOpenRegisterModal} />

      {/* Main Content Layout */}
      <main className="relative z-10 flex-grow">
        {/* Section 01: Hero */}
        <Hero onOpenRegisterModal={handleOpenRegisterModal} />

        {/* Section 02: Introduction & Vision */}
        <About />

        {/* Section 03: Events Competition Arena */}
        <Events onOpenRegisterModal={handleOpenRegisterModal} />

        {/* Section 04: Interactive Robotics Control Interface */}
        <RoboticsInterface />

        {/* Section 05: Closing Registration CTA */}
        <Registration onOpenRegisterModal={handleOpenRegisterModal} />
      </main>

      {/* Footer */}
      <Footer onOpenRegisterModal={handleOpenRegisterModal} />

      {/* Registration & Pre-Admission Modal */}
      <RegistrationModal 
        isOpen={isRegisterModalOpen} 
        onClose={handleCloseRegisterModal} 
      />
    </div>
  );
}
