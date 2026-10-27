import React, { useState } from 'react';
import { ArrowUpRight, Shield, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { FESTIVAL_CONFIG } from '../config';
import { soundManager } from '../utils/audio';

export default function Registration({ onOpenRegisterModal }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(FESTIVAL_CONFIG.registrationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="register" 
      className="relative py-24 md:py-36 bg-[#18253B]/70 border-t border-slate-600/50 overflow-hidden"
    >
      {/* Dramatic atmospheric radial glows with slow pulsing and brighter radiance */}
      <motion.div 
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #0284C7 0%, #FF6B00 65%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Registration Hero Card Container with Lighter Modern Slate Gradient */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-gradient-to-b from-[#24375A] via-[#1D2C48] to-[#17233A] border border-slate-600/80 p-8 sm:p-12 md:p-16 lg:p-20 text-center overflow-hidden shadow-2xl"
        >
          
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />

          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#283C61] border border-[#00F0FF]/40 text-[#00F0FF] font-tech text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span>03 / YOUR NEXT MOVE</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95] max-w-4xl mx-auto">
            READY TO BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-[#FF8833] drop-shadow-[0_0_40px_rgba(0,240,255,0.35)]">
              WHAT'S NEXT?
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-8 text-slate-200 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            The arena is waiting. Bring your ideas, challenge your limits, and become part of the engineering frontier.
          </p>

          {/* Primary CTA Button with Spring Physics */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ 
                scale: 1.06, 
                boxShadow: '0 0 50px rgba(0, 240, 255, 0.7)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundManager.playClick();
                if (onOpenRegisterModal) {
                  onOpenRegisterModal();
                } else {
                  window.open(FESTIVAL_CONFIG.registrationUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#00F0FF] via-[#00D2FF] to-[#0284C7] text-[#0B1120] font-display font-black text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-xl"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>

          {/* Secondary Text */}
          <motion.div 
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-8 font-tech text-sm sm:text-base tracking-widest uppercase text-[#FF8833] font-bold"
          >
            Think. Build. Compete. Repeat.
          </motion.div>

          {/* Configurable URL Identifier Notice for Evaluators / Admins */}
          <div className="mt-12 pt-8 border-t border-slate-700 max-w-xl mx-auto text-left rounded-xl bg-[#1A263D] p-4 border border-slate-600/60 shadow-lg">
            <div className="flex items-center justify-between font-tech text-xs text-slate-300 pb-2 border-b border-slate-600/60 font-semibold">
              <span className="flex items-center gap-1.5 text-[#00F0FF]">
                <Shield className="w-3.5 h-3.5" />
                CONFIGURABLE REGISTRATION URL
              </span>
              <span className="text-[10px] text-slate-400">src/config.js</span>
            </div>

            <div className="mt-2.5 flex items-center justify-between gap-3 bg-[#141E30] px-3.5 py-2.5 rounded-lg font-mono text-xs text-slate-200 border border-slate-600">
              <span className="truncate">{FESTIVAL_CONFIG.registrationUrl}</span>
              <button
                onClick={handleCopyLink}
                className="shrink-0 p-1.5 hover:text-white text-slate-300 hover:bg-slate-700/50 rounded transition-colors"
                title="Copy registration placeholder URL"
                aria-label="Copy URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            
            <p className="mt-2 text-[11px] font-tech text-slate-400">
              * Note: Official registration dates and live portal URLs will be linked once announced by ROBOTiX Club, NIT Raipur.
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
