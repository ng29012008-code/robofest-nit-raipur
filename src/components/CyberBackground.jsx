import React, { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000, radius: 150 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes for ambient technical mesh
    const particleCount = Math.min(Math.floor(width / 26), 65);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.6,
        isOrange: Math.random() > 0.82, // occasional neon orange point
        alpha: Math.random() * 0.55 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.16;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].isOrange || particles[j].isOrange
              ? `rgba(255, 107, 0, ${lineAlpha * 1.6})`
              : `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect particles to mouse if close
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = particles[i].isOrange 
            ? `rgba(255, 107, 0, ${mAlpha})` 
            : `rgba(0, 240, 255, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Gentle magnetic attraction towards cursor
          particles[i].x -= (mdx / mdist) * 0.6;
          particles[i].y -= (mdy / mdist) * 0.6;
        }
      }

      // Update & draw particles with breathing pulse
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dynamicAlpha = p.alpha + Math.sin(time * 2 + p.pulseOffset) * 0.15;
        const boundedAlpha = Math.max(0.1, Math.min(0.9, dynamicAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isOrange
          ? `rgba(255, 107, 0, ${boundedAlpha})`
          : `rgba(0, 240, 255, ${boundedAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Deep Atmospheric Gradient Spots with Slow Float */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none animate-pulse-subtle"
        style={{ background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF6B00 0%, transparent 70%)', animation: 'pulse-subtle 6s ease-in-out infinite' }}
      />
      <div 
        className="absolute bottom-10 left-1/4 w-[750px] h-[450px] rounded-full blur-[180px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0284C7 0%, transparent 70%)' }}
      />

      {/* Cyber Grid with subtle ambient opacity */}
      <div className="absolute inset-0 bg-cyber-grid opacity-50" />

      {/* Canvas ambient interactive particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-80" />
    </div>
  );
}
