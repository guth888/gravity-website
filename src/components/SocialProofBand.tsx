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
    <section className={`relative overflow-hidden bg-background pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 ${className}`}>
      {/* Mesh Animation Background - Same as Hero, very subtle */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-30">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content - Centered */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* Label - Centered above */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/40 font-medium">
            Trusted by
          </span>
        </div>
        
        {/* Scrolling Logos Row - Centered container */}
        <div className="w-full flex items-center justify-center overflow-hidden">
          <div 
            className="logo-scroll-track flex items-center"
            style={{
              gap: 'clamp(3rem, 6vw, 7rem)',
            }}
          >
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
          animation: scrollLogos 80s linear infinite;
          width: max-content;
        }
        
        .logo-scroll-track:hover {
          animation-play-state: paused;
        }
        
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        
        .logo-item {
          height: 72px;
          width: auto;
          object-fit: contain;
          opacity: 0.75;
          filter: grayscale(10%);
          transition: all 0.3s ease;
        }
        
        .logo-item:hover {
          opacity: 1;
          filter: grayscale(0%);
          transform: scale(1.08);
        }
        
        @media (min-width: 640px) {
          .logo-item {
            height: 96px;
          }
        }
        
        @media (min-width: 768px) {
          .logo-item {
            height: 120px;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-item {
            height: 144px;
          }
        }
        
        @media (min-width: 1440px) {
          .logo-item {
            height: 168px;
          }
        }
      `}</style>
    </section>
  );
};
