import { useMemo } from 'react';
import { PrefetchLink } from "./PrefetchLink";

// Floating particles background - zooming from right to left, avoiding center
const FloatingParticlesBackground = () => {
  // Generate particles - only in top and bottom regions, avoiding center text area
  // Memoize to prevent regeneration on every render
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => {
    const duration = 10 + Math.random() * 10; // 10-20 seconds to cross
    // Negative delay means particle starts mid-animation (already on screen)
    const delay = i < 25 ? -(Math.random() * duration) : Math.random() * 5;
    
    // Keep particles in top 30% or bottom 30% of screen (avoid center 40%)
    let y: number;
    if (i % 2 === 0) {
      y = Math.random() * 25; // Top region (0-25%)
    } else {
      y = 75 + Math.random() * 25; // Bottom region (75-100%)
    }
    
    return {
      y,
      size: 0.2 + Math.random() * 0.5,
      duration,
      delay,
      opacity: 0.3 + Math.random() * 0.4,
      yDrift: (Math.random() - 0.5) * 8,
    };
  }), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glow filter */}
          <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Radial gradient for particles */}
          <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A0A0A" stopOpacity="1" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Zooming particles - right to left */}
        {particles.map((particle, i) => (
          <circle
            key={i}
            r={particle.size}
            fill="url(#particleGradient)"
            filter="url(#particleGlow)"
            opacity={particle.opacity}
          >
            {/* Horizontal motion - right to left across screen */}
            <animate
              attributeName="cx"
              values="110;-10"
              dur={`${particle.duration}s`}
              begin={`${particle.delay}s`}
              repeatCount="indefinite"
              calcMode="linear"
            />
            {/* Slight vertical drift */}
            <animate
              attributeName="cy"
              values={`${particle.y};${particle.y + particle.yDrift}`}
              dur={`${particle.duration}s`}
              begin={`${particle.delay}s`}
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-[78vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-28 sm:pt-32 pb-8 sm:pb-10">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            radial-gradient(circle, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 24px 24px',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Floating Particles Background */}
      <FloatingParticlesBackground />

      {/* Content container with animated text */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1400px] mx-auto">
        {/* H1 Headline with subtle float */}
        <h1 className="relative hero-headline font-headline font-bold antialiased mb-4 sm:mb-5 md:mb-6 hero-float text-gravity-space">
          Integrating <span className="text-[#3D3D3D]">Ads</span> Into <span className="text-[#3D3D3D]">LLMs.</span>
        </h1>
        
        {/* Subheadline with delayed float */}
        <p 
          className="relative max-w-[100%] sm:max-w-[520px] md:max-w-[700px] lg:max-w-[850px] xl:max-w-[950px] mx-auto mb-8 antialiased text-gravity-space hero-float-delayed"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: 1.6, letterSpacing: '-0.01em' }}
        >
          Ads that appear natively inside AI answers: relevant, trusted, and timed to user intent.
        </p>
        
        {/* CTA Button */}
        <a 
          href="/login"
          style={{
            display: "inline-block"
          }}
        >
          <button className="metallic-button text-sm sm:text-base" style={{
            padding: "16px 32px",
            minHeight: "48px"
          }}>
            <span>Sign up</span>
          </button>
        </a>
      </div>
      
      <style>{`
        .hero-float {
          animation: hero-float 6s ease-in-out infinite;
          will-change: transform;
          transform: translateZ(0);
        }
        
        .hero-float-delayed {
          animation: hero-float 6s ease-in-out infinite;
          animation-delay: 0.5s;
          will-change: transform;
          transform: translateZ(0);
        }
        
        @keyframes hero-float {
          0%, 100% {
            transform: translateY(0px) translateZ(0);
          }
          50% {
            transform: translateY(-6px) translateZ(0);
          }
        }
      `}</style>
    </section>
  );
};
