import { useState, useEffect } from 'react';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'orbit' | 'transform' | 'logo' | 'fadeout'>('orbit');

  useEffect(() => {
    // Phase 1: Orbiting planets (0-1000ms)
    const timer1 = setTimeout(() => setPhase('transform'), 1000);
    // Phase 2: Transform to shopping/user (1000-2200ms)
    const timer2 = setTimeout(() => setPhase('logo'), 2200);
    // Phase 3: Gravity logo (2200-3200ms)
    const timer3 = setTimeout(() => setPhase('fadeout'), 3200);
    // Phase 4: Fade out and complete (3200-3500ms)
    const timer4 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div 
      className={`
        fixed inset-0 z-[100] bg-white flex items-center justify-center
        transition-opacity duration-200
        ${phase === 'fadeout' ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        
        {/* Phase 1 & 2: Orbital system */}
        <div className={`
          absolute inset-0 transition-all duration-500
          ${phase === 'logo' || phase === 'fadeout' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
        `}>
          {/* Orbital rings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3D3D3D" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#3D3D3D" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3D3D3D" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Orbit paths */}
            <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.5" transform="rotate(-20, 100, 100)" />
            <ellipse cx="100" cy="100" rx="60" ry="25" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.5" transform="rotate(15, 100, 100)" />
            <ellipse cx="100" cy="100" rx="40" ry="18" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.5" transform="rotate(-5, 100, 100)" />
          </svg>

          {/* Center - Black hole / Gravitational center */}
          <div className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            transition-all duration-500
            ${phase === 'transform' ? 'scale-110' : 'scale-100'}
          `}>
            {/* Glow */}
            <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-[#3D3D3D]/20 blur-xl" />
            
            {/* Core - transforms from black hole to user icon */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              transition-all duration-400
              ${phase === 'orbit' ? 'bg-gradient-to-br from-[#4D4D4D] to-[#2D2D2D] border border-[#3D3D3D]/50' : 'bg-[#3D3D3D]/20 border border-[#3D3D3D]/50'}
            `}>
              {phase === 'orbit' ? (
                // Black hole center
                <div className="w-4 h-4 rounded-full bg-white/80" />
              ) : (
                // User icon
                <svg className="w-6 h-6 text-[#3D3D3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              )}
            </div>
          </div>

          {/* Orbiting elements */}
          <div className="absolute inset-0 preloader-orbit-1">
            <div className={`
              absolute transition-all duration-400
              ${phase === 'orbit' 
                ? 'w-4 h-4 rounded-full bg-gradient-to-br from-[#4A4A4A] to-[#2D2D2D] top-[15%] left-[75%]' 
                : 'top-[15%] left-[75%]'
              }
            `}>
              {phase === 'transform' && (
                <svg className="w-5 h-5 text-[#3D3D3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              )}
            </div>
          </div>

          <div className="absolute inset-0 preloader-orbit-2">
            <div className={`
              absolute transition-all duration-400
              ${phase === 'orbit' 
                ? 'w-3 h-3 rounded-full bg-gradient-to-br from-[#5A5A5A] to-[#3D3D3D] top-[70%] left-[20%]' 
                : 'top-[70%] left-[20%]'
              }
            `}>
              {phase === 'transform' && (
                <svg className="w-4 h-4 text-[#3D3D3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </div>
          </div>

          <div className="absolute inset-0 preloader-orbit-3">
            <div className={`
              absolute transition-all duration-400
              ${phase === 'orbit' 
                ? 'w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#6A6A6A] to-[#4D4D4D] top-[45%] left-[90%]' 
                : 'top-[45%] left-[90%]'
              }
            `}>
              {phase === 'transform' && (
                <svg className="w-4 h-4 text-[#3D3D3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              )}
            </div>
          </div>

          {/* Chat bubbles - appear in transform phase */}
          {phase === 'transform' && (
            <>
              <div className="absolute top-[25%] left-[30%] animate-pulse">
                <div className="w-8 h-5 bg-[#3D3D3D]/20 rounded-lg border border-[#3D3D3D]/30 flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-[#3D3D3D]/60" />
                    <div className="w-1 h-1 rounded-full bg-[#3D3D3D]/60" />
                    <div className="w-1 h-1 rounded-full bg-[#3D3D3D]/60" />
                  </div>
                </div>
              </div>
              <div className="absolute top-[60%] left-[65%] animate-pulse" style={{ animationDelay: '0.1s' }}>
                <div className="w-6 h-4 bg-[#3D3D3D]/20 rounded-lg border border-[#3D3D3D]/30" />
              </div>
              <div className="absolute top-[35%] left-[55%] animate-pulse" style={{ animationDelay: '0.2s' }}>
                <div className="w-7 h-4 bg-[#3D3D3D]/20 rounded-lg border border-[#3D3D3D]/30" />
              </div>
              <div className="absolute top-[75%] left-[40%] animate-pulse" style={{ animationDelay: '0.15s' }}>
                <div className="w-5 h-3 bg-[#3D3D3D]/20 rounded-lg border border-[#3D3D3D]/30" />
              </div>
            </>
          )}
        </div>

        {/* Phase 3: Gravity Logo */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300
          ${phase === 'logo' || phase === 'fadeout' ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
        `}>
          <span className="text-4xl sm:text-5xl font-headline font-bold text-foreground tracking-tight">
            Gravity
          </span>
        </div>
      </div>

      <style>{`
        .preloader-orbit-1 {
          animation: preloader-spin 3s linear infinite;
        }
        .preloader-orbit-2 {
          animation: preloader-spin 4s linear infinite reverse;
        }
        .preloader-orbit-3 {
          animation: preloader-spin 2.5s linear infinite;
        }
        @keyframes preloader-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

