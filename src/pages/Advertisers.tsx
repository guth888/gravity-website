import { Link } from "react-router-dom";
import { ArrowRight, Target, BarChart3, Shield, Zap, Eye, DollarSign } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BenefitCard } from "@/components/BenefitCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TabSelector } from "@/components/TabSelector";
import { AdvertiserCalculator } from "@/components/Calculator";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";

const Advertisers = () => {
  // Use case tabs content
  const useCaseTabs = [
    {
      id: 'brand-awareness',
      label: 'Brand Awareness',
      content: (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Build brand presence in AI conversations
            </h3>
            <p className="text-muted-foreground mb-6">
              Be present when users are actively exploring and researching. Gravity places your brand naturally in high-intent conversations across premium AI platforms.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">2.1M+</div>
                <div className="text-sm text-muted-foreground">Daily impressions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">85%</div>
                <div className="text-sm text-muted-foreground">Brand recall</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-border/50">
                <div className="text-sm text-muted-foreground mb-2">User asking about CRM tools...</div>
                <div className="font-medium">What's the best CRM for a small team?</div>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary/20 rounded"></div>
                  <span className="font-medium">Your Brand</span>
                </div>
                <p className="text-sm text-muted-foreground">Trusted by 10,000+ small teams worldwide</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'performance',
      label: 'Performance',
      content: (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Drive conversions at the moment of intent
            </h3>
            <p className="text-muted-foreground mb-6">
              Reach users when they're actively comparing options and making decisions. Our contextual targeting delivers industry-leading conversion rates.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">12%</div>
                <div className="text-sm text-muted-foreground">Avg CTR</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">4.2%</div>
                <div className="text-sm text-muted-foreground">Conversion rate</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-border/50">
                <div className="text-sm text-muted-foreground mb-2">High-intent query:</div>
                <div className="font-medium">"Compare pricing for email marketing tools"</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-700">Conversion opportunity</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">High intent</span>
                </div>
                <p className="text-sm text-muted-foreground">Your targeted offer appears here</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'retargeting',
      label: 'Retargeting',
      content: (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Re-engage users across AI platforms
            </h3>
            <p className="text-muted-foreground mb-6">
              Reconnect with users who've shown interest in your product. Our contextual retargeting reaches them when they're having related conversations.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">3.5x</div>
                <div className="text-sm text-muted-foreground">Higher engagement</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">45%</div>
                <div className="text-sm text-muted-foreground">Lower CPA</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">Returning user interested in your category</div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Previously engaged</span>
                </div>
                <p className="text-sm font-medium">Welcome back! Complete your signup and get 20% off</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'competitive',
      label: 'Competitive Conquest',
      content: (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Win customers comparing alternatives
            </h3>
            <p className="text-muted-foreground mb-6">
              Reach users actively comparing your competitors. Present your differentiated value at the exact moment they're making decisions.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">18%</div>
                <div className="text-sm text-muted-foreground">Switch rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">2.8x</div>
                <div className="text-sm text-muted-foreground">ROI vs search</div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-border/50">
                <div className="text-sm text-muted-foreground mb-2">Comparison query:</div>
                <div className="font-medium">"Competitor X vs alternatives"</div>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Your Brand</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Featured alternative</span>
                </div>
                <p className="text-sm text-muted-foreground">See why teams are switching to us</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Ad format preview
  const adFormats = [
    {
      name: "Sponsored Suggestion",
      description: "Native recommendations that appear within the conversation flow.",
      ctr: "14%",
      cpm: "$18"
    },
    {
      name: "Contextual Comparison",
      description: "Appear when users are actively comparing products or services.",
      ctr: "16%",
      cpm: "$22"
    },
    {
      name: "Intent-Based Recommendation",
      description: "Triggered by specific high-intent signals in the conversation.",
      ctr: "12%",
      cpm: "$15"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How does Gravity's targeting work without personal data?",
      answer: "We use real-time contextual analysis of conversations to understand user intent. This means we don't need cookies or personal data—we target based on what users are actively discussing and searching for."
    },
    {
      question: "What's the minimum budget to get started?",
      answer: "We work with advertisers of all sizes. You can start with as little as $1,000/month to test the platform. Most advertisers see strong results within the first few weeks."
    },
    {
      question: "How do I ensure brand safety?",
      answer: "We maintain strict content guidelines and provide granular controls. You can specify which publisher categories to appear in, set keyword blocklists, and review placements before they go live."
    },
    {
      question: "What reporting is available?",
      answer: "Our dashboard provides real-time reporting on impressions, clicks, conversions, and ROI. You can break down performance by publisher, vertical, time period, and creative. We also support standard attribution integrations."
    },
    {
      question: "Can I integrate with my existing DSP?",
      answer: "Yes, we support standard OpenRTB 2.6 integration, making it easy for DSPs to plug into our inventory. We also offer a self-serve platform for direct advertisers."
    },
    {
      question: "How quickly can I launch a campaign?",
      answer: "Most campaigns launch within 24-48 hours of approval. Our team helps with creative optimization and targeting setup to ensure you're set up for success from day one."
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
                For Advertisers
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                Made for brands who value{" "}
                <span className="gradient">precision</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Reach users at the exact moment they're deciding—inside LLM conversations. Higher CTR. Lower CAC. Cleaner attribution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/demo?type=advertiser" className="btn-primary">
                  Get a Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#inventory" className="btn-secondary">
                  Browse Inventory
                </a>
              </div>
            </div>

            {/* Right: Testimonial */}
            <div>
              <TestimonialCard
                variant="compact"
                quote="We've tested every channel. Gravity delivers 4x the CTR of search and 10x display. The intent is just unmatched when you reach users mid-conversation."
                name="Sarah Chen"
                title="VP of Growth"
                company="E-commerce Brand"
              />
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">12%</div>
                  <div className="text-xs text-muted-foreground">Avg CTR</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">40%</div>
                  <div className="text-xs text-muted-foreground">Lower CAC</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-xs text-muted-foreground">Viewability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS
          ============================================ */}
      <section className="section-padding bg-muted/30" id="how-it-works">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Launch your first campaign in days, not weeks.
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
                Share your goals
              </h3>
              <p className="text-muted-foreground">
                Tell us your target audience, KPIs, and budget. We'll design a custom strategy for your objectives.
              </p>
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
                We build targeted campaigns
              </h3>
              <p className="text-muted-foreground">
                Our team creates optimized campaigns with contextual targeting, creative suggestions, and performance benchmarks.
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
                Go live in premium inventory
              </h3>
              <p className="text-muted-foreground">
                Your ads appear in high-intent conversations across our network of premium AI platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          USE CASE TABS
          ============================================ */}
      <section className="section-padding" id="targeting">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Reach Users at Every Stage</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From awareness to conversion, Gravity helps you connect with users at the right moment.
            </p>
          </div>

          <TabSelector tabs={useCaseTabs} variant="pills" />
        </div>
      </section>

      {/* ============================================
          AD FORMATS
          ============================================ */}
      <section className="section-padding bg-muted/30" id="formats">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Ad Formats</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Native placements designed to engage, not interrupt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {adFormats.map((format, index) => (
              <div key={index} className="card-base card-hover p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {format.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {format.description}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div>
                    <div className="text-xl font-bold text-foreground">{format.ctr}</div>
                    <div className="text-xs text-muted-foreground">Avg CTR</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{format.cpm}</div>
                    <div className="text-xs text-muted-foreground">Avg CPM</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          BENEFITS GRID
          ============================================ */}
      <section className="section-padding">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Why Advertisers Choose Gravity</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Target className="w-5 h-5" />}
              title="12% Avg CTR"
              description="10x higher than traditional display due to high-intent, contextual placements."
            />
            <BenefitCard
              icon={<DollarSign className="w-5 h-5" />}
              title="40% Lower CAC"
              description="Reach users when they're actively deciding, not passively browsing."
            />
            <BenefitCard
              icon={<Eye className="w-5 h-5" />}
              title="100% Viewability"
              description="Every impression is seen. No hidden placements or bot traffic."
            />
            <BenefitCard
              icon={<Shield className="w-5 h-5" />}
              title="Brand Safe"
              description="Premium inventory with strict quality controls and content guidelines."
            />
            <BenefitCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="Real-Time Reporting"
              description="Track performance across all metrics in our real-time dashboard."
            />
            <BenefitCard
              icon={<Zap className="w-5 h-5" />}
              title="Fast Launch"
              description="Go live within 24-48 hours with dedicated support."
            />
          </div>
        </div>
      </section>

      {/* ============================================
          ROI CALCULATOR
          ============================================ */}
      <section className="section-padding bg-muted/30" id="pricing">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-foreground mb-4">
                Estimate Your ROI
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                See what you could achieve with Gravity based on your budget and target vertical.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  Performance varies by vertical and targeting
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  No long-term commitments required
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  Flexible pricing models (CPM, CPC, CPA)
                </li>
              </ul>
      </div>
      
            <AdvertiserCalculator />
          </div>
        </div>
      </section>

      {/* ============================================
          INVENTORY PREVIEW
          ============================================ */}
      <section className="section-padding" id="inventory">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Premium Inventory</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access high-intent conversations across leading AI platforms.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Vertical</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Monthly Volume</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Avg CPM</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Intent Signal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { vertical: "Technology", volume: "12M+", cpm: "$18-25", intent: "Very High" },
                  { vertical: "E-commerce", volume: "18M+", cpm: "$15-22", intent: "High" },
                  { vertical: "Finance", volume: "8M+", cpm: "$22-30", intent: "Very High" },
                  { vertical: "Travel", volume: "6M+", cpm: "$14-20", intent: "High" },
                  { vertical: "Health & Wellness", volume: "9M+", cpm: "$16-24", intent: "High" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-medium text-foreground">{row.vertical}</td>
                    <td className="py-4 px-4 text-muted-foreground">{row.volume}</td>
                    <td className="py-4 px-4 text-muted-foreground">{row.cpm}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        row.intent === "Very High" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {row.intent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link to="/demo?type=advertiser" className="btn-secondary">
              Request Full Inventory Access
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIAL
          ============================================ */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <TestimonialCard
            variant="large"
            quote="We shifted 30% of our search budget to Gravity and saw our cost per acquisition drop by 45%. The users we reach are so much more qualified because they're actively researching and comparing when they see our ads."
            name="Michael Torres"
            title="Head of Performance Marketing"
            company="SaaS Company"
          />
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
          ============================================ */}
      <section className="section-padding" id="faq">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Everything you need to know about advertising with Gravity.
              </p>
              <Link to="/demo?type=advertiser" className="btn-primary">
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
        headline="Ready to reach users when intent is highest?"
        subheadline="Join the brands already winning customers in AI conversations."
        primaryCTA={{ text: "Get a Demo", href: "/demo?type=advertiser" }}
        secondaryCTA={{ text: "Browse Inventory", href: "#inventory" }}
      />
      
      <Footer />
    </div>
  );
};

export default Advertisers;
