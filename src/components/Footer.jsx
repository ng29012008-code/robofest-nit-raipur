import React from 'react';
import { Cpu, ArrowUp } from 'lucide-react';
import { FESTIVAL_CONFIG } from '../config';
import { soundManager } from '../utils/audio';

// Custom inline SVGs for social platforms
const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5V10.13H5.07V18.5h2.79z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer({ onOpenRegisterModal }) {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Interface', href: '#interface' },
    { label: 'Register', href: '#register' },
  ];

  return (
    <footer className="relative bg-[#030508] border-t border-white/10 text-slate-400 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Organization (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0E1526] border border-[#00F0FF]/30 text-[#00F0FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg text-white tracking-wider flex items-center gap-2">
                  ROBOTiX <span className="text-[#00F0FF] text-xs font-mono px-1.5 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30">CLUB</span>
                </span>
                <span className="font-tech text-xs tracking-widest text-slate-400 uppercase">
                  NIT RAIPUR
                </span>
              </div>
            </div>

            <p className="font-display font-bold text-sm tracking-wider text-slate-300 uppercase">
              "{FESTIVAL_CONFIG.tagline}"
            </p>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-tech">
              The premier robotics and hardware innovation student body at National Institute of Technology, Raipur.
            </p>
          </div>

          {/* Quick Navigation Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-tech text-xs uppercase tracking-widest text-white">
              // QUICK LINKS
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => soundManager.playClick()}
                    onMouseEnter={() => soundManager.playHover()}
                    className="hover:text-[#00F0FF] transition-colors font-medium flex items-center gap-1.5 py-1"
                  >
                    <span className="text-slate-600 text-xs">/</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-tech text-xs uppercase tracking-widest text-white">
              // CONNECT
            </h4>
            <div className="flex items-center gap-2.5">
              {FESTIVAL_CONFIG.socialLinks.github && (
                <a
                  href={FESTIVAL_CONFIG.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0A0F1A] border border-white/10 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </a>
              )}
              {FESTIVAL_CONFIG.socialLinks.linkedin && (
                <a
                  href={FESTIVAL_CONFIG.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0A0F1A] border border-white/10 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              )}
              {FESTIVAL_CONFIG.socialLinks.instagram && (
                <a
                  href={FESTIVAL_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0A0F1A] border border-white/10 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              )}
              {FESTIVAL_CONFIG.socialLinks.twitter && (
                <a
                  href={FESTIVAL_CONFIG.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0A0F1A] border border-white/10 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                  aria-label="Twitter / X"
                >
                  <TwitterIcon />
                </a>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 font-tech text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>BACK TO TOP</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-tech text-slate-500 gap-4">
          <div>
            © {FESTIVAL_CONFIG.year} ROBOTiX Club, NIT Raipur. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>NEON FRONTIER</span>
            <span>•</span>
            <span className="text-[#00F0FF]">THE FUTURE IS ENGINEERED</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
