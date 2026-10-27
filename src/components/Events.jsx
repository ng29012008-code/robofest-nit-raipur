import React, { useState } from 'react';
import EventCard from './EventCard';
import { FESTIVAL_CONFIG } from '../config';
import { ShieldAlert, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/audio';

export default function Events({ onOpenRegisterModal }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCloseModal = () => {
    soundManager.playClick();
    setSelectedEvent(null);
  };

  return (
    <section 
      id="events" 
      className="relative py-24 md:py-36 bg-[#0F172A] border-t border-slate-700/50 overflow-hidden"
    >
      {/* Background glow effects with higher radiance */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-[#00F0FF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] bg-[#FF6B00]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1E293B] border border-[#00F0FF]/40 text-[#00F0FF] font-tech text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span>02 / CHOOSE YOUR BATTLE</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
              ENGINEER YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#FF6B00]">
                OWN ADVANTAGE.
              </span>
            </h2>
          </div>

          {/* Illustrative Concept Label Notice */}
          <div className="md:text-right max-w-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-slate-700 text-slate-200 font-tech text-xs shadow-md">
              <ShieldAlert className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
              <span className="font-semibold">PROPOSED FESTIVAL CONCEPTS</span>
            </div>
            <p className="mt-2 text-xs font-tech text-slate-300">
              Curated competition formats designed to showcase multidisciplinary engineering rigor.
            </p>
          </div>
        </motion.div>

        {/* 3-Column Responsive Grid with Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {FESTIVAL_CONFIG.events.map((event, idx) => (
            <EventCard 
              key={event.id} 
              event={event} 
              index={idx}
              onSelect={(evt) => setSelectedEvent(evt)} 
            />
          ))}
        </div>

      </div>

      {/* Interactive Event Detail Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedEvent && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl rounded-2xl bg-[#142037] border border-[#00F0FF]/50 shadow-[0_0_50px_rgba(0,240,255,0.3)] p-6 sm:p-8 overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#1E2D4A] text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-10">
                <div className="flex items-center gap-2 font-tech text-xs text-[#00F0FF] font-bold tracking-wider uppercase">
                  <span>EVENT {selectedEvent.number}</span>
                  <span>•</span>
                  <span>{selectedEvent.badge}</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                  {selectedEvent.title}
                </h3>

                <div className="font-tech text-xs text-[#FF8833] font-bold tracking-widest uppercase">
                  // {selectedEvent.tagline}
                </div>
              </div>

              {/* Modal Description */}
              <p className="mt-5 text-slate-200 text-sm sm:text-base leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="mt-6 pt-5 border-t border-slate-700 space-y-3">
                <h4 className="font-tech text-xs uppercase tracking-wider text-slate-300 font-semibold">
                  // BENCHMARK ENGINEERING SPECS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedEvent.specifications.map((spec, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-[#1A2846] border border-slate-700 flex flex-col justify-between">
                      <span className="text-[11px] font-tech text-slate-300">{spec.label}</span>
                      <span className="text-sm font-tech font-bold text-white mt-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-6 border-t border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div className="font-tech text-xs text-slate-300">
                  Official rules released with festival registration.
                </div>

                <button
                  onClick={() => {
                    handleCloseModal();
                    if (onOpenRegisterModal) onOpenRegisterModal();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#0B1120] font-display font-black text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all"
                >
                  <span>REGISTER INTEREST</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
