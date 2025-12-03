import { lazy, Suspense, useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Link } from "react-router-dom";
import { Preloader } from "@/components/Preloader";

// Lazy load heavy components for instant initial render
const SocialProofBand = lazy(() => import("@/components/SocialProofBand").then(m => ({
  default: m.SocialProofBand
})));
const HowItWorksSimple = lazy(() => import("@/components/HowItWorksSimple").then(m => ({
  default: m.HowItWorksSimple
})));
const DualAudienceSection = lazy(() => import("@/components/DualAudienceSection").then(m => ({
  default: m.DualAudienceSection
})));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({
  default: m.FAQSection
})));
const Footer = lazy(() => import("@/components/Footer").then(m => ({
  default: m.Footer
})));

const Index = () => {
  // Determine if we should show preloader based on navigation type
  const shouldShowPreloader = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check if already shown in this session
    if (sessionStorage.getItem('gravity_preloader_seen') === 'true') {
      return false;
    }
    
    // Check navigation type using Performance API
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        const navType = navEntries[0].type;
        // 'navigate' = typing URL or clicking external link (show preloader)
        // 'reload' = refresh (don't show preloader)
        // 'back_forward' = browser back/forward (don't show preloader)
        return navType === 'navigate';
      }
    } catch (e) {
      // Fallback: check referrer - empty referrer usually means typing URL
      const referrer = document.referrer;
      const currentHost = window.location.hostname;
      const referrerHost = referrer ? new URL(referrer).hostname : '';
      
      // Show if no referrer (direct navigation) or referrer is from different domain
      return !referrer || referrerHost !== currentHost;
    }
    
    return false;
  };
  
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader());
  const [contentVisible, setContentVisible] = useState(!showPreloader);

  const handlePreloaderComplete = () => {
    // Mark preloader as seen in this session (clears when tab closes)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('gravity_preloader_seen', 'true');
    }
    setShowPreloader(false);
    setContentVisible(true);
  };

  return (
    <ErrorBoundary>
      {/* Preloader */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div className={`min-h-screen bg-background transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Social Proof - Logo Marquee */}
        <Suspense fallback={null}>
          <SocialProofBand className="mt-0" />
        </Suspense>
        
        {/* How It Works - 3 Step Process */}
        <Suspense fallback={null}>
          <HowItWorksSimple />
        </Suspense>
        
        {/* Dual Audience Section - Publishers & Advertisers */}
        <Suspense fallback={null}>
          <DualAudienceSection />
        </Suspense>
        
        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 bg-[#F8F8F8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                What people are saying
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground mt-3">
                Trusted by industry leaders
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  quote: "Traditional display just doesn't work in conversational interfaces. We needed something native.",
                  company: "AI Platform",
                  author: "Product Lead"
                },
                {
                  quote: "Every question is a buying signal. We just needed a way to be there at the right moment.",
                  company: "E-commerce Brand",
                  author: "Growth Director"
                },
                {
                  quote: "The suggestions feel like a natural part of the conversation. Users actually thank us for them.",
                  company: "SaaS Company",
                  author: "Marketing VP"
                },
                {
                  quote: "This is the first truly new ad format in a decade. We're seeing results we never thought possible.",
                  company: "DTC Brand",
                  author: "CEO"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden"
                >
                  {/* Dotted background pattern */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />
                  
                  <div className="relative z-10">
                    {/* Company */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {testimonial.company.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{testimonial.company}</span>
                    </div>
                    
                    {/* Quote */}
                    <p className="text-sm text-foreground leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    
                    {/* Attribution */}
                    <p className="text-sm text-muted-foreground">
                      — {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Docs CTA Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground mb-3">
              Want to learn more?
            </h2>
            <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our comprehensive documentation to understand how Gravity works.
            </p>
            <Link 
              to="/docs"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors text-sm"
            >
              Read the Docs
            </Link>
          </div>
        </section>
        
        {/* FAQ Section */}
        <Suspense fallback={null}>
          <FAQSection />
        </Suspense>
        
        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
