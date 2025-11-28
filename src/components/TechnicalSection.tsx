import { useEffect, useRef, useState } from "react";
import { Brain, Shield, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StarParticles } from "./StarParticles";
import { MeshAccent } from "./MeshAccent";

const pillars = [
  {
    icon: Brain,
    title: "How We Work with LLMs",
    description: "Context validation engine ensures brand safety across ChatGPT, Claude, Perplexity, and 12+ LLM publishers.",
    details: [
      "Real-time bidding across multiple AI platforms",
      "Semantic analysis for context matching",
      "Dynamic creative optimization per LLM"
    ]
  },
  {
    icon: Shield,
    title: "Brand Safety & Context Validation",
    description: "AI-powered sentiment analysis prevents your ads from appearing in negative or inappropriate contexts.",
    details: [
      "Custom blocklists and category controls",
      "Real-time sentiment detection",
      "Automated brand safety scoring"
    ]
  },
  {
    icon: Lock,
    title: "Privacy-First. Zero PII. Cookie-less.",
    description: "No user tracking. No personal data collection. GDPR & CCPA compliant by design.",
    details: [
      "Contextual signals only - no personal data",
      "Full compliance with global privacy laws",
      "Transparent data practices"
    ]
  }
];

export const TechnicalSection = () => {
  const [visiblePillars, setVisiblePillars] = useState<number[]>([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      pillars.forEach((_, index) => {
        setTimeout(() => {
          setVisiblePillars(prev => [...prev, index]);
        }, index * 300);
      });
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-36 px-6 bg-background overflow-hidden"
    >
      {/* Star Particles */}
      <StarParticles count={12} />
      
      {/* Mesh Accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <MeshAccent opacity={2} />
      </div>
      
      {/* Single orange radial light gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gravity-orange text-white text-sm font-medium mb-6 uppercase tracking-[0.08em]">
            TECHNICAL FOUNDATION
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            Built on Trust & Transparency
          </h2>
          <p className="text-lg md:text-xl text-[#9EA2B1] max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade infrastructure designed for privacy, safety, and performance
          </p>
        </div>

        {/* Technical Pillars - DARK COSMIC CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isVisible = visiblePillars.includes(index);

            return (
              <Card
                key={pillar.title}
                className={`relative p-8 bg-card backdrop-blur-sm border border-border rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg shadow-lg transition-all duration-700 group hover:border-primary/30 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Mesh pattern overlay */}
                <MeshAccent className="absolute inset-0" opacity={2} />
                
                {/* Orange neon line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4C1E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon - MONOCHROME WITH ORANGE GLOW */}
                <div className={`relative z-10 mb-6 p-4 w-fit rounded-xl bg-muted border border-border transition-transform duration-500 hover:scale-110 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.3)]`}>
                  <Icon className="w-8 h-8 text-foreground" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-base text-muted-foreground leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Details List */}
                <ul className="relative z-10 space-y-3">
                  {pillar.details.map((detail, i) => (
                    <li 
                      key={i}
                      className={`flex items-start gap-3 text-sm text-muted-foreground transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                      style={{ transitionDelay: `${index * 150 + i * 100}ms` }}
                    >
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0`} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Trust Badges - DARK COSMIC */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 ${
          visiblePillars.length === pillars.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="px-6 py-3 bg-card backdrop-blur-sm border border-border rounded-lg">
              <span className="text-sm font-semibold text-foreground">GDPR Compliant</span>
            </div>
            <div className="px-6 py-3 bg-card backdrop-blur-sm border border-border rounded-lg">
              <span className="text-sm font-semibold text-foreground">CCPA Compliant</span>
            </div>
            <div className="px-6 py-3 bg-card backdrop-blur-sm border border-border rounded-lg">
              <span className="text-sm font-semibold text-foreground">SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
