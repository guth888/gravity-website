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
const Footer = lazy(() => import("@/components/Footer").then(m => ({
  default: m.Footer
})));
const Index = () => {
  return <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Suspense fallback={null}>
          <SocialProofBand className="-mt-12 sm:-mt-14 md:-mt-16" />
        </Suspense>
        <Suspense fallback={null}>
          <DualValueCards />
        </Suspense>
        <Suspense fallback={null}>
          <Footer className="px-0 mx-0 my-20 md:my-28 lg:my-32 xl:my-36" />
        </Suspense>
      </div>
    </ErrorBoundary>;
};
export default Index;