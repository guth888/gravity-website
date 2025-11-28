import { Header } from "@/components/Header";
import { WhyThisExists } from "@/components/WhyThisExists";
import { Features } from "@/components/Features";
import { UseCases } from "@/components/UseCases";
import { Integrations } from "@/components/Integrations";
import { SandboxDemo } from "@/components/SandboxDemo";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { AmbientStars } from "@/components/AmbientStars";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
export const Advertisers = () => {
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
              <BreadcrumbPage>For Advertisers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Hero Section for Advertisers - Device-aware content */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-black via-black to-background">
        <div className="container px-4 sm:px-6 md:px-8 text-center space-y-3 sm:space-y-4 md:space-y-6 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] mx-auto">
          {/* Mobile: Direct, action-oriented */}
          <h1 className="sm:hidden text-3xl font-bold text-white leading-tight">
            Reach Users in AI Conversations
          </h1>
          {/* Tablet+: Full headline */}
          <h1 className="hidden sm:block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
            For Advertisers
          </h1>
          {/* Subheadline - concise on mobile */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 max-w-full sm:max-w-3xl mx-auto">
            <span className="sm:hidden">Be the suggestion users choose inside real AI conversations.</span>
            <span className="hidden sm:inline">Reach users at the exact moment they want you. Be the suggestion they choose inside real AI conversations.</span>
          </p>
        </div>
      </section>

      <WhyThisExists />
      <Features />
      <UseCases />
      <Integrations />
      <SandboxDemo />
      
      
      <Footer />
    </div>;
};