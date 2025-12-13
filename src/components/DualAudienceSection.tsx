import { useState } from "react";
import { Link } from "react-router-dom";

// Tab type
type TabType = "advertisers" | "publishers";

// Advertisers Tab Content
const AdvertisersContent = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
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
              <span className="text-sm font-medium text-foreground">Define campaign</span>
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
            "High-intent audience: users actively deciding",
            "Native placement: feels like a recommendation",
            "Real-time optimization: Gravity bids on your behalf for the best moments",
            "Performance dashboard: track every metric",
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3D3D3D]" />
              <span className="text-sm font-medium text-foreground">{benefit}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Right: Ad Preview Mockups */}
      <div className="flex flex-col h-full ml-8">
        {/* Wrapper with flex to distribute space */}
        <div className="flex flex-col h-full">
          {/* Heading - Aligned with "Meet your customers" */}
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center w-full">
            See exactly how your ads appear in conversations
          </h4>
          
          {/* Mockups container - Centered between heading and CTAs */}
          <div className="flex-1 flex items-center justify-center py-8">
          <div style={{ transform: 'scale(0.85)', transformOrigin: 'center center' }}>
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
          </div>
          
          {/* CTA Buttons - Aligned with last key benefit */}
          <div className="flex items-center justify-center gap-4 w-full">
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
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
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
            <span className="text-blue-500"> '@gravity-ai/react'</span>
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
            "Non-intrusive monetization: users love it",
            "Full control over ad categories and placements",
            "Real-time analytics and reporting",
            "Easy SDK integration: live in minutes",
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3D3D3D]" />
              <span className="text-sm font-medium text-foreground">{benefit}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Right: Dashboard */}
      <div className="flex flex-col h-full">
        {/* Dashboard Preview */}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 text-center">
            Your Earnings Dashboard
          </h4>
          <div className="rounded-2xl bg-[#111111] border border-white/10 shadow-2xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-5 py-4">
            <h3 className="text-lg font-bold text-white mb-0.5">Hi Myles</h3>
            <p className="text-xs text-gray-400">View your daily performance metrics and track your earnings</p>
          </div>

          {/* Earnings Cards Row */}
          <div className="px-5 pb-4">
            <h4 className="text-xs font-semibold text-white mb-2">Earnings</h4>
            <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-5 divide-x divide-white/10">
                {[
                  { label: "Today", value: "$84,731" },
                  { label: "Yesterday", value: "$102,847" },
                  { label: "Last 7 days", value: "$718,439" },
                  { label: "This month", value: "$3,104,582" },
                  { label: "Last 28 days", value: "$2,887,219" },
                ].map((card, i) => (
                  <div key={i} className="p-3">
                    <p className="text-[10px] text-gray-400 mb-0.5">{card.label}</p>
                    <p className="text-sm font-bold text-white">{card.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mx-5" />

          {/* Performance Overview */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-white">Performance Overview</h4>
              <div className="flex items-center gap-2">
                <div className="flex bg-[#1a1a1a] rounded-full border border-white/10 p-0.5">
                  <button className="px-3 py-1 rounded-full text-[10px] font-medium bg-blue-500 text-white">Chart</button>
                  <button className="px-3 py-1 rounded-full text-[10px] font-medium text-gray-400">Table</button>
                </div>
                <div className="px-2 py-1 border border-white/10 rounded-md text-[10px] text-gray-300 bg-[#1a1a1a]">
                  Last 28 days
                </div>
              </div>
            </div>
            
            {/* Metrics Row */}
            <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5">
                <div className="grid grid-cols-6 gap-3">
                  {[
                    { label: "REVENUE", value: "$2,887,219", active: true },
                    { label: "IMPRESSIONS", value: "444.7M", active: false },
                    { label: "CLICKS", value: "9.34M", active: false },
                    { label: "CPM", value: "$6.49", active: false },
                    { label: "CTR", value: "2.1%", active: false },
                    { label: "CPC", value: "$0.31", active: false },
                  ].map((metric, i) => (
                    <div key={i} className={`${metric.active ? "border-b-2 border-blue-500 pb-1" : "pb-1"}`}>
                      <p className="text-[8px] text-gray-500 uppercase tracking-wider mb-0.5">{metric.label}</p>
                      <p className="text-sm font-bold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chart */}
              <div className="p-4 h-[380px]">
                <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  <line x1="35" y1="30" x2="390" y2="30" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="35" y1="80" x2="390" y2="80" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="35" y1="130" x2="390" y2="130" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="35" y1="180" x2="390" y2="180" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="35" y1="230" x2="390" y2="230" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="35" y1="250" x2="390" y2="250" stroke="#374151" strokeWidth="0.5" />
                  
                  {/* Y-axis labels */}
                  <text x="5" y="35" fontSize="10" fill="#6b7280">$120K</text>
                  <text x="5" y="85" fontSize="10" fill="#6b7280">$90K</text>
                  <text x="5" y="135" fontSize="10" fill="#6b7280">$60K</text>
                  <text x="5" y="185" fontSize="10" fill="#6b7280">$30K</text>
                  <text x="5" y="255" fontSize="10" fill="#6b7280">$0</text>
                  
                  {/* X-axis labels */}
                  <text x="50" y="270" fontSize="10" fill="#6b7280">Nov 6</text>
                  <text x="130" y="270" fontSize="10" fill="#6b7280">Nov 14</text>
                  <text x="210" y="270" fontSize="10" fill="#6b7280">Nov 22</text>
                  <text x="290" y="270" fontSize="10" fill="#6b7280">Nov 30</text>
                  <text x="360" y="270" fontSize="10" fill="#6b7280">Dec 4</text>
                  
                  {/* Gradient */}
                  <defs>
                    <linearGradient id="chartGradientNetwork" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill - chart data scaled to fill more vertical space */}
                  <polygon
                    fill="url(#chartGradientNetwork)"
                    points="45,150 85,130 125,170 165,100 205,140 245,80 285,110 325,60 365,90 385,40 385,250 45,250"
                  />
                  
                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="45,150 85,130 125,170 165,100 205,140 245,80 285,110 325,60 365,90 385,40"
                  />
                  
                  {/* Data points */}
                  <circle cx="45" cy="150" r="4" fill="#3b82f6" />
                  <circle cx="165" cy="100" r="4" fill="#3b82f6" />
                  <circle cx="285" cy="110" r="4" fill="#3b82f6" />
                  <circle cx="385" cy="40" r="5" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
                </svg>
              </div>
            </div>
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
    </div>
  );
};

// Main Component
export const DualAudienceSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("advertisers");

  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gray-50/50">
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
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50"
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
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50"
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

