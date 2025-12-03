// Logo imports
import sourcegraphLogo from '@/assets/publishers/sourcegraph.svg';
import iaskLogo from '@/assets/publishers/iask.png';
import rampLogo from '@/assets/publishers/ramp.png';
import deepaiLogo from '@/assets/publishers/deepai.png';
import verveLogo from '@/assets/advertisers/verve.png';
import doordashLogo from '@/assets/advertisers/doordash.png';

// Static logos - the 6 main partners
const logos = [
  { src: doordashLogo, alt: "DoorDash", isIcon: false },
  { src: rampLogo, alt: "Ramp", isIcon: false },
  { src: verveLogo, alt: "Verve", isIcon: false },
  { src: sourcegraphLogo, alt: "Amp", isIcon: true },
  { src: iaskLogo, alt: "iAsk", isIcon: false },
  { src: deepaiLogo, alt: "DeepAI", isIcon: false },
];

export const SocialProofBand = ({ className = "" }: { className?: string }) => {

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
            {logos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="logo-container"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={`logo-item ${logo.isIcon ? 'logo-icon' : ''}`}
                />
              </div>
            ))}
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
          transition: opacity 0.3s ease;
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
      `}</style>
    </section>
  );
};


