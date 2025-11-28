import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gravityLogo from '@/assets/gravity-logo.png';

export const Hero = () => {
  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight max-w-4xl mx-auto animate-fade-in-up">
          AI conversations are the new{" "}
          <span className="gradient">ad channel</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-100">
          Gravity turns high-intent LLM moments into native, helpful suggestions—for publishers who want revenue and advertisers who want precision.
        </p>
        
        {/* CTA */}
        <div className="animate-fade-in-up delay-200">
          <Link 
            to="/demo" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get a Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
