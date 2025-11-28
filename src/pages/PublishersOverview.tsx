import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublisherCTA } from "@/components/PublisherCTA";
import { AmbientStars } from "@/components/AmbientStars";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export const PublishersOverview = () => {
  return <div className="min-h-screen relative">
      <AmbientStars starCount={6} />
      <Header />
      
      {/* Breadcrumb Navigation */}
      <div className="container px-6 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>For Publishers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Hero Section for Publishers - Mobile-first */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-black via-black to-background">
        <div className="container px-4 sm:px-6 md:px-8 text-center space-y-3 sm:space-y-4 md:space-y-6 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] mx-auto">
          {/* Mobile: Concise, benefit-focused */}
          <h1 className="sm:hidden text-3xl font-bold text-white leading-tight">
            Monetize AI Conversations
          </h1>
          {/* Tablet+: Full headline */}
          <h1 className="hidden sm:block text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            For Publishers
          </h1>
          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 max-w-full sm:max-w-3xl mx-auto">
            <span className="sm:hidden">Turn AI conversations into effortless revenue that respects users.</span>
            <span className="hidden sm:inline">Turn every AI conversation into effortless, native revenue. Monetization that actually respects your users.</span>
          </p>
        </div>
      </section>

      {/* Publisher features - Single column on mobile, breathing room on desktop */}
      <section className="section-spacing px-4 sm:px-6 md:px-8 bg-background">
        <div className="container mx-auto max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] space-y-8 sm:space-y-10 md:space-y-12">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">SDK Integration</h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-400">
              <span className="md:hidden">One integration unlocks high-intent monetization that feels organic.</span>
              <span className="hidden md:inline">Integrate Gravity once to unlock high-intent sponsored suggestions that feel organic, protect UX, and monetize conversations automatically.</span>
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Real-time Analytics</h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-400">
              <span className="md:hidden">Track revenue and engagement in real-time.</span>
              <span className="hidden md:inline">Track performance, revenue, and user engagement in real-time with our comprehensive analytics dashboard.</span>
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Privacy-First Approach</h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-400">
              <span className="md:hidden">Clean monetization with zero tracking or data collection.</span>
              <span className="hidden md:inline">Built with privacy at the core. No tracking, no data collection, just clean monetization that respects your users.</span>
            </p>
          </div>
        </div>
      </section>

      
      <Footer />
    </div>;
};