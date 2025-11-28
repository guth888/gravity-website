import { useEffect, useRef, useState } from "react";
import { Check, Sparkles, Zap, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarParticles } from "./StarParticles";

const tiers = [
  {
    name: "Launch",
    icon: Zap,
    price: 500,
    description: "Perfect for testing the AI answer surface",
    features: [
      "100,000 impressions/mo",
      "3 active campaigns",
      "Sandbox preview",
      "Basic analytics",
      "Email support"
    ],
    cta: "Start Free Trial",
    highlighted: false
  },
  {
    name: "Scale",
    icon: Sparkles,
    price: 2500,
    description: "For teams ready to dominate AI conversations",
    features: [
      "1M impressions/mo",
      "Unlimited campaigns",
      "Advanced targeting",
      "Real-time optimization",
      "Dedicated support",
      "Custom integrations"
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular"
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: null,
    description: "Custom solutions for large organizations",
    features: [
      "Custom volume",
      "White-label options",
      "API access",
      "Custom LLM integrations",
      "Priority support",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

export const PricingPreview = () => {
  const [visibleTiers, setVisibleTiers] = useState<number[]>([]);
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
      tiers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleTiers(prev => [...prev, index]);
        }, index * 200);
      });
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-background overflow-hidden"
    >
      {/* Star Particles */}
      <StarParticles count={20} />
      
      {/* Single orange radial light gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header - CINEMATIC SCALE */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gravity-orange text-white text-sm font-medium mb-6 uppercase tracking-[0.08em]">
            PRICING
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-[#9EA2B1] max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Tiers - COSMIC CARDS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const isVisible = visibleTiers.includes(index);

            return (
              <Card
                key={tier.name}
                className={`relative p-8 bg-card backdrop-blur-sm rounded-2xl transition-all duration-700 border group premium-card ${
                  tier.highlighted 
                    ? 'border-2 border-[#FF4C1E]/40 md:-mt-4 md:mb-4 scale-105 hover:border-[#FF4C1E]/60' 
                    : 'border border-white/[0.04] hover:border-white/[0.08]'
                } ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Orange neon line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4C1E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gravity-orange rounded-full">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Icon - MONOCHROME WITH ORANGE GLOW + BOUNCE ANIMATION */}
                <div className={`relative z-10 mb-6 p-3 w-fit rounded-xl bg-white/[0.03] border border-white/[0.04] transition-transform duration-500 hover:scale-110 hover:border-[#FF4C1E]/50 icon-bounce`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>

                {/* Tier Name */}
                <h3 className="relative z-10 text-2xl md:text-3xl font-semibold mb-2 text-white">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="relative z-10 mb-4">
                  {tier.price ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        ${tier.price}
                      </span>
                      <span className="text-sm text-[#9EA2B1]">/month</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-white">Custom</span>
                  )}
                </div>

                {/* Description */}
                <p className="relative z-10 text-sm text-[#9EA2B1] mb-6">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="relative z-10 space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li 
                      key={i}
                      className={`flex items-start gap-3 text-sm text-white transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                      style={{ transitionDelay: `${index * 150 + i * 100}ms` }}
                    >
                      <Check className="w-5 h-5 flex-shrink-0 text-gravity-teal" strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  className={`relative z-10 w-full`}
                  variant={tier.highlighted ? 'default' : 'outline'}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${
          visibleTiers.length === tiers.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-sm text-[#9EA2B1]">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};
