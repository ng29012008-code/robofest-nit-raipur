import React, { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audio';

export default function EventCard({ event, onSelect, index }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Map image path based on event ID
  const imageMap = {
    'robo-wars': '/images/event-robo-wars.jpg',
    'robo-race': '/images/event-robo-race.jpg',
    'ai-challenge': '/images/event-ai-challenge.jpg',
  };

  const currentImage = imageMap[event.id] || '/images/hero-robot.jpg';
  const isOrange = event.accentColor === '#FF6B00';

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt (-8deg to 8deg)
    const rotX = ((y / rect.height) - 0.5) * -12;
    const rotY = ((x / rect.width) - 0.5) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        soundManager.playHover();
      }}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundManager.playClick();
        if (onSelect) onSelect(event);
      }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`group relative flex flex-col justify-between rounded-2xl bg-[#090E1A]/95 border overflow-hidden cursor-pointer transition-all duration-300 ease-out ${
        isHovered
          ? isOrange
            ? 'border-[#FF6B00] shadow-[0_0_40px_rgba(255,107,0,0.35)]'
            : 'border-[#00F0FF] shadow-[0_0_40px_rgba(0,240,255,0.35)]'
          : 'border-white/10 hover:border-white/25 shadow-lg'
      }`}
    >
      {/* Dynamic Specular Mouse Glow Highlight */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${glowPos.x}% ${glowPos.y}%, ${
              isOrange ? 'rgba(255,107,0,0.18)' : 'rgba(0,240,255,0.18)'
            }, transparent 75%)`,
          }}
        />
      )}

      {/* Top Visual Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#060A14]">
        {/* Background Image with Hover Scale */}
        <img
          src={currentImage}
          alt={event.title}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 opacity-90"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090E1A] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges & Event Number */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <motion.div 
            animate={{ scale: isHovered ? 1.05 : 1 }}
            className="px-2.5 py-1 rounded-md text-[11px] font-tech tracking-wider uppercase border backdrop-blur-md shadow-lg"
            style={{
              backgroundColor: 'rgba(5, 7, 11, 0.85)',
              borderColor: isOrange ? '#FF6B0088' : '#00F0FF88',
              color: isOrange ? '#FF6B00' : '#00F0FF',
            }}
          >
            {event.badge}
          </motion.div>

          <div className="w-8 h-8 rounded-full bg-[#05070B]/85 border border-white/20 flex items-center justify-center font-tech text-xs font-bold text-white shadow-lg">
            {event.number}
          </div>
        </div>

        {/* Tactical Tagline on Image bottom */}
        <div className="absolute bottom-3 left-4 right-4 font-tech text-[10px] tracking-widest uppercase text-slate-300 pointer-events-none z-10">
          // {event.tagline}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6 relative z-10">
        <div className="space-y-3">
          {/* Category */}
          <div className="font-tech text-xs tracking-wider uppercase text-slate-400">
            {event.category}
          </div>

          {/* Title */}
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00F0FF] transition-all duration-300">
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
            className="text-xs font-tech uppercase tracking-wider font-semibold transition-colors duration-300"
            style={{ color: isHovered ? (isOrange ? '#FF6B00' : '#00F0FF') : '#94A3B8' }}
          >
            INSPECT ARENA SPECS
          </span>

          <motion.div 
            animate={{
              x: isHovered ? 4 : 0,
              y: isHovered ? -4 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-300"
            style={{
              backgroundColor: isHovered ? (isOrange ? '#FF6B00' : '#00F0FF') : '#0E1729',
              borderColor: isHovered ? (isOrange ? '#FF6B00' : '#00F0FF') : 'rgba(255,255,255,0.15)',
              color: isHovered ? '#05070B' : '#FFFFFF'
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>

      </div>

      {/* Futuristic corner accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
        style={{ backgroundColor: event.accentColor }}
      />
    </motion.div>
  );
}
