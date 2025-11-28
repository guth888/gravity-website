import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

// Lazy load mesh animation
const MeshAnimation = lazy(() => import("../components/MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

// Live counter that continuously increments
const LiveCounter = ({ baseValue, incrementPerSecond }: { baseValue: number; incrementPerSecond: number }) => {
  const [value, setValue] = useState(baseValue);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => v + Math.floor(Math.random() * incrementPerSecond * 2));
    }, 1000);
    return () => clearInterval(interval);
  }, [incrementPerSecond]);

  return (
    <span className="font-mono tabular-nums">
      {value.toLocaleString()}
    </span>
  );
};

// Simulated live suggestion feed
const LiveSuggestionFeed = () => {
  const suggestions = [
    { query: "Best CRM for startups?", suggestion: "HubSpot", vertical: "SaaS", rpm: "$42" },
    { query: "Compare running shoes", suggestion: "Nike Pegasus 40", vertical: "Retail", rpm: "$28" },
    { query: "Project management tools", suggestion: "Linear", vertical: "SaaS", rpm: "$38" },
    { query: "Best travel credit card?", suggestion: "Chase Sapphire", vertical: "Finance", rpm: "$85" },
    { query: "CRM with Slack integration", suggestion: "Pipedrive", vertical: "SaaS", rpm: "$45" },
    { query: "Productivity apps 2024", suggestion: "Notion", vertical: "SaaS", rpm: "$32" },
    { query: "Best mattress for back pain", suggestion: "Purple Mattress", vertical: "DTC", rpm: "$52" },
    { query: "Cloud hosting comparison", suggestion: "Vercel", vertical: "Tech", rpm: "$38" },
  ];

  const [feed, setFeed] = useState(suggestions.slice(0, 4));
  const [fadeIndex, setFadeIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIndex(0);
      setTimeout(() => {
        setFeed(prev => {
          const newItem = suggestions[Math.floor(Math.random() * suggestions.length)];
          return [newItem, ...prev.slice(0, 3)];
        });
        setFadeIndex(-1);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      {feed.map((item, i) => (
        <div 
          key={i}
          className={`
            flex items-center gap-4 p-3 rounded-lg bg-white/[0.03] border border-white/5
            transition-all duration-300
            ${i === fadeIndex ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}
            ${i === 0 && fadeIndex === -1 ? 'border-[#3A8BFF]/30 bg-[#3A8BFF]/5' : ''}
          `}
        >
          <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`} />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-white/40 truncate">"{item.query}"</div>
            <div className="text-sm text-white/80 truncate">→ {item.suggestion}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/30">{item.vertical}</div>
            <div className="text-sm font-mono text-[#3A8BFF]">{item.rpm}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Network visualization component
const NetworkVisualization = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px]">
      <svg className="w-full h-full" viewBox="0 0 800 400">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3A8BFF" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#3A8BFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3A8BFF" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Demand side (left) */}
        <g className="demand-nodes">
          {[
            { y: 80, label: "DSP 1" },
            { y: 160, label: "DSP 2" },
            { y: 240, label: "Direct" },
            { y: 320, label: "Agency" },
          ].map((node, i) => (
            <g key={i}>
              {/* Connection line to center */}
              <line 
                x1="120" y1={node.y} x2="380" y2="200" 
                stroke="url(#lineGradient)" 
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              {/* Data packet animation */}
              <circle r="4" fill="#3A8BFF" filter="url(#glow)">
                <animateMotion 
                  dur={`${2 + i * 0.3}s`} 
                  repeatCount="indefinite"
                  path={`M120,${node.y} L380,200`}
                />
              </circle>
              {/* Node */}
              <rect x="40" y={node.y - 15} width="80" height="30" rx="4" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
              <text x="80" y={node.y + 4} textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="11" fontFamily="monospace">{node.label}</text>
            </g>
          ))}
        </g>

        {/* Center - Gravity */}
        <g className="gravity-core">
          <circle cx="400" cy="200" r="60" fill="#3A8BFF" fillOpacity="0.1" stroke="#3A8BFF" strokeOpacity="0.3" strokeWidth="2" />
          <circle cx="400" cy="200" r="45" fill="#3A8BFF" fillOpacity="0.2" stroke="#3A8BFF" strokeOpacity="0.5" strokeWidth="2">
            <animate attributeName="r" values="45;50;45" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="200" r="8" fill="#3A8BFF" filter="url(#glow)" />
          <text x="400" y="280" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">GRAVITY</text>
          <text x="400" y="298" textAnchor="middle" fill="white" fillOpacity="0.4" fontSize="10">NETWORK</text>
        </g>

        {/* Supply side (right) - Publishers */}
        <g className="supply-nodes">
          {[
            { y: 100, label: "Your App" },
            { y: 200, label: "AI Chat" },
            { y: 300, label: "Agent" },
          ].map((node, i) => (
            <g key={i}>
              {/* Connection line from center */}
              <line 
                x1="420" y1="200" x2="680" y2={node.y} 
                stroke="url(#lineGradient)" 
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              {/* Data packet animation */}
              <circle r="4" fill="#10b981" filter="url(#glow)">
                <animateMotion 
                  dur={`${1.5 + i * 0.2}s`} 
                  repeatCount="indefinite"
                  path={`M420,200 L680,${node.y}`}
                />
              </circle>
              {/* Node */}
              <rect x="680" y={node.y - 15} width="80" height="30" rx="4" fill="white" fillOpacity="0.05" stroke="#10b981" strokeOpacity="0.3" />
              <text x="720" y={node.y + 4} textAnchor="middle" fill="white" fillOpacity="0.7" fontSize="11" fontFamily="monospace">{node.label}</text>
            </g>
          ))}
        </g>

        {/* Labels */}
        <text x="80" y="30" textAnchor="middle" fill="white" fillOpacity="0.3" fontSize="10" fontWeight="500" letterSpacing="0.1em">DEMAND</text>
        <text x="720" y="30" textAnchor="middle" fill="white" fillOpacity="0.3" fontSize="10" fontWeight="500" letterSpacing="0.1em">SUPPLY</text>
      </svg>
    </div>
  );
};

// Revenue estimator component
const RevenueEstimator = () => {
  const [conversations, setConversations] = useState(100000);
  const [vertical, setVertical] = useState("tech");

  const rpms: Record<string, number> = {
    tech: 32,
    finance: 85,
    travel: 45,
    retail: 28,
    health: 52,
    education: 22,
  };

  const estimatedRevenue = Math.round((conversations / 1000) * rpms[vertical]);

  return (
    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
      <div className="text-sm text-white/40 uppercase tracking-wider mb-6">Revenue Estimator</div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-white/60 mb-2">Monthly Conversations</label>
          <input 
            type="range" 
            min="10000" 
            max="10000000" 
            step="10000"
            value={conversations}
            onChange={(e) => setConversations(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3A8BFF]"
          />
          <div className="text-2xl font-mono text-white mt-2">{conversations.toLocaleString()}</div>
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Primary Vertical</label>
          <select 
            value={vertical}
            onChange={(e) => setVertical(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3A8BFF]/50"
          >
            <option value="tech">Technology & SaaS</option>
            <option value="finance">Finance & Insurance</option>
            <option value="travel">Travel & Hospitality</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="health">Health & Wellness</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="text-sm text-white/40 mb-1">Estimated Monthly Revenue</div>
          <div className="text-4xl font-bold text-[#3A8BFF]">${estimatedRevenue.toLocaleString()}</div>
          <div className="text-sm text-white/40 mt-1">
            Based on ${rpms[vertical]} avg RPM for {vertical.charAt(0).toUpperCase() + vertical.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

// RPM by vertical table
const RPMTable = () => {
  const data = [
    { vertical: "Finance & Insurance", rpm: "$85", fill: "92%", trend: "+12%" },
    { vertical: "Technology & SaaS", rpm: "$42", fill: "95%", trend: "+8%" },
    { vertical: "Travel & Hospitality", rpm: "$45", fill: "88%", trend: "+15%" },
    { vertical: "Health & Wellness", rpm: "$52", fill: "85%", trend: "+6%" },
    { vertical: "Retail & E-commerce", rpm: "$28", fill: "97%", trend: "+4%" },
    { vertical: "Education", rpm: "$22", fill: "82%", trend: "+18%" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-xs text-white/40 font-medium uppercase tracking-wider">Vertical</th>
            <th className="text-right py-3 px-4 text-xs text-white/40 font-medium uppercase tracking-wider">Avg RPM</th>
            <th className="text-right py-3 px-4 text-xs text-white/40 font-medium uppercase tracking-wider">Fill Rate</th>
            <th className="text-right py-3 px-4 text-xs text-white/40 font-medium uppercase tracking-wider">30d Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 text-sm text-white/80">{row.vertical}</td>
              <td className="py-3 px-4 text-sm text-right font-mono text-[#3A8BFF]">{row.rpm}</td>
              <td className="py-3 px-4 text-sm text-right font-mono text-white/60">{row.fill}</td>
              <td className="py-3 px-4 text-sm text-right font-mono text-green-500">{row.trend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Demand partners
const demandPartners = [
  "The Trade Desk", "DV360", "Amazon DSP", "Xandr", "MediaMath", 
  "Verizon Media", "Adobe Advertising", "Criteo", "RTB House"
];

export const Publishers = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-20">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Copy */}
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Network Live</span>
                <span className="text-xs font-mono text-white/40">|</span>
                <span className="text-xs font-mono text-[#3A8BFF]">
                  <LiveCounter baseValue={12847293} incrementPerSecond={47} /> suggestions served
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
                Your AI conversations.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]">
                  Our demand.
                </span>
              </h1>

              <p className="text-lg text-white/50 max-w-xl mb-8">
                Connect to the Gravity network and start monetizing high-intent conversations 
                with native suggestions from premium advertisers. No banners. No pop-ups. 
                Just revenue that flows.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/demo?type=publisher" className="metallic-button">
                  <span>Join the Network</span>
                </Link>
                <a 
                  href="https://www.npmjs.com/package/@iris-technologies/react" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/10 rounded-full transition-colors"
                >
                  View SDK Docs
                </a>
              </div>
            </div>

            {/* Right - Live Feed */}
            <div className="lg:pl-8">
              <div className="text-xs text-white/30 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Suggestion Feed
              </div>
              <LiveSuggestionFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Network Visualization */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              You're not buying software.
              <span className="text-white/30"> You're joining infrastructure.</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Gravity connects your LLM product to premium demand sources—DSPs, direct advertisers, 
              and agency trading desks—all competing for your inventory in real-time.
            </p>
          </div>

          <NetworkVisualization />

          {/* Stats under network */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: "50+", label: "Demand Partners" },
              { value: "12.4%", label: "Avg CTR" },
              { value: "95%", label: "Fill Rate" },
              { value: "<50ms", label: "Latency" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economics Section */}
      <section className="relative py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Revenue Estimator */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                See what you're leaving on the table.
              </h2>
              <p className="text-white/50 mb-8">
                Publishers on the Gravity network see 3-5x higher RPMs than traditional display. 
                Estimate your potential revenue below.
              </p>
              <RevenueEstimator />
            </div>

            {/* Right - RPM Table */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                RPM by Vertical
              </h3>
              <p className="text-white/50 mb-6 text-sm">
                Average revenue per thousand suggestions, updated in real-time based on network data.
              </p>
              <div className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
                <RPMTable />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Users See */}
      <section className="relative py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What your users actually see.
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Native suggestions that feel like the LLM's own recommendations. 
              No jarring ads. No trust erosion.
            </p>
          </div>

          {/* Chat mockup */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              {/* Chat header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-sm text-white/40 ml-2">AI Assistant</span>
              </div>
              
              {/* Chat content */}
              <div className="p-6 space-y-6">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-[#3A8BFF] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white text-sm">What's the best project management tool for a remote team?</p>
                  </div>
                </div>

                {/* AI response */}
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
                    <p className="text-white/80 text-sm leading-relaxed">
                      For remote teams, I'd recommend looking at tools that excel in async communication and 
                      visibility. Here are some top options:
                    </p>
                    <ul className="mt-3 space-y-2 text-white/70 text-sm">
                      <li>• <strong>Notion</strong> - Best for docs + light PM</li>
                      <li>• <strong>Asana</strong> - Best for complex workflows</li>
                      <li>• <strong>Monday.com</strong> - Best for visual planning</li>
                    </ul>
                  </div>

                  {/* Native suggestion - highlighted */}
                  <div className="bg-gradient-to-r from-[#3A8BFF]/10 to-transparent border border-[#3A8BFF]/20 rounded-xl px-4 py-3 max-w-[90%]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">Li</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/80 text-sm">
                          <strong className="text-white">Linear</strong> is worth checking out too—it's built 
                          specifically for fast-moving teams and has excellent async features.
                        </p>
                        <span className="text-[10px] text-white/30 mt-1 block">Sponsored</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-white/30 text-sm mt-4">
              ↑ The highlighted suggestion is a Gravity placement. Native. Contextual. Non-intrusive.
            </p>
          </div>
        </div>
      </section>

      {/* Demand Partners */}
      <section className="relative py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Connected to premium demand.
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Your inventory is exposed to 50+ demand partners competing in real-time auctions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {demandPartners.map((partner, i) => (
              <div 
                key={i}
                className="px-5 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white/50 text-sm"
              >
                {partner}
              </div>
            ))}
            <div className="px-5 py-3 rounded-lg bg-[#3A8BFF]/10 border border-[#3A8BFF]/20 text-[#3A8BFF] text-sm">
              +40 more
            </div>
          </div>
        </div>
      </section>

      {/* Integration - Minimal */}
      <section className="relative py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Integration? Three lines.
          </h2>
          <p className="text-white/50 mb-8">
            We handle the complexity. You just render suggestions.
          </p>

          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-6 text-left font-mono text-sm overflow-x-auto">
            <div className="text-white/40">// 1. Install</div>
            <div className="text-[#3A8BFF] mb-4">npm install @iris-technologies/react</div>
            
            <div className="text-white/40">// 2. Wrap your app</div>
            <div className="text-white/80 mb-4">
              <span className="text-purple-400">{"<GravityProvider"}</span>
              <span className="text-[#3A8BFF]"> publisherId</span>
              <span className="text-white/60">="your-id"</span>
              <span className="text-purple-400">{">"}</span>
            </div>

            <div className="text-white/40">// 3. Render suggestions</div>
            <div className="text-white/80">
              <span className="text-purple-400">{"<GravitySuggestion"}</span>
              <span className="text-[#3A8BFF]"> context</span>
              <span className="text-white/60">={"{conversation}"}</span>
              <span className="text-purple-400">{" />"}</span>
            </div>
          </div>

          <div className="mt-8">
            <a 
              href="https://www.npmjs.com/package/@iris-technologies/react" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#3A8BFF] hover:text-[#60a5fa] transition-colors text-sm"
            >
              Full documentation →
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-20">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Start monetizing your AI conversations.
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Join the network. Access premium demand. Keep your UX intact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo?type=publisher" className="metallic-button">
              <span>Join the Network</span>
            </Link>
            <Link 
              to="/demo?type=publisher"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Get Revenue Estimate
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
