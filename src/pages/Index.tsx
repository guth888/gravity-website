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
const PublisherCTASection = lazy(() => import("@/components/PublisherCTASection").then(m => ({
  default: m.PublisherCTASection
})));
const AdvertiserCTASection = lazy(() => import("@/components/AdvertiserCTASection").then(m => ({
  default: m.AdvertiserCTASection
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
          <SocialProofBand className="-mt-8 sm:-mt-12 md:-mt-16" />
        </Suspense>
        
        {/* Dual Value Cards - Publisher & Advertiser */}
        <Suspense fallback={null}>
          <DualValueCards />
        </Suspense>
        
        {/* How It Works - 3 Step Process */}
        <Suspense fallback={null}>
          <HowItWorksSimple />
        </Suspense>
        
        {/* Publisher CTA Section */}
        <Suspense fallback={null}>
          <PublisherCTASection />
        </Suspense>
        
        {/* Advertiser CTA Section */}
        <Suspense fallback={null}>
          <AdvertiserCTASection />
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
