import { useState } from "react";
import { Link } from "react-router-dom";

// Tab type
type TabType = "advertisers" | "publishers";

// Advertisers Tab Content
const AdvertisersContent = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left: Copy and Benefits */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-4">
          Meet your customers where they're at
        </h3>
        <p className="text-lg text-muted-foreground mb-8 font-body">
          Gravity puts ads where people are looking. Our system auto-determines the right audience based on real-time intent signals.
        </p>

        {/* Campaign Setup Steps */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Campaign Setup
          </h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3D3D3D] text-white flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-sm font-medium text-foreground">Answer questions</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3D3D3D] text-white flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-sm font-medium text-foreground">Set budget</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3D3D3D] text-white flex items-center justify-center text-sm font-bold">3</div>
              <span className="text-sm font-medium text-foreground">Launch</span>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Key Benefits
          </h4>
          {[
            "High-intent audience — users actively deciding",
            "Native placement — feels like a recommendation",
            "Real-time optimization — Gravity bids on your behalf for the best moments",
            "Performance dashboard — track every metric",
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3D3D3D]" />
              <span className="text-sm font-medium text-foreground">{benefit}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Right: Ad Preview Mockups */}
      <div className="-ml-4 lg:-ml-16">
        {/* Wrapper to measure actual content width */}
        <div className="inline-flex flex-col items-center">
          {/* Heading - Centered above both screens */}
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center mb-4 w-full">
            See exactly how your ads appear in conversations
          </h4>
          
          {/* Scaled mockups container */}
          <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-start">
            {/* Desktop Preview - Landscape laptop */}
          <div className="relative w-full lg:max-w-[750px]">
            <div className="rounded-xl bg-[#1a1a2e] p-2 shadow-2xl">
              {/* Screen bezel */}
              <div className="rounded-lg bg-white overflow-hidden" style={{ height: '320px', minWidth: '560px' }}>
                {/* Browser bar with camera dot */}
                <div className="flex items-center justify-center py-1.5 bg-gray-50 border-b border-gray-100 relative">
                  <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-800" />
                </div>
                
                <div className="flex h-[calc(100%-40px)]">
                  {/* Sidebar */}
                  <div className="w-16 bg-gray-50 border-r border-gray-100 p-1.5 space-y-1 flex-shrink-0">
                    <div className="h-1 w-8 bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-300 rounded" />
                    <div className="h-1 w-10 bg-gray-200 rounded" />
                    <div className="h-1 w-12 bg-gray-200 rounded" />
                    <div className="h-1 w-8 bg-gray-200 rounded" />
                  </div>
                  
                  {/* Chat area */}
                  <div className="flex-1 p-2 flex flex-col overflow-hidden">
                    {/* User message */}
                    <div className="flex justify-end mb-1.5">
                      <div className="bg-[#3A8BFF] text-white px-2.5 py-1.5 rounded-xl rounded-tr-sm">
                        <p className="text-[11px]">Where can I get a quick coffee on the go?</p>
                      </div>
                    </div>
                    
                    {/* AI Response */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-xl rounded-tl-sm max-w-[75%] overflow-hidden">
                        <div className="px-2.5 py-1.5">
                          <p className="text-[11px] text-gray-800 leading-tight">For a fast coffee fix, consider a drive-thru coffee shop with a mobile app for easy ordering.</p>
                        </div>
                        
                        {/* Sponsored section */}
                        <div className="border-t border-gray-200 px-2.5 py-1.5">
                          <p className="text-[7px] text-gray-400 uppercase tracking-wider mb-0.5">Sponsored</p>
                          <p className="text-[11px] font-semibold text-gray-900">Dutch Bros Coffee</p>
                          <p className="text-[10px] text-gray-600">Fuel up with Dutch Bros!</p>
                          <a className="text-[10px] text-[#3D3D3D] font-medium mt-0.5 inline-block">Learn more →</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1" />
                    
                    {/* Input bar */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex-1 h-6 bg-gray-100 rounded-lg border border-gray-200" />
                      <div className="w-6 h-6 bg-gray-200 rounded-lg" />
                    </div>
                  </div>
                </div>
                
                {/* Bottom bar */}
                <div className="flex justify-center py-1 bg-gray-50 border-t border-gray-100">
                  <div className="w-12 h-0.5 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>
            {/* Laptop base */}
            <div className="mx-auto w-[70%] h-3 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] rounded-b-xl" />
            <span className="block text-center mt-3 text-xs font-medium text-muted-foreground">Desktop</span>
          </div>

          {/* Mobile Preview - Smaller, phone shape */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-40 flex-shrink-0">
              <div className="rounded-[2rem] bg-[#1a1a2e] p-1.5 shadow-2xl">
                {/* Phone notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-10" />
                
                {/* Screen */}
                <div className="rounded-[1.5rem] bg-white overflow-hidden" style={{ height: '338px' }}>
                  <div className="pt-7 pb-3 px-2.5 flex flex-col h-full">
                    {/* User message */}
                    <div className="flex justify-end mb-1.5">
                      <div className="bg-[#3A8BFF] text-white px-2.5 py-1.5 rounded-xl rounded-tr-sm max-w-[85%]">
                        <p className="text-[10px]">Where can I get a quick coffee on the go?</p>
                      </div>
                    </div>
                    
                    {/* AI Response */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-xl rounded-tl-sm max-w-[90%] overflow-hidden">
                        <div className="px-2.5 py-1.5">
                          <p className="text-[10px] text-gray-800 leading-tight">For a fast coffee fix, consider a drive-thru coffee shop with a mobile app for easy ordering.</p>
                        </div>
                        
                        {/* Sponsored section */}
                        <div className="border-t border-gray-200 px-2.5 py-1.5">
                          <p className="text-[7px] text-gray-400 uppercase tracking-wider mb-0.5">Sponsored</p>
                          <p className="text-[10px] font-semibold text-gray-900">Dutch Bros Coffee</p>
                          <p className="text-[10px] text-gray-600">Fuel up with Dutch Bros!</p>
                          <a className="text-[10px] text-[#3D3D3D] font-medium mt-0.5 inline-block">Learn more →</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-h-6" />
                    
                    {/* Input bar */}
                    <div className="px-2.5 pb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-5 bg-gray-100 rounded-full" />
                        <div className="w-5 h-5 bg-gray-200 rounded-full" />
                      </div>
                    </div>
                    
                    {/* Home indicator */}
                    <div className="flex justify-center pb-0.5">
                      <div className="w-14 h-0.5 bg-black rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <span className="block text-center mt-3 text-xs font-medium text-muted-foreground">Mobile</span>
            </div>
          </div>
          </div>
          </div>
          
          {/* CTA Buttons - Centered below both screens */}
          <div className="flex items-center justify-center gap-4 mt-2 w-full">
            <Link 
              to="/advertisers"
              className="inline-flex items-center gap-2 text-[#3D3D3D] font-medium hover:underline"
            >
              Learn more
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a 
              href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors text-sm"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Publishers Tab Content
const PublishersContent = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left: Copy and Benefits */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-4">
          Monetize without breaking the experience
        </h3>
        <p className="text-lg text-muted-foreground mb-8 font-body">
          Integrate Gravity's SDK in minutes. Your users get helpful suggestions, you get a new revenue stream.
        </p>

        {/* SDK Integration Preview */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Quick Integration
          </h4>
          <div className="rounded-lg bg-[#1a1a1a] p-4 font-mono text-sm overflow-x-auto">
            <div className="text-gray-500">// App.tsx</div>
            <br />
            <br />
            <span className="text-[#3D3D3D]">import</span>
            <span className="text-white"> {"{ GravityProvider }"} </span>
            <span className="text-[#3D3D3D]">from</span>
            <span className="text-green-400"> '@iris-technologies/react'</span>
            <span className="text-white">;</span>
            <br />
            <br />
            <span className="text-[#3D3D3D]">function</span>
            <span className="text-white"> App() {"{"}</span>
            <br />
            <span className="text-[#3D3D3D]">  return</span>
            <span className="text-white"> (</span>
            <br />
            <span className="text-white">    {"<"}GravityProvider apiKey=</span>
            <span className="text-yellow-400">{"{process.env.NEXT_PUBLIC_GRAVITY_API_KEY}"}</span>
            <span className="text-white">{">"}</span>
            <br />
            <span className="text-gray-500">      {"{/* Your app with native AI ads */}"}</span>
            <br />
            <span className="text-white">    {"</GravityProvider>"}</span>
            <br />
            <span className="text-white">  );</span>
            <br />
            <span className="text-white">{"}"}</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            <a 
              href="https://react-sandbox.trygravity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#3D3D3D] font-medium hover:underline"
            >
              React SDK Playground →
            </a>
            <a 
              href="https://docs.trygravity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#3D3D3D] font-medium hover:underline"
            >
              API Documentation →
            </a>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Key Benefits
          </h4>
          {[
            "Non-intrusive monetization — users love it",
            "Full control over ad categories and placements",
            "Real-time analytics and reporting",
            "Easy SDK integration — live in minutes",
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3D3D3D]" />
              <span className="text-sm font-medium text-foreground">{benefit}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Right: Dashboard Preview - Dark theme */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 text-center">
          Your Earnings Dashboard
        </h4>
        <div className="rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50">Total Earnings (30 days)</p>
              <p className="text-2xl font-bold text-white">$128,473.20</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/50">vs last month</p>
              <p className="text-sm font-medium text-emerald-400">+23.4%</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-px bg-white/5">
            {[
              { label: "Impressions", value: "24M", change: "+12%" },
              { label: "Clicks", value: "482K", change: "+8%" },
              { label: "CPM", value: "$5.35", change: "+5%" },
            ].map((metric, i) => (
              <div key={i} className="bg-[#1a1a1a] p-4 text-center">
                <p className="text-xs text-white/50">{metric.label}</p>
                <p className="text-lg font-bold text-white">{metric.value}</p>
                <p className="text-xs text-emerald-400">{metric.change}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-px bg-white/5">
            {[
              { label: "CTR", value: "2.01%", change: "+0.3%" },
              { label: "CPC", value: "$0.27", change: "-2%" },
              { label: "Revenue", value: "$128K", change: "+23%" },
            ].map((metric, i) => (
              <div key={i} className="bg-[#1a1a1a] p-4 text-center">
                <p className="text-xs text-white/50">{metric.label}</p>
                <p className="text-lg font-bold text-white">{metric.value}</p>
                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{metric.change}</p>
              </div>
            ))}
          </div>

          {/* Mini Chart */}
          <div className="px-6 py-4 border-t border-white/10">
            <p className="text-xs text-white/50 mb-2">Revenue Trend</p>
            <svg className="w-full h-16" viewBox="0 0 300 60">
              <defs>
                <linearGradient id="chartGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3D3D3D" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3D3D3D" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d="M0,50 L20,45 L40,48 L60,40 L80,42 L100,35 L120,38 L140,30 L160,32 L180,25 L200,28 L220,20 L240,22 L260,15 L280,18 L300,10 L300,60 L0,60 Z"
                fill="url(#chartGradientDark)"
              />
              {/* Line */}
              <path
                d="M0,50 L20,45 L40,48 L60,40 L80,42 L100,35 L120,38 L140,30 L160,32 L180,25 L200,28 L220,20 L240,22 L260,15 L280,18 L300,10"
                fill="none"
                stroke="#3D3D3D"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        
        {/* CTA Buttons - Centered below dashboard */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link 
            to="/publishers"
            className="inline-flex items-center gap-2 text-[#3D3D3D] font-medium hover:underline"
          >
            Learn more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <a 
            href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors text-sm"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </div>
  );
};

// Main Component
export const DualAudienceSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("advertisers");

  return (
    <section className="py-12 sm:py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground">
            The Gravity Network
          </h2>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-muted p-1">
            <button
              onClick={() => setActiveTab("advertisers")}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${activeTab === "advertisers" 
                  ? "bg-white text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              For Advertisers
            </button>
            <button
              onClick={() => setActiveTab("publishers")}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${activeTab === "publishers" 
                  ? "bg-[#1a1a1a] text-white shadow-sm" 
                  : "text-foreground hover:bg-white/50 border border-foreground/30"
                }
              `}
            >
              For Publishers
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          <div 
            className={`transition-all duration-300 ${activeTab === "advertisers" ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}
          >
            {activeTab === "advertisers" && <AdvertisersContent />}
          </div>
          <div 
            className={`transition-all duration-300 ${activeTab === "publishers" ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}
          >
            {activeTab === "publishers" && <PublishersContent />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualAudienceSection;

