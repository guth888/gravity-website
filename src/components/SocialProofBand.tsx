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
    <section className={`relative overflow-hidden bg-background py-16 sm:py-20 md:py-24 ${className}`}>
      {/* Mesh Animation Background - Same as Hero, very subtle */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-30">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Label - Centered above */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/40 font-medium">
            Trusted by
          </span>
        </div>
        
        {/* Scrolling Logos Row - Full width, centered */}
        <div className="w-full overflow-hidden">
          <div 
            className="flex items-center justify-start gap-16 sm:gap-20 md:gap-24 lg:gap-28"
            style={{
              animation: 'scrollLogos 60s linear infinite',
              width: 'max-content',
            }}
          >
            {[...allLogos, ...allLogos, ...allLogos].map((logo, index) => (
              <img 
                key={index} 
                src={logo.src} 
                alt={logo.alt} 
                className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 flex-shrink-0"
                style={{
                  filter: 'grayscale(10%)',
                  minWidth: '100px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(10%)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
};
