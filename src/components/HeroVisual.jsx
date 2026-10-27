import React, { useState } from 'react';
import { Activity, Crosshair, Zap } from 'lucide-react';

export default function HeroVisual() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Interactive subtle mouse parallax on desktop
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative w-full max-w-xl mx-auto lg:max-w-none aspect-[4/3] sm:aspect-square lg:aspect-[5/4] flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Glow Halo with Brighter, Warmer Illumination */}
      <div 
        className="absolute inset-4 rounded-3xl opacity-60 blur-3xl transition-transform duration-700 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 40%, #00F0FF 0%, #0284C7 45%, #FF6B00 80%, transparent 100%)',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        }}
      />

      {/* Cybernetic Frame Container with Lighter Modern Slate Panel */}
      <div 
        className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/80 bg-[#131C31] shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
        }}
      >
        {/* Raster Image Asset with luminous blend */}
        <img
          src="/images/hero-robot.jpg"
          alt="ROBOFEST Futuristic Autonomous Android Core"
          className="w-full h-full object-cover object-center opacity-95 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Gradient Vignette with lighter navy falloff */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/40 via-transparent to-[#0F172A]/30 pointer-events-none" />

        {/* Technical HUD Interface Markings & Overlay */}
        <div className="absolute inset-0 pointer-events-none p-5 sm:p-6 flex flex-col justify-between">
          
          {/* Top Bar HUD */}
          <div className="flex items-center justify-between font-tech text-[10px] sm:text-xs">
            <div className="flex items-center gap-2 bg-[#17233D]/90 px-3 py-1.5 rounded-lg border border-[#00F0FF]/50 text-[#00F0FF] shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
              <span className="font-bold">CORE_UNIT: RF-2026 // ONLINE</span>
            </div>
            <div className="text-slate-200 bg-[#17233D]/90 px-3 py-1.5 rounded-lg border border-slate-600/80 hidden sm:flex items-center gap-1.5 shadow-lg backdrop-blur-md">
              <Crosshair className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="font-semibold">FOV: 124.6° REC</span>
            </div>
          </div>

          {/* Center Crosshair Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-40 pointer-events-none">
            <div className="w-28 h-28 border border-dashed border-[#00F0FF]/70 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="flex flex-wrap items-end justify-between gap-3 font-tech text-[10px] sm:text-xs">
            <div className="space-y-1 bg-[#17233D]/90 p-2.5 rounded-lg border border-slate-600/80 shadow-lg backdrop-blur-md">
              <div className="text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>SYNC RATE: <strong className="text-white font-bold">99.8%</strong></span>
              </div>
              <div className="text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>CHASSIS TORQUE: <strong className="text-white font-bold">420 Nm</strong></span>
              </div>
            </div>

            <div className="text-right bg-[#17233D]/90 px-3 py-2 rounded-lg border border-[#00F0FF]/40 shadow-lg backdrop-blur-md">
              <div className="text-[10px] uppercase tracking-widest text-[#00F0FF] font-bold">ROBOTiX CLUB LABS</div>
              <div className="text-white font-bold">NIT RAIPUR CORE</div>
            </div>
          </div>

        </div>

        {/* Framing corner brackets */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00F0FF]" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00F0FF]" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00F0FF]" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00F0FF]" />

      </div>
    </div>
  );
}
