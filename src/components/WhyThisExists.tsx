import { useEffect, useRef, useState } from "react";
import { Users, Building, Megaphone, ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StarParticles } from "./StarParticles";
import { MeshAccent } from "./MeshAccent";
const benefits = [{
  icon: Users,
  label: "For Users",
  description: "Get better recommendations from AI that understands your real needs"
}, {
  icon: Building,
  label: "For Publishers",
  description: "Monetize AI traffic without disrupting user experience"
}, {
  icon: Megaphone,
  label: "For Advertisers",
  description: "Reach buyers at the exact moment of intent with perfect context"
}];
export const WhyThisExists = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="relative py-36 px-6 bg-background overflow-hidden">
      {/* Star Particles */}
      <StarParticles count={12} />
      
      {/* Mesh Accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <MeshAccent opacity={2} />
      </div>
      
      {/* Single orange radial light */}
      <div className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Badge */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-gravity-orange text-white text-sm font-medium mb-6 uppercase tracking-[0.08em]">
            THE PROBLEM
          </span>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Search is dead.<br />
              <span className="text-[#9EA2B1]">Ads need to evolve.</span>
            </h2>
            
            <p className={`text-lg md:text-xl text-[#9EA2B1] leading-relaxed max-w-2xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>LLM's answer questions directly. No blue links. No search results. No traditional ad inventory.
The entire internet traffic layer is being rewritten. GRAVITY is the ad platform for the new layer.<span className="block mt-4 font-semibold text-foreground">The entire internet traffic layer is being rewritten. GRAVITY is the ad platform for the new layer.</span>
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return <div key={benefit.label} className={`flex gap-4 items-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{
                transitionDelay: `${400 + index * 100}ms`
              }}>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] transition-all duration-500 hover:scale-110 hover:rotate-6 hover:border-[#FF4C1E]/50 hover:shadow-[0_0_20px_rgba(255,76,30,0.3)] flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{benefit.label}</h3>
                      <p className="text-sm text-[#9EA2B1] leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>;
            })}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="space-y-6">
            {/* Old World */}
            <Card className={`p-8 bg-card border border-border rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
            transitionDelay: '600ms'
          }}>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <MeshAccent opacity={2} />
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Traditional Search</h3>
                  <p className="text-xs text-[#9EA2B1]">The Old Way</p>
                </div>
              </div>
              <div className="space-y-2 relative z-10">
                <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.04] text-sm text-[#9EA2B1]">
                  10 blue links
                </div>
                <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.04] text-sm text-[#9EA2B1]">
                  Banner ads
                </div>
                <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.04] text-sm text-[#9EA2B1]">
                  User clicks through
                </div>
              </div>
            </Card>

            {/* Arrow */}
            <div className={`flex justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{
            transitionDelay: '800ms'
          }}>
              <div className="p-4 rounded-full bg-white/[0.08] border border-[#FF4C1E]/30 shadow-[0_0_20px_rgba(255,76,30,0.3)]">
                <ArrowRight className="w-6 h-6 text-[#FF4C1E] rotate-90" />
              </div>
            </div>

            {/* New World */}
            <Card className={`p-8 bg-gradient-to-br from-[#FF4C1E]/10 to-transparent border border-[#FF4C1E]/30 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg border-b-2 border-b-[#FF4C1E]/20 shadow-[0_8px_16px_rgba(0,0,0,0.4),0_-2px_8px_rgba(255,255,255,0.02),0_0_40px_rgba(255,76,30,0.1)] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
            transitionDelay: '1000ms'
          }}>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <MeshAccent opacity={2} />
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                
                <div>
                  <h3 className="text-lg font-semibold text-white">GRAVITY Layer</h3>
                  <p className="text-xs text-[#FF4C1E]">The New Way</p>
                </div>
              </div>
              <div className="space-y-2 relative z-10">
                <div className="p-3 bg-white/[0.04] rounded-lg border border-[#FF4C1E]/30 text-sm text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF4C1E]" />
                  Direct AI answer
                </div>
                <div className="p-3 bg-white/[0.04] rounded-lg border border-[#FF4C1E]/30 text-sm text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF4C1E]" />
                  Contextual ad
                </div>
                <div className="p-3 bg-white/[0.04] rounded-lg border border-[#FF4C1E]/30 text-sm text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF4C1E]" />
                  Instant conversion
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};