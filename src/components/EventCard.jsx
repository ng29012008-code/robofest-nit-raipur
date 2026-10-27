import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function EventCard({ event, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  // Map image path based on event ID
  const imageMap = {
    'robo-wars': '/images/event-robo-wars.jpg',
    'robo-race': '/images/event-robo-race.jpg',
    'ai-challenge': '/images/event-ai-challenge.jpg',
  };

  const currentImage = imageMap[event.id] || '/images/hero-robot.jpg';
  const isOrange = event.accentColor === '#FF6B00';

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        soundManager.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        soundManager.playClick();
        if (onSelect) onSelect(event);
      }}
      className={`group relative flex flex-col justify-between rounded-2xl bg-[#090E1A]/95 border overflow-hidden cursor-pointer transition-all duration-500 transform hover:-translate-y-2 ${
        isHovered
          ? isOrange
            ? 'border-[#FF6B00] shadow-[0_0_35px_rgba(255,107,0,0.3)]'
            : 'border-[#00F0FF] shadow-[0_0_35px_rgba(0,240,255,0.3)]'
          : 'border-white/10 hover:border-white/25 shadow-lg'
      }`}
    >
      {/* Top Visual Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#060A14]">
        {/* Background Image with Hover Scale */}
        <img
          src={currentImage}
          alt={event.title}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 opacity-90"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090E1A] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges & Event Number */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div 
            className="px-2.5 py-1 rounded-md text-[11px] font-tech tracking-wider uppercase border backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(5, 7, 11, 0.85)',
              borderColor: isOrange ? '#FF6B0088' : '#00F0FF88',
              color: isOrange ? '#FF6B00' : '#00F0FF',
            }}
          >
            {event.badge}
          </div>

          <div className="w-8 h-8 rounded-full bg-[#05070B]/85 border border-white/20 flex items-center justify-center font-tech text-xs font-bold text-white">
            {event.number}
          </div>
        </div>

        {/* Tactical Tagline on Image bottom */}
        <div className="absolute bottom-3 left-4 right-4 font-tech text-[10px] tracking-widest uppercase text-slate-300 pointer-events-none">
          // {event.tagline}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          {/* Category */}
          <div className="font-tech text-xs tracking-wider uppercase text-slate-400">
            {event.category}
          </div>

          {/* Title */}
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00F0FF] transition-all">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed font-normal">
            {event.description}
          </p>
        </div>

        {/* Specifications snippet */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          {event.specifications.slice(0, 2).map((spec, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs font-tech">
              <span className="text-slate-400">{spec.label}</span>
              <span className="text-slate-200 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Bottom Action Footer with Animated Arrow */}
        <div className="pt-2 flex items-center justify-between">
          <span 
            className="text-xs font-tech uppercase tracking-wider font-semibold transition-colors"
            style={{ color: isHovered ? (isOrange ? '#FF6B00' : '#00F0FF') : '#94A3B8' }}
          >
            INSPECT ARENA SPECS
          </span>

          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{
              backgroundColor: isHovered ? (isOrange ? '#FF6B00' : '#00F0FF') : '#0E1729',
              borderColor: isHovered ? (isOrange ? '#FF6B00' : '#00F0FF') : 'rgba(255,255,255,0.15)',
              color: isHovered ? '#05070B' : '#FFFFFF'
            }}
          >
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300" />
          </div>
        </div>

      </div>

      {/* Futuristic corner accent lines */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
        style={{ backgroundColor: event.accentColor }}
      />
    </div>
  );
}
