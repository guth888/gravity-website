import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, DollarSign, Zap, Target, BarChart3, Shield } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatCard } from "@/components/StatCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BenefitCard } from "@/components/BenefitCard";
import { FinalCTA } from "@/components/FinalCTA";

// Logo imports
import perplexityLogo from "@/assets/logos/perplexity.svg";
import cursorLogo from "@/assets/logos/cursor.svg";
import otterLogo from "@/assets/logos/otter.svg";
import notionLogo from "@/assets/logos/notion.svg";
import grammarlyLogo from "@/assets/logos/grammarly.svg";
import jasperLogo from "@/assets/logos/jasper.svg";

const logos = [
  { src: perplexityLogo, alt: "Perplexity" },
  { src: cursorLogo, alt: "Cursor" },
  { src: otterLogo, alt: "Otter" },
  { src: notionLogo, alt: "Notion" },
  { src: grammarlyLogo, alt: "Grammarly" },
  { src: jasperLogo, alt: "Jasper" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-28">
        <div className="container-default text-center">
          {/* Headline */}
          <h1 className="hero-headline text-foreground mb-6 animate-fade-in-up">
            AI conversations are the new{" "}
            <span className="gradient">ad channel</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-100">
            Gravity turns high-intent LLM moments into native, helpful suggestions—for publishers who want revenue and advertisers who want precision.
          </p>
          
          {/* CTA */}
          <div className="animate-fade-in-up delay-200">
            <Link to="/demo" className="btn-primary text-base px-8 py-4">
              Get a Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Logo Bar */}
          <div className="mt-16 sm:mt-20 animate-fade-in-up delay-300">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-6">
              Trusted by leading AI companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {logos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 sm:h-10 w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          DUAL VALUE CARDS
          ============================================ */}
      <section className="section-padding bg-muted/30">
        <div className="container-default">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Publishers Card */}
            <Link 
              to="/publishers"
              className="card-base card-hover p-8 sm:p-10 group"
            >
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <DollarSign className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                For Publishers
              </h3>
              <p className="text-muted-foreground mb-6">
                Monetize every conversation. Turn your AI interactions into revenue without compromising user experience.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Learn more
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Advertisers Card */}
            <Link 
              to="/advertisers"
              className="card-base card-hover p-8 sm:p-10 group"
            >
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <Target className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                For Advertisers
              </h3>
              <p className="text-muted-foreground mb-6">
                Reach users when intent peaks. Connect with audiences at the exact moment they're deciding.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Learn more
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS - Simple 3 Steps
          ============================================ */}
      <section className="section-padding">
        <div className="container-default">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The conversation is the context. Gravity is the engine.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-bold text-xl mb-6">
                1
              </div>
              <div className="w-16 h-16 mx-auto mb-6 text-muted-foreground">
                <MessageSquare className="w-full h-full" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Conversations happen
              </h3>
              <p className="text-muted-foreground">
                Your users are already having high-intent conversations—asking, comparing, deciding.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-bold text-xl mb-6">
                2
              </div>
              <div className="w-16 h-16 mx-auto mb-6 text-muted-foreground">
                <Zap className="w-full h-full" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Gravity matches intent
              </h3>
              <p className="text-muted-foreground">
                We surface native, contextual suggestions that feel like the LLM's own insight.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-bold text-xl mb-6">
                3
              </div>
              <div className="w-16 h-16 mx-auto mb-6 text-muted-foreground">
                <BarChart3 className="w-full h-full" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Value flows to all
              </h3>
              <p className="text-muted-foreground">
                Publishers get revenue. Advertisers get precision. Users get helpful suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS BAR
          ============================================ */}
      <section className="py-12 sm:py-16 bg-foreground text-background">
        <div className="container-default">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <StatCard value="12" suffix="%" label="Avg CTR" />
            <StatCard value="3" suffix="x" label="Higher RPM" />
            <StatCard value="40" suffix="%" label="Lower CAC" />
            <StatCard value="3" label="Lines of Code" prefix="" suffix="" />
          </div>
        </div>
      </section>

      {/* ============================================
          PUBLISHER BENEFITS
          ============================================ */}
      <section className="section-padding">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                For Publishers
              </span>
              <h2 className="text-foreground mt-3 mb-6">
                Made for publishers who value user experience
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your conversations are full of commercial intent, but you're not capturing that value. Integrate Gravity. Suggestions flow naturally. Revenue flows automatically.
              </p>
              <Link to="/publishers" className="btn-primary">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <BenefitCard
                icon={<DollarSign className="w-5 h-5" />}
                title="Higher RPM"
                stat="$4.50"
                statLabel="avg"
                description="Significantly higher than traditional display ads."
              />
              <BenefitCard
                icon={<BarChart3 className="w-5 h-5" />}
                title="95%+ Fill Rate"
                description="Premium demand ensures your inventory is always filled."
              />
              <BenefitCard
                icon={<Zap className="w-5 h-5" />}
                title="3-Line Integration"
                description="Drop in our SDK and start earning in minutes."
              />
              <BenefitCard
                icon={<Shield className="w-5 h-5" />}
                title="Full UX Control"
                description="You decide how and where suggestions appear."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          ADVERTISER BENEFITS
          ============================================ */}
      <section className="section-padding bg-muted/30">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 order-2 lg:order-1">
              <BenefitCard
                icon={<Target className="w-5 h-5" />}
                title="12% Avg CTR"
                description="10x higher than traditional display advertising."
              />
              <BenefitCard
                icon={<DollarSign className="w-5 h-5" />}
                title="40% Lower CAC"
                description="Reach users when they're actively deciding."
              />
              <BenefitCard
                icon={<Shield className="w-5 h-5" />}
                title="100% Viewability"
                description="Every suggestion is seen, no hidden impressions."
              />
              <BenefitCard
                icon={<BarChart3 className="w-5 h-5" />}
                title="Brand Safe"
                description="Premium inventory with strict quality controls."
              />
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                For Advertisers
              </span>
              <h2 className="text-foreground mt-3 mb-6">
                Made for brands who value precision
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your buyers are in LLM conversations, but you can't reach them there. Gravity places you at the exact moment of high intent—when they're asking, comparing, deciding.
              </p>
              <Link to="/advertisers" className="btn-primary">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIAL
          ============================================ */}
      <section className="section-padding">
        <div className="container-narrow">
          <TestimonialCard
            variant="large"
            quote="Gravity transformed how we think about monetization. The suggestions feel so natural that our users actually thank us for them. We've seen 3x higher RPM compared to traditional display ads."
            name="Sarah Chen"
            title="Head of Product"
            company="AI Assistant Platform"
          />
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <FinalCTA
        headline="Ready to unlock the value in every conversation?"
        subheadline="Join the companies already transforming AI conversations into business results."
        primaryCTA={{ text: "Get a Demo", href: "/demo" }}
        secondaryCTA={{ text: "View Documentation", href: "/publishers#integration" }}
        variant="gradient"
      />

      <Footer />
    </div>
  );
};

export default Index;
