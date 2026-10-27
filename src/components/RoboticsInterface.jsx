import React, { useState } from 'react';
import { Power, Terminal, Cpu, Activity, Zap, Radio, Gauge, Eye, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

    // Simulated staggered boot sequence with sound
    setTimeout(() => {
      soundManager.playSystemBoot();
      setSystemState('SYSTEM ONLINE');
      setPowerLevel(98);
      setLogs((prev) => [
        { id: Date.now() + 1, time: '00:00:05', text: 'STATUS_UPDATE: ALL SUBSYSTEMS GREEN. SYSTEM ONLINE.' },
        { id: Date.now(), time: '00:00:04', text: 'TELEMETRY_LINK: 2.4GHz low-latency telemetry locked at 1.2ms.' },
        ...prev.slice(0, 6),
      ]);
    }, 1200);
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
      className="relative py-24 md:py-36 bg-[#18253B]/70 border-t border-slate-600/50 overflow-hidden"
    >
      {/* Background glow and dots */}
      <div className="absolute inset-0 bg-cyber-dots opacity-45 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#00F0FF]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#243553] border border-[#00F0FF]/40 text-[#00F0FF] font-tech text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span>INTERACTIVE TESTBED // FRONTEND SIMULATION</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
            INITIALIZE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-sky-200 to-[#FF6B00]">
              CURIOSITY.
            </span>
          </h2>

          <p className="mt-5 text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Interact with the simulated festival telemetry console. Test hardware status channels, trigger diagnostics, and initialize system modules.
          </p>
          <div className="mt-2 text-xs font-tech text-slate-400">
            * Frontend-only simulation for demonstration and conceptual exploration.
          </div>
        </motion.div>

        {/* Futuristic Control Console Dashboard with Lighter Slate Finish */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-slate-600/80 bg-[#202F4B] backdrop-blur-xl shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          
          {/* Top Console Status Bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-600/80 gap-4">
            
            {/* System Status Pill */}
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{
                  scale: isOnline ? [1, 1.25, 1] : 1,
                  boxShadow: isOnline 
                    ? ['0 0 10px #00F0FF', '0 0 25px #00F0FF', '0 0 10px #00F0FF']
                    : 'none',
                }}
                transition={{ duration: 1.5, repeat: isOnline ? Infinity : 0 }}
                className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${
                  isOnline 
                    ? 'bg-[#00F0FF]' 
                    : isInitializing
                    ? 'bg-[#FF6B00] animate-ping'
                    : 'bg-slate-500'
                }`} 
              />
              <div className="flex flex-col">
                <span className="font-tech text-[10px] text-slate-400 uppercase tracking-widest font-bold">SYSTEM STATUS</span>
                <span 
                  className={`font-display font-black text-base sm:text-lg tracking-wider ${
                    isOnline ? 'text-[#00F0FF]' : isInitializing ? 'text-[#FF8833]' : 'text-slate-300'
                  }`}
                >
                  {systemState}
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar with Visualizer Equalizer */}
            <div className="flex items-center gap-6 font-tech text-xs">
              {/* Animated Audio/Frequency Equalizer Bars */}
              <div className="hidden md:flex items-center gap-1 h-6 px-2.5 py-1 rounded bg-[#182337] border border-slate-600">
                {[0.4, 0.8, 0.5, 0.9, 0.3, 0.7].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#00F0FF] rounded-full"
                    animate={{
                      height: isOnline ? [4, 18 * height, 6] : 4,
                    }}
                    transition={{
                      duration: 0.6 + i * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              <div className="hidden sm:flex flex-col">
                <span className="text-slate-400 uppercase text-[10px] font-semibold">POWER BUS</span>
                <span className="text-white font-bold">{powerLevel}% LOAD</span>
              </div>

              <div className="hidden sm:flex flex-col">
                <span className="text-slate-400 uppercase text-[10px] font-semibold">BUS FREQ</span>
                <span className="text-[#00F0FF] font-bold">{isOnline ? '4.80 GHz' : '0.80 GHz'}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-400 uppercase text-[10px] font-semibold">LINK PING</span>
                <span className={isOnline ? 'text-emerald-400 font-bold' : 'text-slate-300 font-bold'}>
                  {isOnline ? '1.2 ms' : 'DISCONNECTED'}
                </span>
              </div>
            </div>

            {/* Primary Action Button: "INITIALIZE SYSTEM" */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInitialize}
              onMouseEnter={() => soundManager.playHover()}
              disabled={isInitializing}
              type="button"
              className={`relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-display font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg ${
                isOnline
                  ? 'bg-[#1E2D4A] text-[#00F0FF] border border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                  : isInitializing
                  ? 'bg-[#FF6B00]/25 text-[#FF8833] border border-[#FF6B00] cursor-wait'
                  : 'bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#0B1120] shadow-[0_0_25px_rgba(0,240,255,0.4)]'
              }`}
            >
              <Power className={`w-4 h-4 ${isInitializing ? 'animate-spin' : ''}`} />
              <span>
                {isOnline ? 'DEACTIVATE CONSOLE' : isInitializing ? 'BOOTING MATRIX...' : 'INITIALIZE SYSTEM'}
              </span>
            </motion.button>

          </div>

          {/* Main Console Centerpiece: 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
            
            {/* Left: Central Robotic HUD Technical Visualizer (7 cols) */}
            <div className="lg:col-span-7 rounded-xl bg-[#182337] border border-slate-600 p-5 sm:p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[320px] shadow-inner">
              
              {/* Scanline Effect */}
              {isOnline && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/10 to-transparent h-20 w-full animate-scanline pointer-events-none" />}

              {/* Dynamic Radial Visualizer */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Outer Ring with Continuous Rotation */}
                <motion.div 
                  className="absolute inset-0 rounded-full border border-dashed border-[#00F0FF]/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />

                {/* Inner Counter-Rotating Ring */}
                <motion.div 
                  className="absolute inset-6 rounded-full border border-[#FF6B00]/40"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />

                {/* Center Schematic Node */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                  <motion.div 
                    animate={{
                      scale: isOnline ? [1, 1.08, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: isOnline ? Infinity : 0 }}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center border transition-colors duration-500 shadow-xl ${
                      isOnline 
                        ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.4)]' 
                        : 'bg-[#243553] border-slate-500 text-slate-300'
                    }`}
                  >
                    <Cpu className="w-10 h-10" />
                  </motion.div>

                  <span className="mt-3 font-tech text-xs text-white font-bold tracking-wider">
                    {isOnline ? 'ROBOTIC TELEMETRY ACTIVE' : 'SYSTEM STANDBY'}
                  </span>
                  <span className="font-tech text-[10px] text-slate-300">
                    {isOnline ? 'CHASSIS_NODE: ONLINE' : 'PRESS INITIALIZE TO ENGAGE'}
                  </span>
                </div>

                {/* Corner Crosshairs */}
                <div className="absolute top-2 left-2 text-[#00F0FF] font-mono text-[9px] font-bold">+ RF_26</div>
                <div className="absolute top-2 right-2 text-[#00F0FF] font-mono text-[9px] font-bold">// NITRR</div>
                <div className="absolute bottom-2 left-2 text-[#00F0FF] font-mono text-[9px] font-bold">[ACTIVE]</div>
                <div className="absolute bottom-2 right-2 text-[#00F0FF] font-mono text-[9px] font-bold">48V DC</div>
              </div>

              {/* Subsystem Toggles below visualizer */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-4 border-t border-slate-700">
                {subsystems.map((sub) => {
                  const Icon = sub.icon;
                  const isCurrent = activeSubsystem === sub.id;
                  return (
                    <motion.button
                      key={sub.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveSubsystem(sub.id);
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`p-2.5 rounded-lg border text-left transition-all duration-200 shadow-sm ${
                        isCurrent 
                          ? 'bg-[#1E2E4E] border-[#00F0FF] text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                          : 'bg-[#202F4B] border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-tech font-semibold">
                        <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#00F0FF]' : 'text-slate-400'}`} />
                        <span>{sub.name}</span>
                      </div>
                      <div className="text-[10px] font-tech text-slate-300 mt-1 truncate">
                        {sub.stat}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

            </div>

            {/* Right: Simulated Real-time Diagnostic Log Stream (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="flex items-center justify-between font-tech text-xs text-slate-300">
                <div className="flex items-center gap-2 text-[#00F0FF] font-bold">
                  <Terminal className="w-4 h-4 animate-pulse" />
                  <span>LIVE_DIAGNOSTIC_FEED</span>
                </div>
                <span className="text-[10px] text-slate-400">AUTO_STREAM</span>
              </div>

              {/* Terminal Log Console */}
              <div className="rounded-xl bg-[#141E30] border border-slate-600 p-4 font-tech text-xs space-y-2 h-[260px] overflow-y-auto shadow-inner">
                {logs.map((log) => (
                  <motion.div 
                    key={log.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="leading-relaxed flex gap-2"
                  >
                    <span className="text-slate-500 select-none">[{log.time}]</span>
                    <span className={log.text.includes('ONLINE') ? 'text-emerald-400 font-bold' : log.text.includes('STANDBY') ? 'text-slate-300' : 'text-[#00F0FF]'}>
                      {log.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Status Indicators Strip */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-xl bg-[#243553] border border-slate-600 flex items-center justify-between shadow-md"
                >
                  <div className="flex flex-col">
                    <span className="font-tech text-[10px] text-slate-300 font-semibold">SENSOR MESH</span>
                    <span className="font-tech text-xs font-bold text-white">
                      {isOnline ? '16/16 SYNC' : 'STANDBY'}
                    </span>
                  </div>
                  <ShieldCheck className={`w-5 h-5 ${isOnline ? 'text-[#00F0FF]' : 'text-slate-400'}`} />
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-xl bg-[#243553] border border-slate-600 flex items-center justify-between shadow-md"
                >
                  <div className="flex flex-col">
                    <span className="font-tech text-[10px] text-slate-300 font-semibold">PWM OVERDRIVE</span>
                    <span className="font-tech text-xs font-bold text-white">
                      {isOnline ? 'ARMED' : 'DISARMED'}
                    </span>
                  </div>
                  <Gauge className={`w-5 h-5 ${isOnline ? 'text-[#FF6B00]' : 'text-slate-400'}`} />
                </motion.div>
              </div>

            </div>

          </div>

          {/* Console Footer */}
          <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between text-xs font-tech text-slate-400 gap-3">
            <span>ROBOFEST 2026 // ENGINEERING WORKBENCH</span>
            <span>SIMULATION_ID: RF-NITRR-04</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
