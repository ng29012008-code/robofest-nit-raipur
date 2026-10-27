import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Cpu, ArrowUpRight } from 'lucide-react';
import { FESTIVAL_CONFIG } from '../config';
import { soundManager } from '../utils/audio';

export default function Navbar({ onOpenRegisterModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newMutedState = soundManager.toggleMute();
    setIsMuted(newMutedState);
    if (!newMutedState) {
      soundManager.playClick();
    }
  };

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Interface', href: '#interface' },
    { label: 'Register', href: '#register' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#05070B]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Wordmark & Club Identity */}
          <a 
            href="#hero" 
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 rounded-lg p-1"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#0E1526] border border-[#00F0FF]/30 group-hover:border-[#00F0FF] transition-colors">
              <Cpu className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-lg bg-[#00F0FF]/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-black tracking-wider text-base sm:text-lg text-white group-hover:text-[#00F0FF] transition-colors flex items-center gap-1.5">
                ROBOTiX <span className="text-[#00F0FF] text-xs font-mono font-normal px-1.5 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30">CLUB</span>
              </span>
              <span className="font-tech text-[10px] tracking-widest text-slate-400 uppercase -mt-0.5">
                NIT Raipur • 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="relative px-3.5 py-2 text-xs lg:text-sm font-medium tracking-wider uppercase text-slate-300 hover:text-white transition-colors group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#00F0FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* Audio Feedback Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="p-2 rounded-lg text-slate-400 hover:text-[#00F0FF] hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#00F0FF]"
              title={isMuted ? "Enable Sci-Fi Audio Feedback" : "Mute Audio Feedback"}
              aria-label={isMuted ? "Enable Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00F0FF]" />}
            </button>

            {/* Prominent CTA */}
            <a
              href="#register"
              onMouseEnter={() => soundManager.playHover()}
              onClick={(e) => {
                soundManager.playClick();
                if (onOpenRegisterModal) {
                  e.preventDefault();
                  onOpenRegisterModal();
                }
              }}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#05070B] font-display font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu & Sound Toggle Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              type="button"
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-[#0A0F18] border border-white/10"
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00F0FF]" />}
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              className="p-2.5 rounded-lg text-slate-200 hover:text-white bg-[#0A0F18] border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00F0FF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070B14]/98 border-b border-white/10 px-4 pt-4 pb-6 mt-3 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <div className="px-3 py-1 font-tech text-[10px] text-[#00F0FF] tracking-widest uppercase border-b border-white/5">
              // NAVIGATION PROTOCOL
            </div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider text-slate-200 hover:text-[#00F0FF] hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="font-tech text-xs text-slate-500">↗</span>
              </a>
            ))}

            <div className="pt-2">
              <a
                href="#register"
                onClick={(e) => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                  if (onOpenRegisterModal) {
                    e.preventDefault();
                    onOpenRegisterModal();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#05070B] font-display font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
