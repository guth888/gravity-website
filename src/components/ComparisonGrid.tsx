import { useEffect, useRef, useState } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import { StarParticles } from "./StarParticles";
import { MeshAccent } from "./MeshAccent";

const features = [
  { name: "Context Awareness", gravity: "native", search: false, display: false, social: "partial" },
  { name: "Preview Before Spend", gravity: true, search: false, display: false, social: false },
  { name: "Cookie-Free", gravity: true, search: false, display: false, social: false },
  { name: "Conversation Integration", gravity: true, search: false, display: false, social: false },
  { name: "Multi-LLM Support", gravity: true, search: "n/a", display: "n/a", social: "n/a" },
  { name: "Cost Per Acquisition", gravity: "lower", search: "high", display: "medium", social: "medium" }
];

export const ComparisonGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      features.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRows(prev => [...prev, index]);
        }, index * 150);
      });
    }
  }, [isVisible]);

  const renderCell = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-gravity-teal mx-auto" strokeWidth={2.5} />;
    }
    if (value === false) {
      return <X className="w-5 h-5 text-gravity-grey/50 mx-auto" strokeWidth={2} />;
    }
    if (value === "partial") {
      return <AlertCircle className="w-5 h-5 text-gravity-orange/70 mx-auto" strokeWidth={2} />;
    }
    if (value === "n/a") {
      return <span className="text-sm text-gravity-grey/50">N/A</span>;
    }
    if (value === "native") {
      return <span className="text-sm font-semibold text-gravity-orange">Native</span>;
    }
    return <span className="text-sm font-medium text-white capitalize">{value}</span>;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-background overflow-hidden"
    >
      {/* Star Particles */}
      <StarParticles count={15} />
      
      {/* Mesh overlay */}
      <MeshAccent opacity={2} />
      
      {/* Single orange radial light gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header - CINEMATIC SCALE */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gravity-orange text-white text-sm font-medium mb-6 uppercase tracking-[0.08em]">
            THE GRAVITY ADVANTAGE
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            GRAVITY Studio vs Traditional Advertising
          </h2>
          <p className="text-lg md:text-xl text-[#9EA2B1] max-w-2xl mx-auto">
            The first platform designed for the AI answer surface
          </p>
        </div>

        {/* Comparison Table - DARK COSMIC */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px] bg-card backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
            {/* Table Header - Orange accent */}
            <div className="grid grid-cols-5 gap-4 p-6 border-b border-white/[0.04]">
              <div className="font-semibold text-[#9EA2B1] uppercase text-xs tracking-wider">Feature</div>
              <div className="text-center">
                <div className="inline-block px-3 py-1 rounded-full bg-gravity-orange text-white text-xs font-bold uppercase tracking-wider mb-2">
                  NATIVE
                </div>
                <div className="font-semibold text-gravity-orange">
                  GRAVITY Studio
                </div>
              </div>
              <div className="text-center font-semibold text-[#9EA2B1] text-sm">Search Ads</div>
              <div className="text-center font-semibold text-[#9EA2B1] text-sm">Display</div>
              <div className="text-center font-semibold text-[#9EA2B1] text-sm">Social</div>
            </div>

            {/* Table Body */}
            <div>
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-5 gap-4 p-6 border-b border-white/[0.04] last:border-b-0 transition-all duration-700 ${
                    visibleRows.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  } ${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="font-medium text-white flex items-center">{feature.name}</div>
                  <div className="flex items-center justify-center bg-[#FF4C1E]/[0.03]">{renderCell(feature.gravity)}</div>
                  <div className="flex items-center justify-center">{renderCell(feature.search)}</div>
                  <div className="flex items-center justify-center">{renderCell(feature.display)}</div>
                  <div className="flex items-center justify-center">{renderCell(feature.social)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            visibleRows.length === features.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-lg md:text-xl text-[#9EA2B1]">
            The difference isn't incremental. It's categorical.
          </p>
        </div>
      </div>
    </section>
  );
};
