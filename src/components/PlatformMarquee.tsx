import { useEffect, useState } from "react";

const PlatformMarquee = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const firstLineFeatures = [
    "Strategy Agent",
    "Creative Studio",
    "Real-Time Analytics",
    "Sandbox Preview",
    "Orchestration Engine",
    "Dashboard Cockpit",
  ];

  const secondLineFeatures = [
    "Targeting Intelligence",
    "Budget Optimizer",
    "Integration Hub",
    "Performance Metrics",
    "A/B Testing Engine",
    "Compliance Shield",
  ];

  const MarqueeRow = ({ features, reverse = false }: { features: string[], reverse?: boolean }) => (
    <div className="relative w-full overflow-hidden py-4">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
      
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} hover:pause`}>
        {/* First set of features */}
        <div className="flex items-center gap-8 pr-8">
          {features.map((feature, index) => (
            <div key={`feature-1-${index}`} className="flex items-center gap-8">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF4C1E] via-[#FF6B4A] to-[#FF4C1E] bg-clip-text text-transparent whitespace-nowrap">
                {feature}
              </span>
              <span className="text-[#FF4C1E]/30 text-xl">•</span>
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-8 pr-8">
          {features.map((feature, index) => (
            <div key={`feature-2-${index}`} className="flex items-center gap-8">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF4C1E] via-[#FF6B4A] to-[#FF4C1E] bg-clip-text text-transparent whitespace-nowrap">
                {feature}
              </span>
              <span className="text-[#FF4C1E]/30 text-xl">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`space-y-2 transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <MarqueeRow features={firstLineFeatures} />
      <MarqueeRow features={secondLineFeatures} reverse />

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default PlatformMarquee;
