import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatCard } from "@/components/StatCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
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

// Case studies data
const caseStudies = [
  {
    companyLogo: perplexityLogo,
    companyName: "AI Search Platform",
    result: "Increased RPM by 3x while maintaining user satisfaction",
    quote: "The suggestions feel so natural that users actually thank us for them.",
    category: "publisher" as const,
    link: "#"
  },
  {
    companyLogo: cursorLogo,
    companyName: "Developer Tools",
    result: "Generated $50K monthly revenue from day one",
    quote: "Integration took 30 minutes. Revenue started flowing immediately.",
    category: "publisher" as const,
    link: "#"
  },
  {
    companyLogo: notionLogo,
    companyName: "E-commerce Brand",
    result: "Achieved 14% CTR with 45% lower CAC",
    quote: "We shifted 30% of our search budget to Gravity.",
    category: "advertiser" as const,
    link: "#"
  },
  {
    companyLogo: grammarlyLogo,
    companyName: "SaaS Company",
    result: "4x conversion rate vs traditional display",
    quote: "The intent signals are unmatched.",
    category: "advertiser" as const,
    link: "#"
  },
  {
    companyLogo: jasperLogo,
    companyName: "Content Platform",
    result: "95% fill rate with premium demand",
    quote: "Finally monetizing without destroying UX.",
    category: "publisher" as const,
    link: "#"
  },
  {
    companyLogo: otterLogo,
    companyName: "Travel Tech",
    result: "2.8x ROI compared to search ads",
    quote: "Users are so much more qualified when we reach them mid-conversation.",
    category: "advertiser" as const,
    link: "#"
  }
];

// Featured testimonials
const testimonials = [
  {
    quote: "Gravity transformed how we think about monetization. The suggestions feel so natural that our users actually thank us for them. We've seen 3x higher RPM compared to traditional display ads.",
    name: "Sarah Chen",
    title: "Head of Product",
    company: "AI Assistant Platform"
  },
  {
    quote: "We've tested every channel. Gravity delivers 4x the CTR of search and 10x display. The intent is just unmatched when you reach users mid-conversation.",
    name: "Michael Torres",
    title: "VP of Growth",
    company: "E-commerce Brand"
  },
  {
    quote: "Before Gravity, we tried traditional display ads and they destroyed our user experience. Now our users find the suggestions genuinely helpful.",
    name: "Jordan Lee",
    title: "Founder",
    company: "AI Search Startup"
  }
];

const Customers = () => {
  const [filter, setFilter] = useState<'all' | 'publisher' | 'advertiser'>('all');

  const filteredCaseStudies = caseStudies.filter(study => {
    if (filter === 'all') return true;
    return study.category === filter;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-default text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Trusted by leading{" "}
            <span className="gradient">AI companies</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            See how publishers and advertisers are transforming AI conversations into business results.
          </p>

          {/* Logo Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="h-10 sm:h-12 w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          STATS BAR
          ============================================ */}
      <section className="py-12 sm:py-16 bg-foreground text-background">
        <div className="container-default">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <StatCard value="3" suffix="x" label="Higher RPM" />
            <StatCard value="12" suffix="%" label="Avg CTR" />
            <StatCard value="500" suffix="+" label="Publishers" />
            <StatCard value="50" suffix="+" label="Demand Partners" />
          </div>
        </div>
      </section>

      {/* ============================================
          CASE STUDIES GRID
          ============================================ */}
      <section className="section-padding">
        <div className="container-default">
          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('publisher')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'publisher' 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Publishers
            </button>
            <button
              onClick={() => setFilter('advertiser')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'advertiser' 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Advertisers
            </button>
          </div>

          {/* Case Studies Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                companyLogo={study.companyLogo}
                companyName={study.companyName}
                result={study.result}
                quote={study.quote}
                category={study.category}
                link={study.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED TESTIMONIALS
          ============================================ */}
      <section className="section-padding bg-muted/30">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                variant="default"
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                company={testimonial.company}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          RESULTS BREAKDOWN
          ============================================ */}
      <section className="section-padding">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Publishers Results */}
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Publisher Results
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-2 mb-6">
                Revenue without compromise
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-foreground min-w-[80px]">$4.50</div>
                  <div>
                    <div className="font-medium text-foreground">Average RPM</div>
                    <div className="text-sm text-muted-foreground">3x higher than traditional display</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-foreground min-w-[80px]">95%</div>
                  <div>
                    <div className="font-medium text-foreground">Fill Rate</div>
                    <div className="text-sm text-muted-foreground">Premium demand ensures monetization</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-foreground min-w-[80px]">3 min</div>
                  <div>
                    <div className="font-medium text-foreground">Integration Time</div>
                    <div className="text-sm text-muted-foreground">Start earning in minutes, not weeks</div>
                  </div>
                </div>
              </div>
              <Link to="/publishers" className="btn-primary mt-8">
                Learn More for Publishers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Advertisers Results */}
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Advertiser Results
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-2 mb-6">
                Precision when it matters
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-foreground min-w-[80px]">12%</div>
                  <div>
                    <div className="font-medium text-foreground">Average CTR</div>
                    <div className="text-sm text-muted-foreground">10x higher than display advertising</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-foreground min-w-[80px]">40%</div>
                  <div>
                    <div className="font-medium text-foreground">Lower CAC</div>
                    <div className="text-sm text-muted-foreground">Reach users at peak intent</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-foreground min-w-[80px]">100%</div>
                  <div>
                    <div className="font-medium text-foreground">Viewability</div>
                    <div className="text-sm text-muted-foreground">Every impression is seen</div>
                  </div>
                </div>
              </div>
              <Link to="/advertisers" className="btn-primary mt-8">
                Learn More for Advertisers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <FinalCTA
        headline="Join the companies transforming AI conversations"
        subheadline="See how Gravity can work for your business."
        primaryCTA={{ text: "Get a Demo", href: "/demo" }}
        variant="gradient"
      />

      <Footer />
    </div>
  );
};

export default Customers;

