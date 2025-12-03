import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const GravityDocs = lazy(() => import("@/components/GravityDocs"));

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero section for docs page */}
      <div className="pt-20 pb-16 bg-gradient-to-b from-background to-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3D3D3D]/10 rounded-full mb-6 border border-[#3D3D3D]/20">
            <div className="w-2 h-2 rounded-full bg-[#3D3D3D]" />
            <span className="text-xs font-medium text-[#3D3D3D] uppercase tracking-widest">Documentation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
            How Gravity Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive guide to the platform, from architecture to implementation.
          </p>
        </div>
      </div>

      {/* Docs content */}
      <Suspense fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-white/50">Loading documentation...</div>
        </div>
      }>
        <GravityDocs />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Docs;

