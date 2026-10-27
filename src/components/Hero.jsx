import React from 'react';
import { ArrowDownRight, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import HeroVisual from './HeroVisual';
import { FESTIVAL_CONFIG } from '../config';
import { soundManager } from '../utils/audio';

export default function Hero({ onOpenRegisterModal }) {
  return (
    <section 
      id="hero" 
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Asymmetrical Editorial 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & Oversized Typography (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
            
            {/* Status & Organizer Pill Header */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1527] border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] sm:text-xs font-tech tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <span>ROBOTiX CLUB • NIT RAIPUR PRESENTS</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-[10px] sm:text-xs font-tech tracking-wider uppercase">
                <Sparkles className="w-3 h-3" />
                <span>{FESTIVAL_CONFIG.statusLabel}</span>
              </div>
            </div>

            {/* Main Headline: Oversized, Bold, Visually Dominant, No Overflow */}
            <div className="space-y-1">
              <h1 className="font-display font-black tracking-tight leading-[0.96] text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-white break-words">
                THE FUTURE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#FF6B00] drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]">
                  IS ENGINEERED.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl">
              Where imagination meets intelligence. Build extraordinary machines, challenge conventional thinking, and experience the next frontier of robotics.
            </p>

            {/* Technical Sub-telemetry strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 pb-2 border-y border-white/10 max-w-lg font-tech text-xs">
              <div className="space-y-0.5">
                <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-wider">// PLATFORM</div>
                <div className="text-white font-semibold text-[11px] sm:text-xs flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-[#00F0FF]" /> ROBOFEST '26
                </div>
              </div>
              <div className="space-y-0.5 border-x border-white/10 px-2 sm:px-3">
                <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-wider">// HOST CLUB</div>
                <div className="text-white font-semibold text-[11px] sm:text-xs">ROBOTiX</div>
              </div>
              <div className="space-y-0.5 pl-1">
                <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-wider">// ENVIRONMENT</div>
                <div className="text-[#00F0FF] font-semibold text-[11px] sm:text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" /> ARENA READY
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
              {/* Primary CTA */}
              <a
                href="#events"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="group relative inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#00F0FF] text-[#05070B] font-display font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#38BDF8] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] transform hover:-translate-y-0.5"
              >
                <span>EXPLORE EVENTS</span>
                <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#interface"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="group inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#0D1527] hover:bg-[#14203B] text-white border border-[#00F0FF]/30 hover:border-[#00F0FF] font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transform hover:-translate-y-0.5"
              >
                <span>ENTER THE ARENA</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6B00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Futuristic Robotics Visual (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <HeroVisual />
          </div>

        </div>

      </div>

      {/* Decorative Bottom Boundary Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
    </section>
  );
}
