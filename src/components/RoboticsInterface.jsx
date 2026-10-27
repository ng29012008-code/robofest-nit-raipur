import React, { useState, useEffect } from 'react';
import { Power, Terminal, Cpu, Activity, Zap, RefreshCw, Radio, Gauge, Eye, ShieldCheck, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function RoboticsInterface() {
  const [systemState, setSystemState] = useState('STANDBY'); // 'STANDBY' | 'INITIALIZING' | 'SYSTEM ONLINE'
  const [activeSubsystem, setActiveSubsystem] = useState('actuators'); // 'actuators' | 'vision' | 'neural' | 'telemetry'
  const [powerLevel, setPowerLevel] = useState(35);
  const [logs, setLogs] = useState([
    { id: 1, time: '00:00:01', text: 'KERNEL_STANDBY: Awaiting operator initialization command...' },
    { id: 2, time: '00:00:02', text: 'HARDWARE_BUS: 48V DC bus idling at nominal 12.4V test load.' },
  ]);

  const isOnline = systemState === 'SYSTEM ONLINE';
  const isInitializing = systemState === 'INITIALIZING';

  const handleInitialize = () => {
    if (isOnline) {
      // Toggle back to standby
      soundManager.playClick();
      setSystemState('STANDBY');
      setPowerLevel(35);
      setLogs((prev) => [
        { id: Date.now(), time: '00:00:00', text: 'SYSTEM_COMMAND: Unit safely returned to STANDBY mode.' },
        ...prev.slice(0, 5),
      ]);
      return;
    }

    soundManager.playClick();
    setSystemState('INITIALIZING');
    setPowerLevel(65);

    setLogs((prev) => [
      { id: Date.now(), time: '00:00:03', text: 'SYS_BOOT: Initializing high-torque brushless ESCs & neural core...' },
      ...prev,
    ]);

    // Simulated staggered boot sequence
    setTimeout(() => {
      soundManager.playSystemBoot();
      setSystemState('SYSTEM ONLINE');
      setPowerLevel(98);
      setLogs((prev) => [
        { id: Date.now() + 1, time: '00:00:05', text: 'STATUS_UPDATE: ALL SUBSYSTEMS GREEN. SYSTEM ONLINE.' },
        { id: Date.now(), time: '00:00:04', text: 'TELEMETRY_LINK: 2.4GHz low-latency telemetry locked at 1.2ms.' },
        ...prev.slice(0, 6),
      ]);
    }, 1400);
  };

  const subsystems = [
    { id: 'actuators', name: 'Actuators', stat: isOnline ? '640 Nm Active' : 'Idle (0 Nm)', icon: Zap },
    { id: 'vision', name: 'Vision Mesh', stat: isOnline ? '120 FPS Depth Map' : 'Standby (0 FPS)', icon: Eye },
    { id: 'neural', name: 'Neural Core', stat: isOnline ? 'Synapse Active' : 'Dormant', icon: Cpu },
    { id: 'telemetry', name: 'Telemetry RF', stat: isOnline ? '1.2ms Ping Locked' : 'Listening', icon: Radio },
  ];

  return (
    <section 
      id="interface" 
      className="relative py-24 md:py-36 bg-[#05070B] border-t border-white/5 overflow-hidden"
    >
      {/* Background glow and grid */}
      <div className="absolute inset-0 bg-cyber-dots opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0E1626] border border-[#00F0FF]/30 text-[#00F0FF] font-tech text-xs tracking-widest uppercase mb-4">
            <span>INTERACTIVE TESTBED // FRONTEND SIMULATION</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
            INITIALIZE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-sky-300 to-[#FF6B00]">
              CURIOSITY.
            </span>
          </h2>

          <p className="mt-5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Interact with the simulated festival telemetry console. Test hardware status channels, trigger diagnostics, and initialize system modules.
          </p>
          <div className="mt-2 text-xs font-tech text-slate-500">
            * Frontend-only simulation for demonstration and conceptual exploration.
          </div>
        </div>

        {/* Futuristic Control Console Dashboard */}
        <div className="rounded-2xl border border-white/15 bg-[#090E1A]/95 backdrop-blur-xl shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10">
          
          {/* Top Console Status Bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/10 gap-4">
            
            {/* System Status Pill */}
            <div className="flex items-center gap-3">
              <div 
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  isOnline 
                    ? 'bg-[#00F0FF] shadow-[0_0_15px_#00F0FF] animate-pulse' 
                    : isInitializing
                    ? 'bg-[#FF6B00] shadow-[0_0_15px_#FF6B00] animate-ping'
                    : 'bg-slate-600'
                }`} 
              />
              <div className="flex flex-col">
                <span className="font-tech text-[10px] text-slate-400 uppercase tracking-widest">SYSTEM STATUS</span>
                <span 
                  className={`font-display font-black text-base sm:text-lg tracking-wider ${
                    isOnline ? 'text-[#00F0FF]' : isInitializing ? 'text-[#FF6B00]' : 'text-slate-400'
                  }`}
                >
                  {systemState}
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-6 font-tech text-xs">
              <div className="hidden sm:flex flex-col">
                <span className="text-slate-500 uppercase text-[10px]">POWER BUS</span>
                <span className="text-white font-bold">{powerLevel}% LOAD</span>
              </div>

              <div className="hidden sm:flex flex-col">
                <span className="text-slate-500 uppercase text-[10px]">BUS FREQ</span>
                <span className="text-[#00F0FF] font-bold">{isOnline ? '4.80 GHz' : '0.80 GHz'}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-500 uppercase text-[10px]">LINK PING</span>
                <span className={isOnline ? 'text-emerald-400 font-bold' : 'text-slate-400 font-bold'}>
                  {isOnline ? '1.2 ms' : 'DISCONNECTED'}
                </span>
              </div>
            </div>

            {/* Primary Action Button: "INITIALIZE SYSTEM" */}
            <button
              onClick={handleInitialize}
              onMouseEnter={() => soundManager.playHover()}
              disabled={isInitializing}
              type="button"
              className={`relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-display font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 transform active:scale-95 ${
                isOnline
                  ? 'bg-[#0E1729] text-[#00F0FF] border border-[#00F0FF] hover:bg-[#00F0FF]/15 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                  : isInitializing
                  ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00] cursor-wait'
                  : 'bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#05070B] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:-translate-y-0.5'
              }`}
            >
              <Power className={`w-4 h-4 ${isInitializing ? 'animate-spin' : ''}`} />
              <span>
                {isOnline ? 'DEACTIVATE CONSOLE' : isInitializing ? 'BOOTING MATRIX...' : 'INITIALIZE SYSTEM'}
              </span>
            </button>

          </div>

          {/* Main Console Centerpiece: 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
            
            {/* Left: Central Robotic HUD Technical Illustration (7 cols) */}
            <div className="lg:col-span-7 rounded-xl bg-[#060A14] border border-white/10 p-5 sm:p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
              
              {/* Scanline Effect */}
              {isOnline && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/5 to-transparent h-20 w-full animate-scanline pointer-events-none" />}

              {/* Dynamic Radial Visualizer */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Outer Ring */}
                <div 
                  className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
                    isOnline ? 'border-[#00F0FF]/60 animate-spin-slow' : 'border-white/10'
                  }`} 
                />

                {/* Inner Ring */}
                <div 
                  className={`absolute inset-6 rounded-full border transition-all duration-700 ${
                    isOnline ? 'border-[#FF6B00]/50 animate-pulse' : 'border-white/10'
                  }`} 
                />

                {/* Center Schematic Node */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                  <div 
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                      isOnline 
                        ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)]' 
                        : 'bg-[#0A0F1A] border-white/15 text-slate-500'
                    }`}
                  >
                    <Cpu className={`w-10 h-10 transition-transform ${isOnline ? 'scale-110' : 'scale-90'}`} />
                  </div>

                  <span className="mt-3 font-tech text-xs text-white font-bold tracking-wider">
                    {isOnline ? 'ROBOTIC TELEMETRY ACTIVE' : 'SYSTEM STANDBY'}
                  </span>
                  <span className="font-tech text-[10px] text-slate-400">
                    {isOnline ? 'CHASSIS_NODE: ONLINE' : 'PRESS INITIALIZE TO ENGAGE'}
                  </span>
                </div>

                {/* Corner Crosshairs */}
                <div className="absolute top-2 left-2 text-[#00F0FF]/40 font-mono text-[9px]">+ RF_26</div>
                <div className="absolute top-2 right-2 text-[#00F0FF]/40 font-mono text-[9px]">// NITRR</div>
                <div className="absolute bottom-2 left-2 text-[#00F0FF]/40 font-mono text-[9px]">[ACTIVE]</div>
                <div className="absolute bottom-2 right-2 text-[#00F0FF]/40 font-mono text-[9px]">48V DC</div>
              </div>

              {/* Subsystem Toggles below canvas */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-4 border-t border-white/10">
                {subsystems.map((sub) => {
                  const Icon = sub.icon;
                  const isCurrent = activeSubsystem === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveSubsystem(sub.id);
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        isCurrent 
                          ? 'bg-[#0F1A30] border-[#00F0FF] text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                          : 'bg-[#0A0F1A] border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-tech">
                        <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#00F0FF]' : 'text-slate-500'}`} />
                        <span>{sub.name}</span>
                      </div>
                      <div className="text-[10px] font-tech text-slate-400 mt-1 truncate">
                        {sub.stat}
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right: Simulated Real-time Diagnostic Log Stream (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="flex items-center justify-between font-tech text-xs text-slate-400">
                <div className="flex items-center gap-2 text-[#00F0FF]">
                  <Terminal className="w-4 h-4" />
                  <span>LIVE_DIAGNOSTIC_FEED</span>
                </div>
                <span className="text-[10px] text-slate-500">AUTO_REFRESH</span>
              </div>

              {/* Terminal Log Console */}
              <div className="rounded-xl bg-[#04070E] border border-white/10 p-4 font-tech text-xs space-y-2 h-[260px] overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="leading-relaxed flex gap-2">
                    <span className="text-slate-600 select-none">[{log.time}]</span>
                    <span className={log.text.includes('ONLINE') ? 'text-emerald-400' : log.text.includes('STANDBY') ? 'text-slate-400' : 'text-[#00F0FF]'}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status Indicators Strip */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#080E1A] border border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-tech text-[10px] text-slate-400">SENSOR MESH</span>
                    <span className="font-tech text-xs font-bold text-white">
                      {isOnline ? '16/16 SYNC' : 'STANDBY'}
                    </span>
                  </div>
                  <ShieldCheck className={`w-5 h-5 ${isOnline ? 'text-[#00F0FF]' : 'text-slate-600'}`} />
                </div>

                <div className="p-3 rounded-xl bg-[#080E1A] border border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-tech text-[10px] text-slate-400">PWM OVERDRIVE</span>
                    <span className="font-tech text-xs font-bold text-white">
                      {isOnline ? 'ARMED' : 'DISARMED'}
                    </span>
                  </div>
                  <Gauge className={`w-5 h-5 ${isOnline ? 'text-[#FF6B00]' : 'text-slate-600'}`} />
                </div>
              </div>

            </div>

          </div>

          {/* Console Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-tech text-slate-500 gap-3">
            <span>ROBOFEST 2026 // ENGINEERING WORKBENCH</span>
            <span>SIMULATION_ID: RF-NITRR-04</span>
          </div>

        </div>

      </div>
    </section>
  );
}
