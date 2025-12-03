import { useState, useEffect, useRef } from 'react';

// Logo imports
import sourcegraphLogo from '@/assets/publishers/sourcegraph.svg';
import iaskLogo from '@/assets/publishers/iask.png';
import rampLogo from '@/assets/publishers/ramp.png';
import deepaiLogo from '@/assets/publishers/deepai.png';
import verveLogo from '@/assets/advertisers/verve.png';
import doordashLogo from '@/assets/advertisers/doordash.png';
import cladlabsLogo from '@/assets/publishers/cladlabs.png';
import presearchLogo from '@/assets/publishers/presearch.png';
import flaxlabsLogo from '@/assets/advertisers/flaxlabs.png';
import inferencenetLogo from '@/assets/advertisers/inferencenet.png';
import layersLogo from '@/assets/advertisers/layers.png';
import reachhLogo from '@/assets/advertisers/reachh-digital.png';
import revylLogo from '@/assets/advertisers/revyl.png';

// Logo sets - Set 0 is always the initial one
const logoSets = [
  // Set 0: Initial set (always shown first)
  [
    { src: doordashLogo, alt: "DoorDash", isIcon: false, needsScale: false },
    { src: rampLogo, alt: "Ramp", isIcon: false, needsScale: false },
    { src: verveLogo, alt: "Verve", isIcon: false, needsScale: false },
    { src: sourcegraphLogo, alt: "Amp", isIcon: true, needsScale: false },
    { src: iaskLogo, alt: "iAsk", isIcon: false, needsScale: false },
    { src: deepaiLogo, alt: "DeepAI", isIcon: false, needsScale: false },
  ],
  // Set 1
  [
    { src: flaxlabsLogo, alt: "FlaxLabs", isIcon: false, needsScale: true },
    { src: presearchLogo, alt: "PreSearch", isIcon: false, needsScale: true },
    { src: cladlabsLogo, alt: "CladLabs", isIcon: false, needsScale: true },
    { src: inferencenetLogo, alt: "Inferencenet", isIcon: false, needsScale: true },
    { src: layersLogo, alt: "Layers", isIcon: false, needsScale: true },
    { src: reachhLogo, alt: "ReachH Digital", isIcon: false, needsScale: true },
  ],
  // Set 2
  [
    { src: revylLogo, alt: "Revyl", isIcon: false, needsScale: true },
    { src: doordashLogo, alt: "DoorDash", isIcon: false, needsScale: false },
    { src: presearchLogo, alt: "PreSearch", isIcon: false, needsScale: true },
    { src: verveLogo, alt: "Verve", isIcon: false, needsScale: false },
    { src: cladlabsLogo, alt: "CladLabs", isIcon: false, needsScale: true },
    { src: sourcegraphLogo, alt: "Amp", isIcon: true, needsScale: false },
  ],
  // Set 3
  [
    { src: rampLogo, alt: "Ramp", isIcon: false, needsScale: false },
    { src: inferencenetLogo, alt: "Inferencenet", isIcon: false, needsScale: true },
    { src: iaskLogo, alt: "iAsk", isIcon: false, needsScale: false },
    { src: flaxlabsLogo, alt: "FlaxLabs", isIcon: false, needsScale: true },
    { src: deepaiLogo, alt: "DeepAI", isIcon: false, needsScale: false },
    { src: layersLogo, alt: "Layers", isIcon: false, needsScale: true },
  ],
];

export const SocialProofBand = ({ className = "" }: { className?: string }) => {
  const [displayLogos, setDisplayLogos] = useState(logoSets[0]);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const [nextLogo, setNextLogo] = useState<typeof logoSets[0][0] | null>(null);
  
  // Use refs to track state without causing re-renders
  const currentLogoIndexRef = useRef(0);
  const targetSetIndexRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const logoIndex = currentLogoIndexRef.current;
      const targetSet = targetSetIndexRef.current;
      const targetLogo = logoSets[targetSet][logoIndex];
      
      // Start fade transition
      setFadingIndex(logoIndex);
      setNextLogo(targetLogo);
      
      // After fade completes, update the display logos
      setTimeout(() => {
        setDisplayLogos(prev => {
          const newLogos = [...prev];
          newLogos[logoIndex] = targetLogo;
          return newLogos;
        });
        setFadingIndex(null);
        setNextLogo(null);
      }, 800); // Transition duration
      
      // Move to next logo position
      currentLogoIndexRef.current = (logoIndex + 1) % 6;
      
      // If we've completed a full cycle, move to next set
      if (currentLogoIndexRef.current === 0) {
        targetSetIndexRef.current = (targetSet + 1) % logoSets.length;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative bg-background py-4 sm:py-6 md:py-8 -mt-16 sm:-mt-20 md:-mt-24 ${className}`}>
      {/* Content - Centered */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* Label - Centered above */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground font-medium">
            Trusted by
          </span>
        </div>
        
        {/* Logos Row */}
        <div className="w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="flex items-center justify-between">
            {displayLogos.map((logo, index) => {
              const isFading = fadingIndex === index;
              
              return (
                <div
                  key={`logo-${index}`}
                  className="logo-container"
                >
                  {/* Current logo */}
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className={`logo-item ${isFading ? 'logo-fade-out' : ''} ${logo.isIcon ? 'logo-icon' : ''} ${logo.needsScale ? 'logo-scaled' : ''} ${logo.alt === 'Layers' ? 'logo-layers' : ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Next logo - fading in (only during transition) */}
                  {isFading && nextLogo && (
                    <img 
                      src={nextLogo.src} 
                      alt={nextLogo.alt} 
                      className={`logo-item logo-fade-in logo-overlay ${nextLogo.isIcon ? 'logo-icon' : ''} ${nextLogo.needsScale ? 'logo-scaled' : ''} ${nextLogo.alt === 'Layers' ? 'logo-layers' : ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .logo-container {
          position: relative;
          width: auto;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: contents;
        }
        
        .logo-container img {
          transform: translateZ(0);
        }
        
        .logo-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(0);
        }
        
        .logo-fade-out {
          animation: logoFadeOut 0.8s ease-out forwards;
        }
        
        .logo-fade-in {
          animation: logoFadeIn 0.8s ease-out forwards;
        }
        
        @keyframes logoFadeOut {
          0% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
          }
        }
        
        @keyframes logoFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.4;
          }
        }
        
        @media (min-width: 768px) {
          .logo-container {
            height: 140px;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-container {
            height: 160px;
          }
        }
        
        .logo-item {
          height: 120px;
          width: auto;
          object-fit: contain;
          opacity: 0.4;
          transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: opacity;
          transform: translateZ(0);
        }
        
        .logo-item:hover {
          opacity: 0.7;
        }
        
        @media (min-width: 768px) {
          .logo-item {
            height: 140px;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-item {
            height: 160px;
          }
        }
        
        .logo-icon {
          height: 36px !important;
        }
        
        @media (min-width: 768px) {
          .logo-icon {
            height: 42px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-icon {
            height: 48px !important;
          }
        }
        
        .logo-scaled {
          transform: scale(1.3);
        }
        
        @media (min-width: 768px) {
          .logo-scaled {
            transform: scale(1.35);
          }
        }
        
        @media (min-width: 1024px) {
          .logo-scaled {
            transform: scale(1.4);
          }
        }
        
        .logo-layers {
          transform: scale(1.035) !important;
        }
        
        @media (min-width: 768px) {
          .logo-layers {
            transform: scale(1.08) !important;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-layers {
            transform: scale(1.125) !important;
          }
        }
        
      `}</style>
    </section>
  );
};


