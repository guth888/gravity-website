import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

const MeshAnimation = lazy(() => import("@/components/MeshAnimation").then(m => ({ default: m.MeshAnimation })));

// Live inventory counter
const LiveInventoryCounter = () => {
  const [value, setValue] = useState(52400000);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => v + Math.floor(Math.random() * 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono tabular-nums text-[#3A8BFF]">
      {value.toLocaleString()}
    </span>
  );
};

// Inventory browser component
const InventoryBrowser = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Inventory" },
    { id: "tech", name: "Technology" },
    { id: "finance", name: "Finance" },
    { id: "travel", name: "Travel" },
    { id: "retail", name: "Retail" },
    { id: "health", name: "Health" },
  ];

  const inventory = [
    { category: "tech", segment: "SaaS Comparison", volume: "8.2M/mo", cpm: "$42", intent: "Purchase" },
    { category: "tech", segment: "Developer Tools", volume: "5.1M/mo", cpm: "$38", intent: "Evaluation" },
    { category: "tech", segment: "Cloud Services", volume: "3.8M/mo", cpm: "$52", intent: "Migration" },
    { category: "finance", segment: "Investment Advice", volume: "12.4M/mo", cpm: "$85", intent: "Decision" },
    { category: "finance", segment: "Banking Products", volume: "6.8M/mo", cpm: "$68", intent: "Comparison" },
    { category: "finance", segment: "Insurance Quotes", volume: "4.2M/mo", cpm: "$92", intent: "Purchase" },
    { category: "travel", segment: "Destination Planning", volume: "9.1M/mo", cpm: "$45", intent: "Research" },
    { category: "travel", segment: "Hotel Comparison", volume: "5.6M/mo", cpm: "$52", intent: "Booking" },
    { category: "retail", segment: "Product Reviews", volume: "15.2M/mo", cpm: "$28", intent: "Purchase" },
    { category: "retail", segment: "Price Comparison", volume: "8.4M/mo", cpm: "$32", intent: "Decision" },
    { category: "health", segment: "Wellness Products", volume: "4.8M/mo", cpm: "$52", intent: "Research" },
    { category: "health", segment: "Fitness Equipment", volume: "3.2M/mo", cpm: "$42", intent: "Purchase" },
  ];

  const filteredInventory = activeCategory === "all" 
    ? inventory 
    : inventory.filter(i => i.category === activeCategory);

  return (
    <div className="rounded-2xl bg-white border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Category tabs */}
      <div className="flex overflow-x-auto border-b border-black/5 bg-black/[0.01]">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              px-5 py-4 text-sm font-medium whitespace-nowrap transition-all
              ${activeCategory === cat.id 
                ? 'text-[#3A8BFF] border-b-2 border-[#3A8BFF] bg-white' 
                : 'text-black/40 hover:text-black/60'
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Inventory table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/5">
              <th className="text-left py-3 px-5 text-xs text-black/40 font-medium uppercase tracking-wider">Segment</th>
              <th className="text-right py-3 px-5 text-xs text-black/40 font-medium uppercase tracking-wider">Monthly Volume</th>
              <th className="text-right py-3 px-5 text-xs text-black/40 font-medium uppercase tracking-wider">Avg CPM</th>
              <th className="text-right py-3 px-5 text-xs text-black/40 font-medium uppercase tracking-wider">Intent Signal</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((row, i) => (
              <tr key={i} className="border-b border-black/5 hover:bg-black/[0.01] transition-colors">
                <td className="py-4 px-5">
                  <div className="text-sm font-medium text-black">{row.segment}</div>
                </td>
                <td className="py-4 px-5 text-sm text-right font-mono text-black/60">{row.volume}</td>
                <td className="py-4 px-5 text-sm text-right font-mono text-[#3A8BFF] font-medium">{row.cpm}</td>
                <td className="py-4 px-5 text-right">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-600 font-medium">
                    {row.intent}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 bg-black/[0.01] border-t border-black/5 flex items-center justify-between">
        <span className="text-sm text-black/40">
          Showing {filteredInventory.length} of {inventory.length} segments
        </span>
        <Link to="/demo?type=advertiser" className="text-sm text-[#3A8BFF] hover:text-[#2563eb] font-medium">
          Request full inventory access →
        </Link>
      </div>
    </div>
  );
};

// Performance benchmark table
const PerformanceBenchmarks = () => {
  const data = [
    { channel: "Gravity", ctr: "12.4%", cvr: "8.2%", cpa: "$24", highlight: true },
    { channel: "Paid Search", ctr: "3.2%", cvr: "4.1%", cpa: "$48", highlight: false },
    { channel: "Display Ads", ctr: "0.4%", cvr: "0.8%", cpa: "$120", highlight: false },
    { channel: "Social Ads", ctr: "1.2%", cvr: "2.4%", cpa: "$65", highlight: false },
    { channel: "Native Ads", ctr: "0.8%", cvr: "1.6%", cpa: "$85", highlight: false },
  ];

  return (
    <div className="rounded-2xl bg-white border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/5">
        <h3 className="font-semibold text-black">Performance Benchmarks</h3>
        <p className="text-sm text-black/40 mt-1">Gravity vs. traditional channels (Q4 2024 averages)</p>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-black/5 bg-black/[0.01]">
            <th className="text-left py-3 px-6 text-xs text-black/40 font-medium uppercase tracking-wider">Channel</th>
            <th className="text-right py-3 px-6 text-xs text-black/40 font-medium uppercase tracking-wider">CTR</th>
            <th className="text-right py-3 px-6 text-xs text-black/40 font-medium uppercase tracking-wider">CVR</th>
            <th className="text-right py-3 px-6 text-xs text-black/40 font-medium uppercase tracking-wider">Avg CPA</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr 
              key={i} 
              className={`
                border-b border-black/5 transition-colors
                ${row.highlight ? 'bg-[#3A8BFF]/5' : 'hover:bg-black/[0.01]'}
              `}
            >
              <td className="py-4 px-6">
                <div className={`text-sm font-medium ${row.highlight ? 'text-[#3A8BFF]' : 'text-black'}`}>
                  {row.channel}
                  {row.highlight && <span className="ml-2 text-xs text-[#3A8BFF]/60">← You are here</span>}
                </div>
              </td>
              <td className={`py-4 px-6 text-sm text-right font-mono ${row.highlight ? 'text-[#3A8BFF] font-bold' : 'text-black/60'}`}>
                {row.ctr}
              </td>
              <td className={`py-4 px-6 text-sm text-right font-mono ${row.highlight ? 'text-[#3A8BFF] font-bold' : 'text-black/60'}`}>
                {row.cvr}
              </td>
              <td className={`py-4 px-6 text-sm text-right font-mono ${row.highlight ? 'text-green-600 font-bold' : 'text-black/60'}`}>
                {row.cpa}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Intent signal visualization
const IntentSignals = () => {
  const signals = [
    { signal: "Comparison Query", example: '"Best X vs Y"', strength: 95 },
    { signal: "Purchase Intent", example: '"Where to buy..."', strength: 92 },
    { signal: "Feature Research", example: '"Does X have..."', strength: 78 },
    { signal: "Price Sensitivity", example: '"How much does..."', strength: 85 },
    { signal: "Timeline Urgency", example: '"Need by Friday"', strength: 98 },
  ];

  return (
    <div className="space-y-4">
      {signals.map((item, i) => (
        <div key={i} className="group">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-black">{item.signal}</span>
              <span className="text-xs text-black/40 ml-2">{item.example}</span>
            </div>
            <span className="text-sm font-mono text-[#3A8BFF]">{item.strength}%</span>
          </div>
          <div className="h-2 bg-black/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${item.strength}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Ad format preview cards
const AdFormatPreview = ({ 
  title, 
  description, 
  preview 
}: { 
  title: string; 
  description: string; 
  preview: React.ReactNode;
}) => {
  return (
    <div className="rounded-2xl bg-white border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="p-6 border-b border-black/5">
        <h3 className="font-semibold text-black mb-1">{title}</h3>
        <p className="text-sm text-black/50">{description}</p>
      </div>
      <div className="p-6 bg-black/[0.02]">
        {preview}
      </div>
    </div>
  );
};

export const Advertisers = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-white">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-30">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        {/* Floating elements */}
        <div className="absolute top-40 right-[15%] w-64 h-64 bg-[#3A8BFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-[#3A8BFF]/3 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Live inventory badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-black/60 uppercase tracking-wider">Available Now</span>
            <span className="text-xs font-mono text-black/40">|</span>
            <span className="text-xs">
              <LiveInventoryCounter /> conversations/mo
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-[1.1] mb-6">
            Access the highest-intent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]">
              inventory in AI.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto mb-10">
            50M+ monthly conversations where users are actively asking, comparing, and deciding. 
            Reach them at the exact moment of intent—not before, not after.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo?type=advertiser" className="metallic-button">
              <span>Access Inventory</span>
            </Link>
            <Link 
              to="/demo?type=advertiser"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-black/70 hover:text-black border border-black/10 rounded-full transition-colors"
            >
              See Pricing
            </Link>
          </div>

          {/* Key stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mt-16 pt-16 border-t border-black/10">
            {[
              { value: "12.4%", label: "Average CTR" },
              { value: "8.2%", label: "Conversion Rate" },
              { value: "$24", label: "Average CPA" },
              { value: "100%", label: "Viewability" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-black font-mono">{stat.value}</div>
                <div className="text-sm text-black/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory Browser */}
      <section className="relative py-24 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Browse available inventory.
            </h2>
            <p className="text-black/50 max-w-2xl mx-auto">
              Explore our conversation inventory by vertical. Real-time volumes and pricing, 
              updated continuously based on network data.
            </p>
          </div>

          <InventoryBrowser />
        </div>
      </section>

      {/* Intent Signals + Performance */}
      <section className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Intent Signals */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                Target by intent, not demographics.
              </h2>
              <p className="text-black/50 mb-8">
                Forget cookies and proxies. We analyze real-time conversation context to identify 
                users with genuine purchase intent.
              </p>
              
              <div className="rounded-2xl bg-white border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-6">
                <h3 className="text-sm font-medium text-black/40 uppercase tracking-wider mb-6">
                  Intent Signals We Capture
                </h3>
                <IntentSignals />
              </div>
            </div>

            {/* Right - Performance Benchmarks */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                Performance that speaks for itself.
              </h2>
              <p className="text-black/50 mb-8">
                Gravity consistently outperforms traditional channels on every metric that matters.
              </p>
              
              <PerformanceBenchmarks />
            </div>
          </div>
        </div>
      </section>

      {/* Ad Formats */}
      <section className="relative py-24 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Native formats that convert.
            </h2>
            <p className="text-black/50 max-w-2xl mx-auto">
              Ad formats designed specifically for conversational AI. They feel like recommendations, not interruptions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AdFormatPreview
              title="Sponsored Suggestion"
              description="Your product appears as a helpful recommendation within the conversation."
              preview={
                <div className="bg-gradient-to-r from-[#3A8BFF]/10 to-transparent border border-[#3A8BFF]/20 rounded-xl px-4 py-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-black/80 text-sm">
                        <strong className="text-black">Acme CRM</strong> might be perfect for your needs—it has 
                        native Slack integration and is built for teams under 50 people.
                      </p>
                      <span className="text-[10px] text-black/30 mt-1 block">Sponsored</span>
                    </div>
                  </div>
                </div>
              }
            />

            <AdFormatPreview
              title="Contextual Comparison"
              description="Join comparison conversations with relevant, timely positioning."
              preview={
                <div className="space-y-2">
                  <div className="bg-black/[0.03] rounded-lg px-3 py-2 text-sm text-black/60">
                    <strong>Notion</strong> - Great for docs, lighter on PM features
                  </div>
                  <div className="bg-black/[0.03] rounded-lg px-3 py-2 text-sm text-black/60">
                    <strong>Asana</strong> - More complex, steeper learning curve
                  </div>
                  <div className="bg-gradient-to-r from-[#3A8BFF]/10 to-transparent border border-[#3A8BFF]/20 rounded-lg px-3 py-2 text-sm">
                    <strong className="text-[#3A8BFF]">Linear</strong> - Built for speed, loved by engineering teams
                    <span className="text-[10px] text-black/30 ml-2">Sponsored</span>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              From brief to live in 48 hours.
            </h2>
            <p className="text-black/50 max-w-xl mx-auto">
              We handle campaign setup, creative generation, and optimization. You focus on results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Share your goals",
                description: "Tell us what you're promoting, who you want to reach, and your target KPIs."
              },
              {
                number: "02", 
                title: "We build it",
                description: "Our AI generates native ad copy, selects optimal inventory, and sets up targeting."
              },
              {
                number: "03",
                title: "Launch & optimize",
                description: "Go live in premium conversations. Our AI continuously optimizes for your goals."
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-[#3A8BFF]/20 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-black mb-2">{step.title}</h3>
                <p className="text-sm text-black/50">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative py-24 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl bg-white border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-8 sm:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                  Transparent pricing.
                </h2>
                <p className="text-black/50 mb-6">
                  Auction-based CPM with no hidden fees. You set the floor, demand competes.
                </p>
                <ul className="space-y-3">
                  {[
                    "CPM, CPC, or CPA models available",
                    "No minimum spend requirements",
                    "Real-time bidding via OpenRTB 2.6",
                    "Full attribution and reporting"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-black/70 text-sm">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black/[0.02] rounded-xl p-6">
                <div className="text-sm text-black/40 uppercase tracking-wider mb-4">Typical CPM Ranges</div>
                <div className="space-y-3">
                  {[
                    { vertical: "Finance", range: "$65 - $95" },
                    { vertical: "Technology", range: "$35 - $55" },
                    { vertical: "Travel", range: "$40 - $60" },
                    { vertical: "Retail", range: "$25 - $40" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0">
                      <span className="text-sm text-black/70">{item.vertical}</span>
                      <span className="text-sm font-mono text-[#3A8BFF] font-medium">{item.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden bg-white">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-30">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-black leading-tight mb-6">
            Ready to access premium AI inventory?
          </h2>
          <p className="text-lg text-black/50 mb-10 max-w-xl mx-auto">
            See exactly what's available for your brand. Get inventory preview, 
            performance projections, and pricing—no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo?type=advertiser" className="metallic-button">
              <span>Get Inventory Preview</span>
            </Link>
            <Link 
              to="/demo?type=advertiser"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-black/70 hover:text-black transition-colors"
            >
              Schedule a Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
