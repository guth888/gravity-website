import { lazy, Suspense } from "react";

// Publishers
import cladlabsLogo from '@/assets/publishers/cladlabs.png';
import sourcegraphLogo from '@/assets/publishers/sourcegraph.png';
import presearchLogo from '@/assets/publishers/presearch.png';
import iaskLogo from '@/assets/publishers/iask.png';
import rampLogo from '@/assets/publishers/ramp.png';
import deepaiLogo from '@/assets/publishers/deepai.png';

// Advertisers
import reachhLogo from '@/assets/advertisers/reachh-digital.png';
import verveLogo from '@/assets/advertisers/verve.png';
import revylLogo from '@/assets/advertisers/revyl.png';
import inferencenetLogo from '@/assets/advertisers/inferencenet.png';
import layersLogo from '@/assets/advertisers/layers.png';
import flaxlabsLogo from '@/assets/advertisers/flaxlabs.png';
import doordashLogo from '@/assets/advertisers/doordash.png';

// Lazy load the mesh animation (same as Hero)
const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

// Combined all logos
const allLogos = [
  { src: cladlabsLogo, alt: "CladLabs" },
  { src: sourcegraphLogo, alt: "SourceGraph" },
  { src: verveLogo, alt: "Verve" },
  { src: presearchLogo, alt: "PreSearch" },
  { src: revylLogo, alt: "Revyl" },
  { src: iaskLogo, alt: "iAsk" },
  { src: inferencenetLogo, alt: "InferenceNet" },
  { src: rampLogo, alt: "Ramp" },
  { src: layersLogo, alt: "Layers" },
  { src: deepaiLogo, alt: "DeepAI" },
  { src: flaxlabsLogo, alt: "FlaxLabs" },
  { src: doordashLogo, alt: "DoorDash" },
  { src: reachhLogo, alt: "Reachh Digital" },
];

export const SocialProofBand = ({ className = "" }: { className?: string }) => {
  return (
    <section className={`relative bg-background py-6 sm:py-8 md:py-10 ${className}`}>
      {/* Mesh Animation Background - Hidden on mobile for cleaner look */}
      <Suspense fallback={null}>
        <div className="hidden sm:block absolute left-0 right-0 -top-16 -bottom-16 opacity-30">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content - Centered */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* Label - Centered above */}
        <div className="text-center mb-3 sm:mb-6">
          <span className="text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-foreground/50 font-medium">
            Trusted by
          </span>
        </div>
        
        {/* Scrolling Logos Row */}
        <div className="w-full h-[70px] sm:h-[100px] md:h-[130px] lg:h-[160px] flex items-center overflow-hidden">
          <div className="logo-scroll-track flex items-center">
            {[...allLogos, ...allLogos, ...allLogos].map((logo, index) => (
              <img 
                key={index} 
                src={logo.src} 
                alt={logo.alt} 
                className="logo-item flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .logo-scroll-track {
          animation: scrollLogos 30s linear infinite;
          width: max-content;
          gap: 2rem;
        }
        
        @media (min-width: 640px) {
          .logo-scroll-track {
            animation-duration: 60s;
            gap: 4rem;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-scroll-track {
            animation-duration: 80s;
            gap: 5rem;
          }
        }
        
        .logo-scroll-track:hover {
          animation-play-state: paused;
        }
        
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        
        .logo-item {
          height: 55px;
          width: auto;
          object-fit: contain;
          opacity: 0.55;
          filter: grayscale(25%);
          transition: all 0.3s ease;
        }
        
        @media (min-width: 640px) {
          .logo-item {
            height: 80px;
            opacity: 0.6;
            filter: grayscale(20%);
          }
          
          .logo-item:hover {
            opacity: 1;
            filter: grayscale(0%);
            transform: scale(1.05);
          }
        }
        
        @media (min-width: 768px) {
          .logo-item {
            height: 110px;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-item {
            height: 140px;
          }
        }
        
        @media (min-width: 1440px) {
          .logo-item {
            height: 160px;
          }
        }
      `}</style>
    </section>
  );
};
