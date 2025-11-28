import { useEffect, useRef, useState } from "react";
import { Target, MessageSquare, Zap } from "lucide-react";
import { StarParticles } from "./StarParticles";
import { MeshAccent } from "./MeshAccent";
import PlatformMarquee from "./PlatformMarquee";
const pillars = [{
  number: "01",
  icon: Target,
  title: "Zero Setup",
  description: "No API keys, no data analysis, no prompt engineering. Just launch."
}, {
  number: "02",
  icon: MessageSquare,
  title: "Conversational UI",
  description: "Chat with Gravity like you'd chat with a cofounder. Natural language, immediate output."
}, {
  number: "03",
  icon: Zap,
  title: "Production-Ready Instantly",
  description: "One conversation = campaign live across 50+ LLMs. No dev work needed."
}];
export const Features = () => {
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView) {
        setIsInView(true);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [isInView]);
  useEffect(() => {
    if (isInView) {
      const elements = ['badge', 'headline', 'subhead', 'pillar-0', 'pillar-1', 'pillar-2', 'mockup'];
      elements.forEach((el, index) => {
        setTimeout(() => {
          setVisibleElements(prev => [...prev, el]);
        }, index * 150);
      });
    }
  }, [isInView]);
  return <section ref={sectionRef} className="relative py-36 px-6 bg-background overflow-hidden">
      {/* Star Particles */}
      <StarParticles count={12} />
      
      {/* Mesh Accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <MeshAccent opacity={2} />
      </div>
      
      {/* Single orange radial light */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Badge */}
        <div className={`text-center mb-12 transition-all duration-1000 ${visibleElements.includes('badge') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-gravity-orange text-white text-sm font-medium mb-6 uppercase tracking-[0.08em]">
            THE PLATFORM
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Headline + Subhead */}
          <div className="space-y-6">
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)] transition-all duration-1000 delay-100 ${visibleElements.includes('headline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Gravity is your cockpit for AI-native campaigns.</h2>
            
            <p className={`text-lg md:text-xl text-[#9EA2B1] leading-relaxed max-w-2xl transition-all duration-1000 delay-200 ${visibleElements.includes('subhead') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              A guided workspace where marketers can turn 'we should be in AI answers' into live, measurable campaigns across multiple LLMs.
            </p>

            {/* Pillars */}
            <div className="space-y-6 mt-12">
              {pillars.map((pillar, index) => <div key={pillar.number} className={`flex gap-4 items-start transition-all duration-1000 ${visibleElements.includes(`pillar-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: `${300 + index * 100}ms`
            }}>
                  <div>
                    {/* Pillar content can be added here if needed */}
                  </div>
                </div>)}
            </div>
          </div>

          {/* Right: Mockup Interface */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${visibleElements.includes('mockup') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Strategy Session Card */}
            <div className="relative overflow-hidden rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg border border-border bg-card p-8 shadow-lg">
              {/* Mesh inside card */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <MeshAccent opacity={2} />
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="p-2 rounded-lg bg-white/[0.06] border border-[#FF4C1E]/30">
                  
                </div>
                <h3 className="text-sm font-semibold tracking-[0.15em] text-[#9EA2B1] uppercase">Strategy Onboarding</h3>
              </div>

              {/* Three Gradient Bars - Using orange accent system */}
              <div className="space-y-3 mb-10 relative z-10">
                
                
                
              </div>

              {/* Input Fields */}
              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-white font-medium mb-3 text-sm">
                    Insert company/business website:
                  </label>
                  <input type="text" placeholder="powercrmsolutions.com" className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-lg text-white placeholder:text-[#9EA2B1]/50 focus:outline-none focus:border-[#FF4C1E]/50 transition-colors" />
                </div>

                <div>
                  <label className="block text-white font-medium mb-3 text-sm">
                    Describe your product/service
                  </label>
                  <input type="text" className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-lg text-white placeholder:text-[#9EA2B1]/50 focus:outline-none focus:border-[#FF4C1E]/50 transition-colors" />
                </div>

                <div>
                  <label className="block text-white font-medium mb-3 text-sm">
                    What is your ICP?
                  </label>
                  <input type="text" className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-lg text-white placeholder:text-[#9EA2B1]/50 focus:outline-none focus:border-[#FF4C1E]/50 transition-colors" />
                </div>
              </div>
            </div>

            {/* Conversation Preview Card */}
            
          </div>
        </div>

        {/* Platform Marquee - Full Width */}
        <div className="mt-16 -mx-6">
          <PlatformMarquee />
        </div>
      </div>
    </section>;
};