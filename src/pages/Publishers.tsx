import { Link } from "react-router-dom";
import { ArrowRight, DollarSign, BarChart3, Zap, Shield, Code, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BenefitCard } from "@/components/BenefitCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TabSelector } from "@/components/TabSelector";
import { PublisherCalculator } from "@/components/Calculator";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";

const Publishers = () => {
  // Publisher type tabs content
  const publisherTabs = [
    {
      id: 'ai-chatbots',
      label: 'AI Chatbots',
      content: (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Monetize conversational AI
            </h3>
            <p className="text-muted-foreground mb-6">
              Turn your chatbot conversations into a revenue stream. Gravity surfaces contextual suggestions when users express commercial intent—without disrupting the conversation flow.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">$4.80</div>
                <div className="text-sm text-muted-foreground">Avg RPM</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">14%</div>
                <div className="text-sm text-muted-foreground">Avg CTR</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">AI</div>
                <div className="flex-1 bg-white rounded-lg p-3 text-sm">
                  Based on your requirements, I'd recommend looking at project management tools. Here are some options...
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
                  <span className="text-xs text-primary font-medium">Sponsored</span>
                  <p className="mt-1">Try Notion—teams using it report 40% faster project completion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-search',
      label: 'AI Search',
      content: (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Monetize search results
            </h3>
            <p className="text-muted-foreground mb-6">
              Your AI search already surfaces great results. Gravity adds sponsored suggestions that match user intent—generating revenue while maintaining search quality.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">$3.90</div>
                <div className="text-sm text-muted-foreground">Avg RPM</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">11%</div>
                <div className="text-sm text-muted-foreground">Avg CTR</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="text-sm text-muted-foreground mb-4">Search: "best CRM for startups"</div>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-3 border border-border/50">
                <div className="font-medium">HubSpot CRM</div>
                <div className="text-sm text-muted-foreground">Free tier available, scales with growth</div>
              </div>
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-primary font-medium">Sponsored</span>
                </div>
                <div className="font-medium">Pipedrive</div>
                <div className="text-sm text-muted-foreground">Built for sales teams, 14-day free trial</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-agents',
      label: 'AI Agents',
      content: (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Monetize agent workflows
            </h3>
            <p className="text-muted-foreground mb-6">
              When your AI agents help users accomplish tasks, Gravity identifies opportunities to suggest relevant products and services—turning assistance into revenue.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">$5.20</div>
                <div className="text-sm text-muted-foreground">Avg RPM</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">16%</div>
                <div className="text-sm text-muted-foreground">Avg CTR</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="text-sm text-muted-foreground mb-4">Agent: Travel Planning</div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-border/50">
                <div className="text-sm">I've found flights for your Tokyo trip in March. The best option is...</div>
              </div>
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                <span className="text-xs text-primary font-medium">Suggested</span>
                <p className="text-sm mt-1">Book with Expedia and save 15% on hotel bundles for this route.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'content-tools',
      label: 'Content Tools',
      content: (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Monetize content creation
            </h3>
            <p className="text-muted-foreground mb-6">
              When users create content with your AI tool, Gravity can suggest relevant products, services, or tools that enhance their work—creating natural monetization moments.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">$3.50</div>
                <div className="text-sm text-muted-foreground">Avg RPM</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">9%</div>
                <div className="text-sm text-muted-foreground">Avg CTR</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="text-sm text-muted-foreground mb-4">Writing: Blog post about productivity</div>
            <div className="bg-white rounded-lg p-4 border border-border/50 mb-3">
              <div className="h-16 bg-muted/30 rounded mb-2"></div>
              <div className="h-3 bg-muted/30 rounded w-3/4"></div>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
              <span className="text-xs text-primary font-medium">Enhance your content</span>
              <p className="text-sm mt-1">Add professional images with Canva Pro—first month free.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How easy is it to integrate Gravity's SDK?",
      answer: "Our SDK is designed for seamless integration. With just 3 lines of code, you can start showing suggestions. We provide comprehensive documentation, ready-to-use components, and dedicated support to ensure a smooth integration process."
    },
    {
      question: "How does Gravity preserve the conversational experience?",
      answer: "Our AI-powered system analyzes conversation context and only surfaces suggestions when they're genuinely relevant. Suggestions appear as natural extensions of the conversation, not intrusive ads. You have full control over frequency, placement, and styling."
    },
    {
      question: "What's the typical revenue I can expect?",
      answer: "Revenue varies based on your user engagement, conversation volume, and vertical. On average, publishers see $3-5 RPM, which is significantly higher than traditional display advertising due to the high-intent nature of conversational placements."
    },
    {
      question: "How does payment work?",
      answer: "We provide transparent, real-time reporting through our dashboard. Payments are processed monthly via wire transfer or PayPal, with detailed breakdowns of revenue by campaign and placement type. Minimum payout threshold is $100."
    },
    {
      question: "What about data privacy?",
      answer: "We're built with privacy-by-design principles and comply with GDPR, CCPA, and other major regulations. Our contextual targeting approach means we don't need to collect or store personal user data—we analyze conversation context in real-time."
    },
    {
      question: "Can I control what types of ads appear?",
      answer: "Absolutely. You have granular control over ad categories, specific advertisers, and content types. You can block categories, whitelist preferred advertisers, and set your own brand safety standards."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
                For Publishers
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                Made for publishers who value{" "}
                <span className="gradient">user experience</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Turn every LLM conversation into revenue—without compromising trust. Integrate Gravity. Suggestions flow naturally. Revenue flows automatically.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/demo?type=publisher" className="btn-primary">
                  Get a Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#integration" className="btn-secondary">
                  View Documentation
                </a>
              </div>
            </div>

            {/* Right: Testimonial */}
            <div>
              <TestimonialCard
                variant="compact"
                quote="We integrated Gravity in an afternoon and saw our first revenue within 24 hours. The suggestions feel so natural that our users actually engage with them."
                name="Alex Kim"
                title="CTO"
                company="AI Assistant Startup"
              />
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">$4.50</div>
                  <div className="text-xs text-muted-foreground">Avg RPM</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <div className="text-xs text-muted-foreground">Fill Rate</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">3 min</div>
                  <div className="text-xs text-muted-foreground">Integration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS - 3 Steps
          ============================================ */}
      <section className="section-padding bg-muted/30" id="network">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes, not months.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="hidden md:block flex-1 h-px bg-border"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Install our SDK
              </h3>
              <p className="text-muted-foreground mb-4">
                Add our lightweight SDK to your application with just 3 lines of code.
              </p>
              <div className="bg-foreground text-background rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">npm i @gravity/sdk</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="hidden md:block flex-1 h-px bg-border"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                We match high-intent moments
              </h3>
              <p className="text-muted-foreground">
                Gravity analyzes conversation context in real-time and identifies optimal moments to surface relevant suggestions.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Revenue flows automatically
              </h3>
              <p className="text-muted-foreground">
                Track performance in real-time. Get paid monthly. Scale your revenue as your users grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PUBLISHER TYPE TABS
          ============================================ */}
      <section className="section-padding">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Built for Every AI Platform</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're building a chatbot, search engine, or AI agent—Gravity adapts to your use case.
            </p>
          </div>

          <TabSelector tabs={publisherTabs} variant="pills" />
        </div>
      </section>

      {/* ============================================
          BENEFITS GRID
          ============================================ */}
      <section className="section-padding bg-muted/30">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Why Publishers Choose Gravity</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard
              icon={<DollarSign className="w-5 h-5" />}
              title="Higher RPM"
              stat="$4.50"
              statLabel="average"
              description="Significantly higher than traditional display ads due to high-intent placements."
            />
            <BenefitCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="95%+ Fill Rate"
              description="Premium demand from 50+ partners ensures your inventory is always monetized."
            />
            <BenefitCard
              icon={<Zap className="w-5 h-5" />}
              title="3-Line Integration"
              description="Our lightweight SDK integrates in minutes, not weeks. No heavy engineering required."
            />
            <BenefitCard
              icon={<Shield className="w-5 h-5" />}
              title="Full UX Control"
              description="You decide exactly how, when, and where suggestions appear in your experience."
            />
            <BenefitCard
              icon={<Code className="w-5 h-5" />}
              title="Real-Time Reporting"
              description="Track impressions, clicks, and revenue in real-time through our dashboard."
            />
            <BenefitCard
              icon={<Users className="w-5 h-5" />}
              title="Dedicated Support"
              description="Our team helps with integration, optimization, and scaling your revenue."
            />
          </div>
        </div>
      </section>

      {/* ============================================
          REVENUE CALCULATOR
          ============================================ */}
      <section className="section-padding" id="revenue">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-foreground mb-4">
                Estimate Your Revenue
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                See how much you could earn with Gravity based on your conversation volume and vertical.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  Revenue varies by vertical and user intent
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  No minimum traffic requirements
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  Scale revenue as your users grow
                </li>
              </ul>
            </div>

            <PublisherCalculator />
          </div>
        </div>
      </section>

      {/* ============================================
          INTEGRATION SECTION
          ============================================ */}
      <section className="section-padding bg-foreground text-background" id="integration">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Integration
              </span>
              <h2 className="text-background mt-3 mb-4">
                Live in 5 minutes
              </h2>
              <p className="text-lg text-background/70 mb-8">
                Our SDK is designed to be the simplest ad integration you've ever done. Three lines of code and you're monetizing.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.npmjs.com/package/@iris-technologies/api" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-lg text-sm font-medium hover:bg-background/20 transition-colors"
                >
                  TypeScript SDK
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.npmjs.com/package/@iris-technologies/react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-lg text-sm font-medium hover:bg-background/20 transition-colors"
                >
                  React SDK
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Code Preview */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-green-400">
{`import { Gravity } from '@gravity/sdk';

// Initialize with your API key
const gravity = new Gravity('your-api-key');

// Get contextual suggestions
const suggestion = await gravity.getSuggestion({
  context: userMessage,
  vertical: 'tech'
});`}
              </pre>
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
            quote="Before Gravity, we tried traditional display ads and they destroyed our user experience. Gravity's suggestions feel like a natural part of the conversation. Our users actually find them helpful, and we've increased our revenue by 3x."
            name="Jordan Lee"
            title="Founder"
            company="AI Search Platform"
          />
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
          ============================================ */}
      <section className="section-padding bg-muted/30" id="faq">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Everything you need to know about integrating Gravity.
              </p>
              <Link to="/demo?type=publisher" className="btn-primary">
                Talk to Sales
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <FinalCTA
        headline="Ready to monetize your conversations?"
        subheadline="Join the publishers already turning AI interactions into revenue."
        primaryCTA={{ text: "Get a Demo", href: "/demo?type=publisher" }}
        secondaryCTA={{ text: "View Documentation", href: "#integration" }}
      />

      <Footer />
    </div>
  );
};

export default Publishers;
