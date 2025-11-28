import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy load heavy components for instant initial render
const SocialProofBand = lazy(() => import("@/components/SocialProofBand").then(m => ({
  default: m.SocialProofBand
})));
const DualAudienceSplit = lazy(() => import("@/components/DualAudienceSplit").then(m => ({
  default: m.DualAudienceSplit
})));
const HowItWorksSimple = lazy(() => import("@/components/HowItWorksSimple").then(m => ({
  default: m.HowItWorksSimple
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
        
        {/* Dual Audience Split - Publisher & Advertiser */}
        <Suspense fallback={null}>
          <DualAudienceSplit />
        </Suspense>
        
        {/* How It Works - 3 Step Process */}
        <Suspense fallback={null}>
          <HowItWorksSimple />
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
