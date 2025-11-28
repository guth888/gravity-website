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
const publisherLogos = [{
  src: cladlabsLogo,
  alt: "CladLabs"
}, {
  src: sourcegraphLogo,
  alt: "SourceGraph"
}, {
  src: presearchLogo,
  alt: "PreSearch"
}, {
  src: iaskLogo,
  alt: "iAsk"
}, {
  src: rampLogo,
  alt: "Ramp"
}, {
  src: deepaiLogo,
  alt: "DeepAI"
}];
const advertiserLogos = [{
  src: reachhLogo,
  alt: "Reachh Digital"
}, {
  src: verveLogo,
  alt: "Verve"
}, {
  src: revylLogo,
  alt: "Revyl"
}, {
  src: inferencenetLogo,
  alt: "InferenceNet"
}, {
  src: layersLogo,
  alt: "Layers"
}, {
  src: flaxlabsLogo,
  alt: "FlaxLabs"
}, {
  src: doordashLogo,
  alt: "DoorDash"
}];
export const SocialProofBand = ({
  className = ""
}: {
  className?: string;
}) => {
  return <section className={`bg-background section-spacing px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 ${className}`}>
      <div className="content-container logo-scroll-section">
        {/* Publishers Row - Tighter spacing on mobile */}
        <div className="logo-row-wrapper py-6 sm:py-8 md:py-10 lg:py-12">
          <span className="row-label">Publishers</span>
          <div className="logo-scroll-container">
            <div className="logo-row publishers">
              {/* Duplicate logos for seamless loop */}
              {[...publisherLogos, ...publisherLogos].map((logo, index) => <img key={index} src={logo.src} alt={logo.alt} className="logo-image" />)}
            </div>
          </div>
        </div>

        {/* Advertisers Row */}
        <div className="logo-row-wrapper py-0 sm:py-0">
          <span className="row-label">Advertisers</span>
          <div className="logo-scroll-container">
            <div className="logo-row advertisers">
              {/* Duplicate logos for seamless loop */}
              {[...advertiserLogos, ...advertiserLogos].map((logo, index) => <img key={index} src={logo.src} alt={logo.alt} className="logo-image" />)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};