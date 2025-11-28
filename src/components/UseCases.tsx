import { useEffect, useRef, useState } from "react";
import { Briefcase, ShoppingCart, Building2, Plane, Store, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StarParticles } from "./StarParticles";
import { MeshAccent } from "./MeshAccent";

const useCases = [
  {
    icon: Briefcase,
    title: "SaaS",
    description: "Launch your CRM inside AI conversations where prospects are already asking for recommendations.",
    preview: "Best project management tools for remote teams?"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Appear in product research conversations with contextual suggestions users actually prefer.",
    preview: "What's the best wireless headphones under $200?"
  },
  {
    icon: Building2,
    title: "Finance",
    description: "Position your fintech platform where users discuss financial decisions in real-time.",
    preview: "How do I invest for retirement in my 30s?"
  },
  {
    icon: Plane,
    title: "Travel",
    description: "Surface your booking platform in travel planning conversations at the moment of intent.",
    preview: "Best hotels in Barcelona near the beach?"
  },
  {
    icon: Store,
    title: "Local Business",
    description: "Get discovered when customers ask for local recommendations in their neighborhood.",
    preview: "Best Italian restaurant in Brooklyn?"
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Connect patients with healthcare services when they search for medical information and providers.",
    preview: "Best dermatologist near me for acne treatment?"
  }
];

export const UseCases = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
      useCases.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 200);
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
      <div className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header - CINEMATIC SCALE */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gravity-orange text-white text-sm font-medium mb-6 uppercase tracking-[0.08em]">
            USE CASES
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            Built for Every Industry
          </h2>
          <p className="text-lg md:text-xl text-[#9EA2B1] max-w-2xl mx-auto leading-relaxed">
            From SaaS to local businesses, GRAVITY powers AI-native advertising across verticals
          </p>
        </div>

        {/* Use Case Cards - ORANGE NEON */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const isVisible = visibleCards.includes(index);
            const isHovered = hoveredCard === index;

            return (
              <Card
                key={useCase.title}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-8 bg-card backdrop-blur-sm border border-border rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg shadow-lg transition-all duration-700 cursor-pointer overflow-hidden hover:border-primary/30 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Mesh pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                  <MeshAccent opacity={2} />
                </div>
                
                {/* Orange neon line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4C1E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon - MONOCHROME WITH ORANGE GLOW */}
                <div className={`relative mb-4 p-3 w-fit rounded-xl bg-white/[0.03] border border-white/[0.04] transition-all duration-500 group-hover:border-[#FF4C1E]/50 ${
                  isHovered ? 'scale-110 rotate-6 shadow-[0_0_20px_rgba(255,76,30,0.3)]' : 'scale-100 rotate-0'
                }`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-base text-[#9EA2B1] leading-relaxed mb-4">
                    {useCase.description}
                  </p>

                  {/* Preview bubble - shows on hover */}
                  <div className={`transition-all duration-500 ${
                    isHovered ? 'opacity-100 max-h-20 mt-4' : 'opacity-0 max-h-0 mt-0'
                  } overflow-hidden`}>
                    <div className={`p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]`}>
                      <p className="text-sm text-[#9EA2B1] italic">
                        "{useCase.preview}"
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
