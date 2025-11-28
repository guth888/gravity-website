import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy load heavy components for instant initial render
const SocialProofBand = lazy(() => import("@/components/SocialProofBand").then(m => ({
  default: m.SocialProofBand
})));
const DualValueCards = lazy(() => import("@/components/DualValueCards").then(m => ({
  default: m.DualValueCards
})));
const HowItWorksSimple = lazy(() => import("@/components/HowItWorksSimple").then(m => ({
  default: m.HowItWorksSimple
})));
const AudienceCTA = lazy(() => import("@/components/AudienceCTA").then(m => ({
  default: m.AudienceCTA
})));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({
  default: m.FAQSection
})));
const Footer = lazy(() => import("@/components/Footer").then(m => ({
  default: m.Footer
})));

const Index = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Social Proof - Logo Marquee */}
        <Suspense fallback={null}>
          <SocialProofBand className="-mb-12 sm:-mb-16 md:-mb-20" />
        </Suspense>
        
        {/* Dual Value Cards - Publisher & Advertiser */}
        <Suspense fallback={null}>
          <DualValueCards />
        </Suspense>
        
        {/* How It Works - 3 Step Process */}
        <Suspense fallback={null}>
          <HowItWorksSimple />
        </Suspense>
        
        {/* Publisher & Advertiser CTA - Side by Side */}
        <Suspense fallback={null}>
          <AudienceCTA />
        </Suspense>
        
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
