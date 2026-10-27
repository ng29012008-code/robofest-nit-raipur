import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CyberCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Smooth springs for cursor interpolation
  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });
  const trailX = useSpring(0, { damping: 30, stiffness: 180 });
  const trailY = useSpring(0, { damping: 30, stiffness: 180 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, trailX, trailY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden hidden md:block">
      {/* Outer Floating Crosshair Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none flex items-center justify-center transition-colors duration-200"
        style={{
          x: trailX,
          y: trailY,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          borderColor: isHovered ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 240, 255, 0.35)',
          boxShadow: isHovered ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none',
        }}
        animate={{
          scale: isClicking ? 0.85 : 1,
          rotate: isHovered ? 90 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Tiny crosshair markings */}
        <div className="absolute top-0 w-1 h-[2px] bg-[#00F0FF]/60" />
        <div className="absolute bottom-0 w-1 h-[2px] bg-[#00F0FF]/60" />
        <div className="absolute left-0 h-1 w-[2px] bg-[#00F0FF]/60" />
        <div className="absolute right-0 h-1 w-[2px] bg-[#00F0FF]/60" />
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 8 : 4,
          height: isHovered ? 8 : 4,
          backgroundColor: isHovered ? '#FF6B00' : '#00F0FF',
          boxShadow: isHovered ? '0 0 10px #FF6B00' : '0 0 8px #00F0FF',
        }}
        animate={{
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
