import { useEffect, useRef, useState } from "react";
import { MessageSquare, Sparkles, Search, Brain, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarParticles } from "./StarParticles";
import { MeshAccent } from "./MeshAccent";

// Logos temporarily removed - will be reimplemented with new two-row sliding design

const llmPublishers = [{
  name: "Custom LLMs",
  icon: Code2
}];
export const Integrations = () => {
  const [visibleLogos, setVisibleLogos] = useState<number[]>([]);
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
      llmPublishers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLogos(prev => [...prev, index]);
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
      
      {/* Single orange radial light gradient */}
      <div className="absolute bottom-1/3 left-1/3 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gravity-orange text-white text-sm font-medium mb-6 uppercase tracking-[0.08em]">
            INTEGRATIONS
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            Works Everywhere AI Conversations Happen
          </h2>
          <p className="text-lg md:text-xl text-[#9EA2B1] max-w-2xl mx-auto leading-relaxed">
            One platform. Every major LLM. Billions of AI-powered conversations.
          </p>
        </div>

        {/* LLM Publisher Grid - MONOCHROME WITH ORANGE GLOW */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {llmPublishers.map((publisher, index) => {
          const isVisible = visibleLogos.includes(index);
          return <div key={publisher.name} className={`group relative p-8 bg-card backdrop-blur-sm border border-border rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg shadow-lg transition-all duration-700 cursor-pointer hover:border-primary/30 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{
            transitionDelay: `${index * 100}ms`
          }}>
                {/* Orange neon line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4C1E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon or Logo - MONOCHROME */}
                <div className="flex flex-col items-center gap-4">
                  <div className={`flex items-center justify-center w-20 h-20 rounded-xl bg-white/[0.03] border border-white/[0.04] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-[#FF4C1E]/50 group-hover:shadow-[0_0_20px_rgba(255,76,30,0.3)]`}>
                    {publisher.icon && (
                      <publisher.icon className="w-10 h-10 text-white transition-colors" strokeWidth={2} />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white text-center">
                    {publisher.name}
                  </span>
                </div>
              </div>;
        })}
        </div>

        {/* Connection Lines Visualization - ORANGE */}
        

        {/* For Publishers Callout */}
        
      </div>
    </section>;
};