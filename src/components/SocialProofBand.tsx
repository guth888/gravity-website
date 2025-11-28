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

const publisherLogos = [
  { src: cladlabsLogo, alt: "CladLabs" },
  { src: sourcegraphLogo, alt: "SourceGraph" },
  { src: presearchLogo, alt: "PreSearch" },
  { src: iaskLogo, alt: "iAsk" },
  { src: rampLogo, alt: "Ramp" },
  { src: deepaiLogo, alt: "DeepAI" },
];

const advertiserLogos = [
  { src: reachhLogo, alt: "Reachh Digital" },
  { src: verveLogo, alt: "Verve" },
  { src: revylLogo, alt: "Revyl" },
  { src: inferencenetLogo, alt: "InferenceNet" },
  { src: layersLogo, alt: "Layers" },
  { src: flaxlabsLogo, alt: "FlaxLabs" },
  { src: doordashLogo, alt: "DoorDash" },
];

export const SocialProofBand = ({ className = "" }: { className?: string }) => {
  return (
    <section className={`relative overflow-hidden bg-background py-10 sm:py-12 md:py-14 ${className}`}>
      {/* Mesh Animation Background - Same as Hero, very subtle */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-30">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10 logo-scroll-section">
        {/* Publishers Row */}
        <div className="logo-row-wrapper py-4 sm:py-5 md:py-6">
          <span className="row-label">Publishers</span>
          <div className="logo-scroll-container">
            <div className="logo-row publishers">
              {[...publisherLogos, ...publisherLogos].map((logo, index) => (
                <img 
                  key={index} 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="logo-image" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Advertisers Row */}
        <div className="logo-row-wrapper py-4 sm:py-5 md:py-6">
          <span className="row-label">Advertisers</span>
          <div className="logo-scroll-container">
            <div className="logo-row advertisers">
              {[...advertiserLogos, ...advertiserLogos].map((logo, index) => (
                <img 
                  key={index} 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="logo-image" 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
