import React, { useState } from 'react';
import EventCard from './EventCard';
import { FESTIVAL_CONFIG } from '../config';
import { ShieldAlert, X, Zap, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
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
      className="relative py-24 md:py-36 bg-[#060A12] border-t border-white/5 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0E1626] border border-[#00F0FF]/30 text-[#00F0FF] font-tech text-xs tracking-widest uppercase mb-4">
              <span>02 / CHOOSE YOUR BATTLE</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
              ENGINEER YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#FF6B00]">
                OWN ADVANTAGE.
              </span>
            </h2>
          </div>

          {/* Illustrative Concept Label Notice */}
          <div className="md:text-right max-w-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0C1424] border border-white/10 text-slate-300 font-tech text-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
              <span>PROPOSED FESTIVAL CONCEPTS</span>
            </div>
            <p className="mt-2 text-xs font-tech text-slate-500">
              Curated competition formats designed to showcase multidisciplinary engineering rigor.
            </p>
          </div>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {FESTIVAL_CONFIG.events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onSelect={(evt) => setSelectedEvent(evt)} 
            />
          ))}
        </div>

      </div>

      {/* Interactive Event Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-2xl rounded-2xl bg-[#090E1A] border border-[#00F0FF]/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] p-6 sm:p-8 overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#0E1729] text-slate-400 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10">
              <div className="flex items-center gap-2 font-tech text-xs text-[#00F0FF] tracking-wider uppercase">
                <span>EVENT {selectedEvent.number}</span>
                <span>•</span>
                <span>{selectedEvent.badge}</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                {selectedEvent.title}
              </h3>

              <div className="font-tech text-xs text-[#FF6B00] tracking-widest uppercase">
                // {selectedEvent.tagline}
              </div>
            </div>

            {/* Modal Description */}
            <p className="mt-5 text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedEvent.description}
            </p>

            {/* Technical Specifications Matrix */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
              <h4 className="font-tech text-xs uppercase tracking-wider text-slate-400">
                // BENCHMARK ENGINEERING SPECS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedEvent.specifications.map((spec, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#0D1526] border border-white/10 flex flex-col justify-between">
                    <span className="text-[11px] font-tech text-slate-400">{spec.label}</span>
                    <span className="text-sm font-tech font-bold text-white mt-1">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="font-tech text-xs text-slate-500">
                Official rules released with festival registration.
              </div>

              <button
                onClick={() => {
                  handleCloseModal();
                  if (onOpenRegisterModal) onOpenRegisterModal();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#05070B] font-display font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all"
              >
                <span>REGISTER INTEREST</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
