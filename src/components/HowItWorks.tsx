import { Upload, Brain, Sparkles, Eye, Rocket, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { StarParticles } from "./StarParticles";
import { MeshAccent } from "./MeshAccent";
import { Button } from "@/components/ui/button";
const steps = [{
  icon: Upload,
  number: "01",
  title: "Input Signal",
  description: "Brand voice, guidelines, product catalog, and key messaging, transmitted through a few high-leverage questions. Proprietary AI agents handle the rest."
}, {
  icon: Brain,
  number: "02",
  title: "Model Alignment",
  description: "Neural pathways calibrate to brand semantics. Context maps, tone vectors, and value proposition matrices indexed."
}, {
  icon: Sparkles,
  number: "03",
  title: "Native Generation",
  description: "Creative engine synthesizes contextual responses optimized for each LLM conversation layer, surpassing base model output."
}, {
  icon: Eye,
  number: "04",
  title: "Simulated Rendering",
  description: "Pixel-perfect preview across ChatGPT, Claude, and Perplexity conversation environments before deployment."
}, {
  icon: Rocket,
  number: "05",
  title: "Multi-Model Launch",
  description: "Intelligent routing across LLM infrastructure with automated budget optimization and preference tracking."
}, {
  icon: BarChart3,
  number: "06",
  title: "Telemetry & Optimization",
  description: "Real-time performance monitoring across all endpoints. CTR analysis, conversion tracking, and autonomous ROI optimization."
}];
export const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView) {
        setIsInView(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [isInView]);
  useEffect(() => {
    if (isInView) {
      steps.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, index]);
        }, index * 300);
      });
    }
  }, [isInView]);
  return <section ref={sectionRef} className="relative py-20 sm:py-28 md:py-32 lg:py-36 px-4 sm:px-6 bg-background overflow-hidden">
      {/* Star Particles - Match Gravity density */}
      <StarParticles count={12} />
      
      {/* Mesh Background - Match Gravity opacity */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <MeshAccent opacity={2} />
      </div>
      
      {/* Single orange radial light - Match Gravity accent system */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header - Match Gravity typography */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gravity-orange text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 uppercase tracking-[0.08em]">
            THE PROCESS 
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-4 sm:mb-6 text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            Six Steps to Live
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#9EA2B1] max-w-3xl mx-auto leading-relaxed px-4">
            From idea to active campaign in one conversation. No setup, no dashboards, no delays.
          </p>
        </div>

        {/* Beamline Infrastructure */}
        <div className="relative max-w-[1100px] mx-auto">
          {/* Energy Beam - Minimal vertical transmission line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden lg:block pointer-events-none w-[1px]">
            {/* Single center line - minimal and precise */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10" />
            
            {/* Subtle glow - toned down to 10% */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[30px] h-full blur-[15px] opacity-10" style={{
            background: 'linear-gradient(180deg, rgba(255,76,30,0.3) 0%, rgba(255,76,30,0.1) 50%, transparent 100%)'
          }} />
            
            {/* Flowing particles - extremely subtle */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-[2px] bg-[#FF4C1E]/40 rounded-full blur-[0.5px] animate-particle-1" />
          </div>

          {/* Beamline Nodes */}
          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);
            const isLeft = index % 2 === 1;
            return <div key={step.number} className="relative">
                  {/* Hexagonal Node - Minimalist Stark reactor style */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 hidden lg:flex items-center justify-center z-20 group">
                    <div className={`relative transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                      {/* Mesh ripple - extremely subtle */}
                      <div className={`absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none transition-opacity duration-500 ${isVisible ? 'opacity-[0.015]' : 'opacity-0'}`}>
                        <MeshAccent opacity={1.5} />
                      </div>
                      
                      {/* Outer glow - toned down to 15% */}
                      <div className="absolute inset-0 w-12 h-12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF4C1E]/15 blur-[12px] animate-pulse-slow" />
                      
                      {/* Hexagon SVG - grayscale with orange number only */}
                      <svg width="40" height="40" viewBox="0 0 40 40" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:scale-110">
                        <polygon points="20,2 35,12 35,28 20,38 5,28 5,12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="transition-all duration-300 group-hover:fill-[rgba(255,255,255,0.04)] group-hover:stroke-[rgba(255,255,255,0.2)]" />
                      </svg>
                      
                      {/* Orange number - the only orange accent */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF4C1E] text-xs font-bold tracking-wider">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Floating Content Blocks - Desktop - Match Gravity grid alignment */}
                  <div className={`hidden lg:grid grid-cols-2 gap-24 items-start ${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-700`} style={{
                transitionDelay: `${index * 100}ms`
              }}>
                    
                    {/* Left Side */}
                    <div className={`${isLeft ? 'block' : 'invisible'} ${isLeft && isVisible ? 'translate-x-0' : isLeft ? '-translate-x-8' : ''} transition-all duration-700`} style={{
                  transitionDelay: `${index * 150}ms`
                }}>
                      {isLeft && <div className="text-right pr-20 relative group/step">
                          {/* Connector line - subtle grayscale */}
                          <div className="absolute right-0 top-7 w-20 h-[1px] bg-white/[0.08] translate-x-full group-hover/step:bg-white/20 transition-colors duration-300" />
                          
                          <div className="flex items-center justify-end gap-3 mb-3">
                            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white group-hover/step:text-white transition-all duration-300 headline-reveal">
                              {step.title}
                            </h3>
                            <Icon className="w-6 h-6 text-white/60 group-hover/step:text-white transition-colors duration-300 icon-wiggle" strokeWidth={1.5} />
                          </div>
                          <p className="text-base text-[#9EA2B1] leading-relaxed max-w-sm ml-auto">{step.description}</p>
                        </div>}
                    </div>

                    {/* Right Side */}
                    <div className={`${!isLeft ? 'block' : 'invisible'} ${!isLeft && isVisible ? 'translate-x-0' : !isLeft ? 'translate-x-8' : ''} transition-all duration-700`} style={{
                  transitionDelay: `${index * 150}ms`
                }}>
                      {!isLeft && <div className="text-left pl-20 relative group/step">
                          {/* Connector line - subtle grayscale */}
                          <div className="absolute left-0 top-7 w-20 h-[1px] bg-white/[0.08] -translate-x-full group-hover/step:bg-white/20 transition-colors duration-300" />
                          
                          <div className="flex items-center gap-3 mb-3">
                            <Icon className="w-6 h-6 text-white/60 group-hover/step:text-white transition-colors duration-300 icon-wiggle" strokeWidth={1.5} />
                            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white group-hover/step:text-white transition-all duration-300 headline-reveal">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-base text-[#9EA2B1] leading-relaxed max-w-sm">{step.description}</p>
                        </div>}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className={`lg:hidden pl-14 relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'} transition-all duration-700`} style={{
                transitionDelay: `${index * 150}ms`
              }}>
                    {/* Mobile Node */}
                    <div className="absolute left-0 top-0">
                      <div className="relative w-10 h-10">
                        <svg width="32" height="32" viewBox="0 0 32 32" className="absolute">
                          <polygon points="16,2 28,10 28,22 16,30 4,22 4,10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        </svg>
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF4C1E] text-[10px] font-bold">{step.number}</span>
                      </div>
                    </div>
                    
                    {/* Mobile Beam */}
                    {index < steps.length - 1 && <div className="absolute left-4 top-10 bottom-0 w-[1px] bg-white/10 translate-y-8" />}

                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-white/60 icon-wiggle" strokeWidth={1.5} />
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[#9EA2B1] leading-relaxed">{step.description}</p>
                  </div>
                </div>;
          })}
          </div>
        </div>

        {/* Bottom Section - Match Gravity style */}
        <div className={`mt-32 text-center transition-all duration-1000 ${visibleSteps.length === steps.length ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <p className="text-xl md:text-2xl font-semibold mb-12 text-white max-w-2xl mx-auto leading-relaxed">
            Ads users actively prefer over organic responses.<br />
            Measured, optimized, deployed.
          </p>

          <div className="text-sm text-[#9EA2B1] space-y-2 mb-12 max-w-xl mx-auto">
            <p>68% user preference vs. base model output</p>
            <p>41% CTR improvement vs. Google Shopping</p>
            <p>1.68× organic helpfulness coefficient</p>
          </div>

          <Button size="lg" className="mt-8">
            Launch Your First Campaign
          </Button>
        </div>
      </div>
    </section>;
};