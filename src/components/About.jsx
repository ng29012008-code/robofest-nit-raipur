import React, { useState } from 'react';
import { Cpu, Flame, Sparkles, CheckCircle2, ChevronRight, Binary, Crosshair } from 'lucide-react';
import { FESTIVAL_CONFIG } from '../config';
import { soundManager } from '../utils/audio';

export default function About() {
  const [activeTab, setActiveTab] = useState(0);

  const highlights = [
    {
      number: "01",
      title: "BUILD",
      subtitle: "HARDWARE & ARCHITECTURE",
      description: "From structural CAD blueprints and high-torque kinematics to micro-controller logic, brushless ESC calibration, and precision circuit design.",
      specs: ["Modular chassis engineering", "Power distribution & telemetry", "Embedded RTOS & firmware"],
      icon: Cpu,
      color: "#00F0FF",
      schematicPart: "CHASSIS & KINEMATICS"
    },
    {
      number: "02",
      title: "COMPETE",
      subtitle: "TACTICAL ARENA PRESSURE",
      description: "Pushing machines to their mechanical breaking point against formidable opponents in high-stakes arena combat and velocity trials.",
      specs: ["High-impact armor rating", "Millisecond radio telemetry", "Real-time pilot control"],
      icon: Flame,
      color: "#FF6B00",
      schematicPart: "ACTUATION & DRIVETRAIN"
    },
    {
      number: "03",
      title: "INNOVATE",
      subtitle: "AUTONOMOUS FRONTIER",
      description: "Infusing machines with computer vision, deep sensor fusion, and algorithmic decision trees to solve uncharted real-world problems.",
      specs: ["Edge AI inference engines", "Stereo vision depth mapping", "Adaptive pathing heuristics"],
      icon: Sparkles,
      color: "#00F0FF",
      schematicPart: "NEURAL LOGIC & VISION"
    }
  ];

  return (
    <section 
      id="about" 
      className="relative py-24 md:py-36 bg-[#05070B] overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0E1626] border border-[#00F0FF]/30 text-[#00F0FF] font-tech text-xs tracking-widest uppercase mb-4">
            <span>01 / THE VISION</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
            BEYOND CIRCUITS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00F0FF]">
              BEYOND LIMITS.
            </span>
          </h2>

          <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            ROBOFEST is a celebration of robotics, engineering, and innovation. It brings together curious minds who love building, experimenting, solving problems, and transforming ideas into working technology.
          </p>
        </div>

        {/* 2-Column Engaging Layout: Technical Illustration & Visual Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left: Interactive Technical CAD Blueprint / Robotic Assembly Visual (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-2xl border border-white/10 bg-[#090E1A]/90 p-6 sm:p-8 flex-1 flex flex-col justify-between overflow-hidden group">
              
              {/* Technical Blueprint Grid & HUD markings */}
              <div className="absolute inset-0 bg-cyber-grid opacity-40 pointer-events-none" />
              
              {/* Card Header HUD */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10 font-tech text-xs">
                <div className="flex items-center gap-2 text-[#00F0FF]">
                  <Binary className="w-4 h-4" />
                  <span>CAD_SPEC // UNIT_X86_SYSTEM</span>
                </div>
                <div className="text-slate-400">
                  SUBSYSTEM: <span className="text-white font-bold">{highlights[activeTab].schematicPart}</span>
                </div>
              </div>

              {/* Technical Blueprint SVG Illustration */}
              <div className="relative my-8 py-6 flex items-center justify-center">
                <svg viewBox="0 0 600 320" className="w-full h-auto max-h-[300px] text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Lines */}
                  <line x1="50" y1="160" x2="550" y2="160" stroke="#00F0FF" strokeWidth="0.75" strokeDasharray="4 4" strokeOpacity="0.3" />
                  <line x1="300" y1="30" x2="300" y2="290" stroke="#00F0FF" strokeWidth="0.75" strokeDasharray="4 4" strokeOpacity="0.3" />

                  {/* Central Main Robotic Core Housing */}
                  <rect x="210" y="80" width="180" height="160" rx="12" fill="#0C1527" stroke="#00F0FF" strokeWidth="2" />
                  <rect x="230" y="100" width="140" height="120" rx="8" fill="#070C16" stroke={highlights[activeTab].color} strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Internal Processor / Neural Node */}
                  <circle cx="300" cy="160" r="30" fill={highlights[activeTab].color} fillOpacity="0.15" stroke={highlights[activeTab].color} strokeWidth="2" className="animate-pulse" />
                  <circle cx="300" cy="160" r="12" fill={highlights[activeTab].color} />
                  
                  {/* Dynamic Hotspot Callout based on active tab */}
                  {activeTab === 0 && (
                    <g className="transition-all duration-300">
                      {/* Chassis & Kinematics Frame */}
                      <rect x="130" y="50" width="340" height="220" rx="16" stroke="#00F0FF" strokeWidth="2" strokeDasharray="8 6" />
                      <circle cx="130" cy="50" r="5" fill="#00F0FF" />
                      <circle cx="470" cy="50" r="5" fill="#00F0FF" />
                      <circle cx="130" cy="270" r="5" fill="#00F0FF" />
                      <circle cx="470" cy="270" r="5" fill="#00F0FF" />
                      <text x="145" y="45" fill="#00F0FF" fontSize="12" fontFamily="JetBrains Mono">STRUCTURAL_TOLERANCE: &lt;0.02mm</text>
                    </g>
                  )}

                  {activeTab === 1 && (
                    <g className="transition-all duration-300">
                      {/* Heavy Combat Actuators & Drivetrain */}
                      <rect x="90" y="110" width="80" height="100" rx="8" fill="#141E30" stroke="#FF6B00" strokeWidth="2" />
                      <rect x="430" y="110" width="80" height="100" rx="8" fill="#141E30" stroke="#FF6B00" strokeWidth="2" />
                      <line x1="170" y1="160" x2="210" y2="160" stroke="#FF6B00" strokeWidth="4" />
                      <line x1="390" y1="160" x2="430" y2="160" stroke="#FF6B00" strokeWidth="4" />
                      <text x="75" y="95" fill="#FF6B00" fontSize="12" fontFamily="JetBrains Mono">TORQUE_ACTUATOR: 680Nm</text>
                      <text x="390" y="95" fill="#FF6B00" fontSize="12" fontFamily="JetBrains Mono">PWM_FREQ: 24kHz</text>
                    </g>
                  )}

                  {activeTab === 2 && (
                    <g className="transition-all duration-300">
                      {/* Sensor & Vision Raycast Matrix */}
                      <path d="M300 80 L220 20 M300 80 L380 20 M300 80 L300 15" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 2" />
                      <circle cx="300" cy="15" r="7" fill="#00F0FF" />
                      <circle cx="220" cy="20" r="5" fill="#00F0FF" />
                      <circle cx="380" cy="20" r="5" fill="#00F0FF" />
                      <text x="210" y="12" fill="#00F0FF" fontSize="12" fontFamily="JetBrains Mono">VISION_FOV: STEREO LIDAR</text>
                    </g>
                  )}

                  {/* Corner dimension ticks */}
                  <path d="M60 40 H100 M60 40 V80" stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.5" />
                  <path d="M540 40 H500 M540 40 V80" stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.5" />
                  <path d="M60 280 H100 M60 280 V240" stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.5" />
                  <path d="M540 280 H500 M540 280 V240" stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.5" />
                </svg>
              </div>

              {/* Bottom Card Footer Status */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-tech text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: highlights[activeTab].color }} />
                  <span>SUBSYSTEM STATUS: OPTIMAL</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  CLICK HIGHLIGHTS TO INSPECT MODULE
                </div>
              </div>

            </div>
          </div>

          {/* Right: The Three Visual Highlights (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === index;
              return (
                <div
                  key={item.number}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(index);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`cursor-pointer rounded-xl p-5 sm:p-6 transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#0E1729] border-[#00F0FF]/50 shadow-[0_0_25px_rgba(0,240,255,0.15)] translate-x-1 sm:translate-x-2'
                      : 'bg-[#0A0F1A]/70 border-white/10 hover:border-white/20 hover:bg-[#0D1525]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-lg flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: isActive ? `${item.color}15` : '#070C16',
                        borderColor: isActive ? item.color : 'rgba(255,255,255,0.1)',
                        color: item.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-tech text-xs tracking-widest text-slate-400">
                          {item.number} — {item.subtitle}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 text-[#00F0FF]' : 'text-slate-600'}`} />
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                        {item.title}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-1">
                        {item.description}
                      </p>

                      {/* Expandable specs when active */}
                      {isActive && (
                        <div className="pt-3 mt-3 border-t border-white/10 space-y-1.5 animate-fadeIn">
                          {item.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2 text-xs font-tech text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
