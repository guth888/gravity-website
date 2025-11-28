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
    <section className={`relative overflow-hidden bg-background py-12 sm:py-16 md:py-20 ${className}`}>
      {/* Mesh Animation Background - Same as Hero, very subtle */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-30">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10">
        {/* Label - Centered above */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/40 font-medium">
            Trusted by
          </span>
        </div>
        
        {/* Scrolling Logos Row */}
        <div className="overflow-hidden">
          <div className="logo-row-single">
            {[...allLogos, ...allLogos].map((logo, index) => (
              <img 
                key={index} 
                src={logo.src} 
                alt={logo.alt} 
                className="logo-image-large" 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Styles for single row animation */}
      <style>{`
        .logo-row-single {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4rem;
          animation: scrollLogos 50s linear infinite;
          width: max-content;
        }
        
        .logo-row-single:hover {
          animation-play-state: paused;
        }
        
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .logo-image-large {
          height: 40px;
          width: auto;
          min-width: 80px;
          max-width: 200px;
          object-fit: contain;
          opacity: 0.7;
          filter: grayscale(15%);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        .logo-image-large:hover {
          opacity: 1;
          filter: grayscale(0%);
          transform: scale(1.05);
        }
        
        @media (min-width: 640px) {
          .logo-row-single {
            gap: 5rem;
          }
          .logo-image-large {
            height: 50px;
            min-width: 100px;
            max-width: 220px;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-row-single {
            gap: 6rem;
          }
          .logo-image-large {
            height: 60px;
            min-width: 120px;
            max-width: 260px;
          }
        }
        
        @media (min-width: 1440px) {
          .logo-row-single {
            gap: 7rem;
          }
          .logo-image-large {
            height: 70px;
            min-width: 140px;
            max-width: 300px;
          }
        }
        
        @media (min-width: 1920px) {
          .logo-row-single {
            gap: 8rem;
          }
          .logo-image-large {
            height: 80px;
            min-width: 160px;
            max-width: 340px;
          }
        }
      `}</style>
    </section>
  );
};
