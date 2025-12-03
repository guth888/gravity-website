import { useEffect, useRef, useState, useMemo } from "react";
import gravityLogo from '@/assets/gravity-logo.png';

// Section data structure
interface Section {
  id: string;
  number: string;
  title: string;
  subsections?: { id: string; number: string; title: string }[];
}

const sections: Section[] = [
  {
    id: "overview",
    number: "00",
    title: "Overview",
    subsections: [
      { id: "what-gravity-is", number: "00.1", title: "What Gravity Is" },
      { id: "what-gravity-solves", number: "00.2", title: "What Gravity Solves" },
      { id: "who-gravity-is-for", number: "00.3", title: "Who Gravity Is For" },
    ],
  },
  {
    id: "gravity-model",
    number: "01",
    title: "The Gravity Model",
    subsections: [
      { id: "intent-detection", number: "01.1", title: "Intent Detection" },
      { id: "relevance-matching", number: "01.2", title: "Relevance Matching" },
      { id: "realtime-auction", number: "01.3", title: "The Real-Time Auction" },
      { id: "suggestion-rendering", number: "01.4", title: "Suggestion Rendering" },
      { id: "safety-ux", number: "01.5", title: "Safety + UX Layer" },
    ],
  },
  {
    id: "network-architecture",
    number: "02",
    title: "Network Architecture",
    subsections: [
      { id: "demand-sources", number: "02.1", title: "Demand Sources" },
      { id: "supply-surfaces", number: "02.2", title: "Supply Surfaces" },
      { id: "data-flow", number: "02.3", title: "How Data Flows" },
      { id: "wire-data", number: "02.4", title: "What Travels On the Wire" },
    ],
  },
  {
    id: "publishers",
    number: "03",
    title: "What Publishers Get",
    subsections: [
      { id: "monetization", number: "03.1", title: "Monetization Without Breaking UX" },
      { id: "control-panel", number: "03.2", title: "Control Panel" },
      { id: "publisher-analytics", number: "03.3", title: "Analytics" },
      { id: "publisher-use-cases", number: "03.4", title: "Use Cases" },
    ],
  },
  {
    id: "advertisers",
    number: "04",
    title: "What Advertisers Get",
    subsections: [
      { id: "high-intent", number: "04.1", title: "Access to High-Intent Conversations" },
      { id: "targeting", number: "04.2", title: "Targeting Controls" },
      { id: "creative-formats", number: "04.3", title: "Creative Formats" },
      { id: "performance", number: "04.4", title: "Performance Measurement" },
    ],
  },
  {
    id: "rendering",
    number: "05",
    title: "Rendering the Experience",
    subsections: [
      { id: "suggestion-anatomy", number: "05.1", title: "Anatomy of a Suggestion" },
      { id: "placement", number: "05.2", title: "Inline vs Below-the-Fold" },
      { id: "interaction", number: "05.3", title: "Interaction Model" },
      { id: "ux-safety", number: "05.4", title: "UX Safety Patterns" },
    ],
  },
  {
    id: "publisher-integrations",
    number: "06",
    title: "Publisher Integrations",
    subsections: [
      { id: "quick-start", number: "06.1", title: "Quick Start Guide" },
      { id: "sdk-options", number: "06.2", title: "SDK Options" },
      { id: "rendering-snippet", number: "06.3", title: "Rendering a Suggestion" },
      { id: "config-options", number: "06.4", title: "Configuration Options" },
      { id: "sandbox", number: "06.5", title: "Testing Sandbox" },
    ],
  },
  {
    id: "advertiser-integrations",
    number: "07",
    title: "Advertiser Integrations",
    subsections: [
      { id: "join-network", number: "07.1", title: "How to Join" },
      { id: "budgets-bids", number: "07.2", title: "Budgets and Bids" },
      { id: "audience-controls", number: "07.3", title: "Audience Controls" },
      { id: "creative-input", number: "07.4", title: "Creative Input" },
      { id: "optimization", number: "07.5", title: "Campaign Optimization" },
    ],
  },
  {
    id: "privacy-safety",
    number: "08",
    title: "Privacy & Safety",
    subsections: [
      { id: "data-we-see", number: "08.1", title: "Data We See" },
      { id: "protect-conversations", number: "08.2", title: "Protecting Conversations" },
      { id: "compliance", number: "08.3", title: "Compliance Modes" },
    ],
  },
  {
    id: "performance-measurement",
    number: "09",
    title: "Performance & Measurement",
    subsections: [
      { id: "publisher-metrics", number: "09.1", title: "Publisher Metrics" },
      { id: "advertiser-metrics", number: "09.2", title: "Advertiser Metrics" },
      { id: "benchmarks", number: "09.3", title: "Network Benchmarks" },
      { id: "ux-measurement", number: "09.4", title: "Measuring UX Safety" },
    ],
  },
  {
    id: "examples",
    number: "10",
    title: "Example Implementations",
    subsections: [
      { id: "chat-example", number: "10.1", title: "Chat App Example" },
      { id: "agent-example", number: "10.2", title: "Agent Example" },
      { id: "enterprise-example", number: "10.3", title: "Enterprise Assistant" },
      { id: "vertical-examples", number: "10.4", title: "Vertical Examples" },
    ],
  },
  {
    id: "faqs",
    number: "11",
    title: "FAQs & Troubleshooting",
    subsections: [
      { id: "publisher-faqs", number: "11.1", title: "Publisher Questions" },
      { id: "advertiser-faqs", number: "11.2", title: "Advertiser Questions" },
      { id: "technical-faqs", number: "11.3", title: "Technical Questions" },
    ],
  },
];

// Sidebar Navigation Component
const Sidebar = ({ 
  activeSection, 
  onSectionClick 
}: { 
  activeSection: string; 
  onSectionClick: (id: string) => void;
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Auto-expand active section
  useEffect(() => {
    const parentSection = sections.find(s => 
      s.id === activeSection || s.subsections?.some(sub => sub.id === activeSection)
    );
    if (parentSection && !expandedSections.includes(parentSection.id)) {
      setExpandedSections(prev => [...prev, parentSection.id]);
    }
  }, [activeSection]);

  return (
    <nav className="docs-sidebar">
      <ul className="space-y-1">
        {sections.map((section) => {
          const isActive = section.id === activeSection || 
            section.subsections?.some(sub => sub.id === activeSection);
          const isExpanded = expandedSections.includes(section.id);

          return (
            <li key={section.id}>
              <button
                onClick={() => {
                  onSectionClick(section.id);
                  toggleSection(section.id);
                }}
                className={`
                  w-full text-left px-3 py-2 text-sm font-medium transition-all duration-200
                  flex items-center gap-2 rounded-sm
                  ${isActive 
                    ? 'text-white bg-white/5 border-l-2 border-[#3D3D3D]' 
                    : 'text-white/50 hover:text-white/80 border-l-2 border-transparent'}
                `}
              >
                <span className="text-[11px] font-mono opacity-60">{section.number}</span>
                <span className="uppercase tracking-wider text-[11px]">{section.title}</span>
              </button>

              {/* Subsections */}
              {section.subsections && isExpanded && (
                <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10">
                  {section.subsections.map((sub) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => onSectionClick(sub.id)}
                        className={`
                          w-full text-left px-3 py-1.5 text-[11px] transition-all duration-200
                          ${activeSection === sub.id 
                            ? 'text-white/90' 
                            : 'text-white/40 hover:text-white/70'}
                        `}
                      >
                        {sub.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// Section Header Component
const SectionHeader = ({ 
  number, 
  title, 
  id 
}: { 
  number: string; 
  title: string; 
  id: string;
}) => (
  <div id={id} className="docs-section-header scroll-mt-24">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 rounded-full bg-[#3D3D3D]" />
      <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
        {number === "00" ? "Overview" : `Section ${number}`}
      </span>
    </div>
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-white leading-tight">
      {title}
    </h2>
  </div>
);

// Subsection Header Component
const SubsectionHeader = ({ 
  number, 
  title, 
  id 
}: { 
  number: string; 
  title: string; 
  id: string;
}) => (
  <div id={id} className="docs-subsection-header scroll-mt-24 mt-16 mb-6">
    <div className="flex items-start gap-4">
      <span className="text-[11px] font-mono text-white/30 mt-1.5">
        [{number}]
      </span>
      <h3 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide">
        {title}
      </h3>
    </div>
  </div>
);

// Content paragraph component
const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
    {children}
  </p>
);

// Feature list item
const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-white/60 text-base">
    <svg className="w-5 h-5 text-[#3D3D3D] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span>{children}</span>
  </li>
);

// Code block component
const CodeBlock = ({ code, language = "typescript" }: { code: string; language?: string }) => (
  <div className="bg-black/50 border border-white/10 rounded-lg overflow-hidden my-6">
    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
      <span className="text-[10px] font-mono text-white/40 uppercase">{language}</span>
      <button className="text-[10px] text-white/40 hover:text-white/60 transition-colors">
        Copy
      </button>
    </div>
    <pre className="p-4 overflow-x-auto">
      <code className="text-sm font-mono text-white/80">{code}</code>
    </pre>
  </div>
);

// Stat card for metrics
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-lg p-6">
    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{value}</div>
    <div className="text-sm text-white/50">{label}</div>
  </div>
);

// ============================================
// SECTION CONTENT COMPONENTS
// ============================================

// Section 00: Overview
const OverviewSection = () => (
  <div className="docs-section">
    <SectionHeader number="00" title="Overview" id="overview" />
    
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <SubsectionHeader number="00.1" title="What Gravity Is" id="what-gravity-is" />
        <Paragraph>
          Gravity is an AI-native ad platform that connects advertisers with high-intent moments inside LLM conversations. 
          We insert high-intent sponsored suggestions directly into AI answers—designed to preserve trust and feel native to the conversation.
        </Paragraph>
        <Paragraph>
          Think of it as the ad layer purpose-built for the conversational era: where users ask, compare, and decide inside AI chats instead of browsing feeds or clicking links.
        </Paragraph>
      </div>
      
      <div className="relative">
        {/* Visual: Gravity logo */}
        <div className="aspect-square bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-xl overflow-hidden relative">
          <img 
            src={gravityLogo} 
            alt="Gravity" 
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              imageRendering: 'crisp-edges',
              WebkitImageRendering: '-webkit-optimize-contrast',
              transform: 'scale(1.3)',
              willChange: 'transform'
            }}
          />
        </div>
      </div>
    </div>

    <SubsectionHeader number="00.2" title="What Gravity Solves" id="what-gravity-solves" />
    <Paragraph>
      Today's AI ecosystem has a missing economic layer.
    </Paragraph>
    <Paragraph>
      LLM conversations are where decisions now happen — but there is almost no structured way to fund them.
    </Paragraph>
    <Paragraph>
      Gravity solves three fundamental problems:
    </Paragraph>
    <ul className="space-y-4 mb-8 mt-6">
      <FeatureItem>
        <strong>Brands can't access high-intent moments inside LLM conversations.</strong> Users ask "What's the best CRM?" or "Which hotel in Paris?", but advertisers have no structured channel to appear in those intent-rich decision points.
      </FeatureItem>
      <FeatureItem>
        <strong>AI apps and agents have no sustainable monetization model.</strong> Running LLMs is expensive. Most assistants, bots, and agents don't have a path to profitability. Gravity gives them a clean, native way to generate revenue without breaking UX.
      </FeatureItem>
      <FeatureItem>
        <strong>Free AI isn't economically possible without an ad layer.</strong> Just like search engines and social networks needed ads to become free and globally accessible, AI needs a native monetization layer. Gravity is that layer — the economic infrastructure that will fund the future of free AI.
      </FeatureItem>
    </ul>

    <SubsectionHeader number="00.3" title="Who Gravity Is For" id="who-gravity-is-for" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="text-white text-sm font-semibold uppercase tracking-wider mb-3">Publishers</div>
        <p className="text-white/60 text-sm">LLM apps, AI assistants, chatbots, and agents looking to monetize conversations without compromising UX.</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="text-[#10b981] text-sm font-semibold uppercase tracking-wider mb-3">Advertisers</div>
        <p className="text-white/60 text-sm">Brands and agencies wanting to reach users at the exact moment of high-intent decision-making.</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="text-[#3D3D3D] text-sm font-semibold uppercase tracking-wider mb-3">Agents</div>
        <p className="text-white/60 text-sm">Autonomous AI agents that need a monetization layer while maintaining user trust.</p>
      </div>
    </div>
  </div>
);

// Section 01: The Gravity Model
const GravityModelSection = () => (
  <div className="docs-section">
    <SectionHeader number="01" title="The Gravity Model" id="gravity-model" />
    
    <Paragraph>
      Gravity operates through a five-stage pipeline that runs in milliseconds, 
      ensuring relevant suggestions appear naturally within the conversation flow.
    </Paragraph>

    {/* Flow Diagram */}
    <div className="my-12 p-8 bg-white/5 border border-white/10 rounded-xl">
      <div className="flex flex-wrap items-center justify-center gap-4 text-center">
        {["Intent Detection", "Relevance Matching", "Real-Time Auction", "Suggestion Rendering", "Safety Layer"].map((step, i) => (
          <div key={step} className="flex items-center gap-4">
            <div className="bg-[#3D3D3D]/20 border border-[#3D3D3D]/40 rounded-lg px-4 py-3">
              <div className="text-[10px] text-[#3D3D3D] font-mono mb-1">0{i + 1}</div>
              <div className="text-sm text-white font-medium">{step}</div>
            </div>
            {i < 4 && (
              <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>

    <SubsectionHeader number="01.1" title="Intent Detection" id="intent-detection" />
    <Paragraph>
      Every prompt is analyzed for commercial intent signals. When a user asks "What's the best CRM for a small team?", 
      Gravity recognizes this as a high-intent moment with purchase potential.
    </Paragraph>

    <SubsectionHeader number="01.2" title="Relevance Matching" id="relevance-matching" />
    <Paragraph>
      Intent is mapped to relevant advertiser categories and specific offers. 
      The system considers context, user signals, and advertiser targeting criteria to find the best matches.
    </Paragraph>

    <SubsectionHeader number="01.3" title="The Real-Time Auction" id="realtime-auction" />
    <Paragraph>
      DSPs and direct advertisers bid in real-time for each opportunity. 
      The auction considers bid price, relevance score, and quality factors to select the winning suggestion.
    </Paragraph>

    <SubsectionHeader number="01.4" title="Suggestion Rendering" id="suggestion-rendering" />
    <Paragraph>
      Matched suggestions are formatted to appear native within the AI's response. 
      The suggestion feels like a helpful addition, not an interruption.
    </Paragraph>

    <SubsectionHeader number="01.5" title="Safety + UX Layer" id="safety-ux" />
    <Paragraph>
      Before any suggestion is shown, it passes through safety checks: brand safety, 
      content appropriateness, frequency capping, and UX impact scoring.
    </Paragraph>
  </div>
);

// Section 02: Network Architecture
const NetworkArchitectureSection = () => (
  <div className="docs-section">
    <SectionHeader number="02" title="Network Architecture" id="network-architecture" />
    
    {/* Reuse the infrastructure visual concept */}
    <div className="my-12 p-8 bg-white/5 border border-white/10 rounded-xl">
      <svg className="w-full h-[300px]" viewBox="0 0 600 300">
        <defs>
          <linearGradient id="demandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3D3D3D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3D3D3D" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="supplyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Labels */}
        <text x="70" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6b7280" letterSpacing="0.15em">DEMAND</text>
        <text x="530" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6b7280" letterSpacing="0.15em">SUPPLY</text>

        {/* Demand nodes */}
        {[{y: 80, label: "DSPs"}, {y: 150, label: "Agencies"}, {y: 220, label: "Direct"}].map((node, i) => (
          <g key={i}>
            <line x1="105" y1={node.y} x2="255" y2="150" stroke="url(#demandGrad)" strokeWidth="1.5" />
            <rect x="35" y={node.y - 15} width="70" height="30" rx="6" fill="#1a1a1a" stroke="#333" />
            <text x="70" y={node.y + 5} textAnchor="middle" fontSize="11" fill="#9ca3af">{node.label}</text>
            {/* Animated dot on demand line */}
            <circle r="4" fill="#3D3D3D" opacity="0.8">
              <animateMotion dur={`${2 + i * 0.2}s`} repeatCount="indefinite" path={`M 105 ${node.y} L 255 150`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Center */}
        <g transform="translate(300, 150)">
          <circle r="45" fill="#3D3D3D" fillOpacity="0.1" />
          <circle r="35" fill="#0a0a0a" stroke="#3D3D3D" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3D3D3D">GRAVITY</text>
        </g>

        {/* Supply nodes */}
        {[{y: 80, label: "AI App"}, {y: 150, label: "AI Chat"}, {y: 220, label: "Agents"}].map((node, i) => (
          <g key={i}>
            <line x1="345" y1="150" x2="495" y2={node.y} stroke="url(#supplyGrad)" strokeWidth="1.5" />
            <rect x="495" y={node.y - 15} width="70" height="30" rx="6" fill="#1a1a1a" stroke="#333" />
            <text x="530" y={node.y + 5} textAnchor="middle" fontSize="11" fill="#9ca3af">{node.label}</text>
            {/* Animated dot on supply line */}
            <circle r="4" fill="#10b981" opacity="0.8">
              <animateMotion dur={`${2 + i * 0.2}s`} repeatCount="indefinite" path={`M 345 150 L 495 ${node.y}`} begin={`${0.3 + i * 0.1}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" begin={`${0.3 + i * 0.1}s`} />
            </circle>
          </g>
        ))}

        {/* Animated path: Agencies → Gravity → AI Chat */}
        <g>
          {/* Left segment: Agencies to left edge of Gravity circle */}
          <path 
            d="M 105 150 L 255 150" 
            fill="none" 
            stroke="#3D3D3D" 
            strokeWidth="2.5" 
            strokeDasharray="150"
            strokeDashoffset="150"
            opacity="0.8"
            style={{
              animation: 'draw-agencies-to-gravity 1s ease-out forwards',
              animationDelay: '600ms'
            }}
          />
          {/* Right segment: Right edge of Gravity circle to AI Chat */}
          <path 
            d="M 345 150 L 495 150" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="2.5" 
            strokeDasharray="150"
            strokeDashoffset="150"
            opacity="0.8"
            style={{
              animation: 'draw-gravity-to-ai-chat 1s ease-out forwards',
              animationDelay: '1600ms'
            }}
          />
          
          {/* Animated dots on Agencies → AI Chat path */}
          {/* Dot on left segment (Agencies to Gravity) */}
          <circle r="5" fill="#3D3D3D" opacity="0.9">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 105 150 L 255 150" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Dot on right segment (Gravity to AI Chat) */}
          <circle r="5" fill="#10b981" opacity="0.9">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 345 150 L 495 150" begin="0.5s" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
          </circle>
        </g>
      </svg>
      
      {/* CSS animations for line drawing */}
      <style>{`
        @keyframes draw-agencies-to-gravity {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-gravity-to-ai-chat {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>

    <SubsectionHeader number="02.1" title="Demand Sources" id="demand-sources" />
    <Paragraph>
      Gravity aggregates demand from multiple sources: DSPs via an OpenRTB 2.6-compatible endpoint, 
      agency trading desks with managed service, and direct advertisers through our self-serve platform.
    </Paragraph>

    <SubsectionHeader number="02.2" title="Supply Surfaces" id="supply-surfaces" />
    <Paragraph>
      Publishers integrate Gravity into any LLM-powered surface: consumer chatbots, 
      AI assistants, knowledge agents, search/chat hybrids, and autonomous agents.
    </Paragraph>

    <SubsectionHeader number="02.3" title="How Data Flows" id="data-flow" />
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 my-6 font-mono text-sm text-white/70">
      Prompt → Intent Signal → Auction Request → Bid Response → Suggestion → Render
    </div>

    <SubsectionHeader number="02.4" title="What Travels On the Wire" id="wire-data" />
    <Paragraph>
      Privacy is fundamental. Only metadata travels through Gravity: intent category, 
      context signals, and anonymized session data. Raw user conversations never leave the publisher's environment.
    </Paragraph>
  </div>
);

// Section 03: What Publishers Get
const PublishersSection = () => (
  <div className="docs-section">
    <SectionHeader number="03" title="What Publishers Get" id="publishers" />
    
    <SubsectionHeader number="03.1" title="Monetization Without Breaking UX" id="monetization" />
    <Paragraph>
      Native suggestions that feel like helpful additions to the AI's response. 
      No banners, no interstitials, no UX degradation. Just relevant recommendations 
      at the right moment.
    </Paragraph>

    <SubsectionHeader number="03.2" title="Control Panel" id="control-panel" />
    <ul className="space-y-3 mb-8">
      <FeatureItem>Category allowlists and blocklists</FeatureItem>
      <FeatureItem>Frequency capping controls</FeatureItem>
      <FeatureItem>Brand safety modes (strict, moderate, open)</FeatureItem>
      <FeatureItem>Custom styling to match your UI</FeatureItem>
    </ul>

    <SubsectionHeader number="03.3" title="Analytics" id="publisher-analytics" />
    <Paragraph>
      Example metrics from early integrations:
    </Paragraph>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      <StatCard value="$2.50" label="Avg CPM" />
      <StatCard value="85%" label="Fill Rate" />
      <StatCard value="12.4%" label="CTR" />
      <StatCard value="+0.2%" label="UX Impact" />
    </div>

    <SubsectionHeader number="03.4" title="Use Cases" id="publisher-use-cases" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {["Consumer Chatbots", "AI Assistants", "Knowledge Agents", "Search/Chat Hybrids"].map((useCase) => (
        <div key={useCase} className="bg-white/5 border border-white/10 rounded-lg p-4">
          <span className="text-white/80">{useCase}</span>
        </div>
      ))}
    </div>
  </div>
);

// Section 04: What Advertisers Get
const AdvertisersSection = () => (
  <div className="docs-section">
    <SectionHeader number="04" title="What Advertisers Get" id="advertisers" />
    
    <SubsectionHeader number="04.1" title="Access to High-Intent Conversations" id="high-intent" />
    <Paragraph>
      Reach users at the exact moment they're asking, comparing, and deciding. 
      Not after they've made up their mind—during the decision itself.
    </Paragraph>

    <SubsectionHeader number="04.2" title="Targeting Controls" id="targeting" />
    <ul className="space-y-3 mb-8">
      <FeatureItem>Clicks</FeatureItem>
      <FeatureItem>Conversions</FeatureItem>
      <FeatureItem>Reach</FeatureItem>
    </ul>

    <SubsectionHeader number="04.3" title="Creative Formats" id="creative-formats" />
    <Paragraph>
      Text-only native suggestions. No images, no videos—just a clear, helpful 
      recommendation that fits naturally in the conversation. Brand name, value prop, 
      and optional CTA.
    </Paragraph>

    <SubsectionHeader number="04.4" title="Performance Measurement" id="performance" />
    <Paragraph>
      Example performance from limited tests:
    </Paragraph>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      <StatCard value="3.2x" label="ROAS" />
      <StatCard value="40%" label="Lower CAC" />
      <StatCard value="12%" label="Conv Rate" />
      <StatCard value="$0.85" label="Avg CPC" />
    </div>
  </div>
);

// Section 05: Rendering Experience
const RenderingSection = () => (
  <div className="docs-section">
    <SectionHeader number="05" title="Rendering the Experience" id="rendering" />
    
    <SubsectionHeader number="05.1" title="Anatomy of a Suggestion" id="suggestion-anatomy" />
    
    {/* Chat UI mockup */}
    <div className="my-8 max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-700" />
          <span className="text-xs text-gray-700 font-medium">AI Assistant</span>
        </div>
        
        {/* Messages */}
        <div className="p-4 space-y-3 bg-white">
          {/* User question */}
          <div className="flex justify-end">
            <div className="bg-gray-800 rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]">
              <p className="text-sm text-white">What's the best project management tool for a remote team?</p>
            </div>
          </div>
          
          {/* AI response */}
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-xl rounded-bl-sm px-3 py-2.5 max-w-[85%]">
              <p className="text-sm text-gray-700 mb-2">For remote teams, I'd recommend tools like Asana, Monday, or Notion. They all offer strong collaboration features.</p>
              
              {/* Sponsored suggestion inline */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mt-2">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold text-emerald-700">Linear</span> is worth checking out—built for fast-moving teams with excellent async workflows.
                </p>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 block uppercase tracking-wide">Sponsored</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SubsectionHeader number="05.2" title="Inline vs Below-the-Fold" id="placement" />
    <Paragraph>
      Publishers choose where suggestions appear: inline within the response, 
      or below-the-fold after the main answer. Both maintain the native feel.
    </Paragraph>

    <SubsectionHeader number="05.3" title="Interaction Model" id="interaction" />
    <Paragraph>
      Click → Landing page. Simple. No complex flows, no multi-step journeys. 
      The suggestion is the ad unit—clicking it takes users directly to the advertiser.
    </Paragraph>

    <SubsectionHeader number="05.4" title="UX Safety Patterns" id="ux-safety" />
    <ul className="space-y-3 mb-8">
      <FeatureItem>Clear "Sponsored" labeling</FeatureItem>
      <FeatureItem>Visually distinct but not jarring</FeatureItem>
      <FeatureItem>Never more than one suggestion per response</FeatureItem>
      <FeatureItem>Frequency caps to prevent fatigue</FeatureItem>
    </ul>
  </div>
);

// Section 06: Publisher Integrations
const PublisherIntegrationsSection = () => (
  <div className="docs-section">
    <SectionHeader number="06" title="Publisher Integrations" id="publisher-integrations" />
    
    <SubsectionHeader number="06.1" title="Quick Start Guide" id="quick-start" />
    <Paragraph>
      Get Gravity running in your LLM app with just a few lines of code. 
      A simple integration can be completed in under an hour.
    </Paragraph>

    <SubsectionHeader number="06.2" title="SDK Options" id="sdk-options" />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
      {[
        { name: "API SDK", status: "Available", link: "https://www.npmjs.com/package/@gravity-ai/api", linkText: "View on npm →" },
        { name: "React SDK", status: "Available", link: "https://www.npmjs.com/package/@gravity-ai/react", linkText: "View on npm →" },
        { name: "Python SDK", status: "Coming Soon", link: null, linkText: null },
        { name: "iOS SDK", status: "Coming Soon", link: null, linkText: null },
        { name: "Android SDK", status: "Coming Soon", link: null, linkText: null },
        { name: "REST API", status: "Available", link: "https://docs.trygravity.ai/", linkText: "View docs →" },
      ].map((sdk) => (
        <a 
          key={sdk.name} 
          href={sdk.link || undefined}
          target={sdk.link ? "_blank" : undefined}
          rel={sdk.link ? "noopener noreferrer" : undefined}
          className={`bg-white/5 border border-white/10 rounded-lg p-4 block ${sdk.link ? 'hover:bg-white/10 hover:border-[#3D3D3D]/30 transition-colors cursor-pointer' : ''}`}
        >
          <div className="text-white/80 font-medium">{sdk.name}</div>
          <div className={`text-xs mt-1 ${sdk.status === "Available" ? "text-[#10b981]" : "text-white/40"}`}>
            {sdk.status}
          </div>
          {sdk.linkText && <div className="text-[10px] text-[#3D3D3D] mt-2">{sdk.linkText}</div>}
        </a>
      ))}
    </div>

    <div className="my-6 p-4 bg-[#3D3D3D]/10 border border-[#3D3D3D]/20 rounded-lg">
      <div className="text-white/90 font-medium mb-2">Quick Links</div>
      <div className="flex flex-wrap gap-4 text-sm">
        <a href="https://docs.trygravity.ai/" target="_blank" rel="noopener noreferrer" className="text-[#3D3D3D] hover:underline">
          API Documentation →
        </a>
        <a href="https://react-sandbox.trygravity.ai/" target="_blank" rel="noopener noreferrer" className="text-[#3D3D3D] hover:underline">
          React SDK Playground →
        </a>
        <a href="https://www.npmjs.com/package/@gravity-ai/api" target="_blank" rel="noopener noreferrer" className="text-[#3D3D3D] hover:underline">
          API SDK (npm) →
        </a>
        <a href="https://www.npmjs.com/package/@gravity-ai/react" target="_blank" rel="noopener noreferrer" className="text-[#3D3D3D] hover:underline">
          React SDK (npm) →
        </a>
      </div>
    </div>

    <SubsectionHeader number="06.3" title="Rendering a Suggestion" id="rendering-snippet" />
    <Paragraph>
      The SDK can classify intent locally and only send metadata, or you can send prompt text for server-side classification:
    </Paragraph>
    <CodeBlock 
      language="typescript"
      code={`import { GravitySDK } from '@gravity-ai/api';

const gravity = new GravitySDK({ publisherId: 'your-id' });

// Option 1: Metadata-only (recommended for privacy)
// SDK runs intent classification locally
const suggestion = await gravity.getSuggestion({
  intentCategory: 'product_research',
  topics: ['crm', 'software'],
  sessionId: 'anon-session-123',
  // Optional: non-PII context signals only
});

// Option 2: Server-side classification
// Send prompt text for Gravity to classify
const suggestion = await gravity.getSuggestion({
  prompt: userMessage,
  context: conversationHistory
});

// Render in your UI
if (suggestion) {
  renderSuggestion(suggestion);
}`}
    />

    <SubsectionHeader number="06.4" title="Configuration Options" id="config-options" />
    <CodeBlock 
      language="typescript"
      code={`gravity.configure({
  categories: ['saas', 'fintech', 'travel'],
  blocklist: ['gambling', 'adult'],
  safeMode: 'strict',
  maxSuggestionsPerSession: 3,
  styling: {
    accentColor: '#3D3D3D',
    borderRadius: '12px'
  }
});`}
    />

    <SubsectionHeader number="06.5" title="Testing Sandbox" id="sandbox" />
    <Paragraph>
      Preview how suggestions will appear in your UI before going live. 
      Test different categories, styling options, and placement configurations.
    </Paragraph>
    <div className="mt-4">
      <a 
        href="https://react-sandbox.trygravity.ai/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3D3D3D] text-white rounded-lg text-sm font-medium hover:bg-[#3D3D3D]/90 transition-colors"
      >
        Open React SDK Playground →
      </a>
    </div>
  </div>
);

// Section 07: Advertiser Integrations
const AdvertiserIntegrationsSection = () => (
  <div className="docs-section">
    <SectionHeader number="07" title="Advertiser Integrations" id="advertiser-integrations" />
    
    <SubsectionHeader number="07.1" title="How to Join" id="join-network" />
    <Paragraph>
      Get started in three steps: Create an account, set up your first campaign, 
      and launch. No minimum spend, no long-term contracts.
    </Paragraph>

    <SubsectionHeader number="07.2" title="Budgets and Bids" id="budgets-bids" />
    <ul className="space-y-3 mb-8">
      <FeatureItem>Daily and lifetime budget caps</FeatureItem>
      <FeatureItem>CPC or CPM bidding models</FeatureItem>
      <FeatureItem>Automated bid optimization</FeatureItem>
      <FeatureItem>Real-time spend tracking</FeatureItem>
    </ul>

    <SubsectionHeader number="07.3" title="Audience Controls" id="audience-controls" />
    <ul className="space-y-3 mb-8">
      <FeatureItem>Intent category targeting</FeatureItem>
      <FeatureItem>Publisher allowlists</FeatureItem>
      <FeatureItem>Geographic targeting</FeatureItem>
      <FeatureItem>Device and platform filters</FeatureItem>
    </ul>

    <SubsectionHeader number="07.4" title="Creative Input" id="creative-input" />
    <Paragraph>
      Text-only creatives. Provide your brand name, a short value proposition (under 100 characters), 
      and a destination URL. Gravity handles the rest.
    </Paragraph>

    <SubsectionHeader number="07.5" title="Campaign Optimization" id="optimization" />
    <ul className="space-y-3 mb-8">
      <FeatureItem>A/B testing for creative variants</FeatureItem>
      <FeatureItem>Automated bid adjustments based on performance</FeatureItem>
      <FeatureItem>Category performance insights</FeatureItem>
      <FeatureItem>Conversion tracking integration</FeatureItem>
    </ul>
  </div>
);

// Section 08: Privacy & Safety
const PrivacySafetySection = () => (
  <div className="docs-section">
    <SectionHeader number="08" title="Privacy & Safety" id="privacy-safety" />
    
    <SubsectionHeader number="08.1" title="Data We See" id="data-we-see" />
    <Paragraph>
      Gravity only processes metadata: intent signals, category classifications, 
      and anonymized session identifiers. We never see, store, or transmit raw user conversations.
    </Paragraph>

    <SubsectionHeader number="08.2" title="Protecting Conversations" id="protect-conversations" />
    <ul className="space-y-3 mb-8">
      <FeatureItem>On-device intent classification option</FeatureItem>
      <FeatureItem>No conversation content leaves your servers</FeatureItem>
      <FeatureItem>Encrypted metadata transmission</FeatureItem>
      <FeatureItem>Automatic data deletion after 24 hours</FeatureItem>
    </ul>

    <SubsectionHeader number="08.3" title="Compliance Modes" id="compliance" />
    <div className="flex flex-wrap gap-4 my-6">
      {[
        { name: "GDPR", status: "supported" },
        { name: "CCPA", status: "supported" },
        { name: "SOC 2", status: "in progress" },
        { name: "ISO 27001", status: "roadmap" }
      ].map((cert) => (
        <div key={cert.name} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
          <span className="text-white/60 text-sm font-medium">{cert.name}</span>
          {cert.status !== "supported" && (
            <span className="text-white/30 text-xs ml-2">({cert.status})</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Section 09: Performance & Measurement
const PerformanceSection = () => (
  <div className="docs-section">
    <SectionHeader number="09" title="Performance & Measurement" id="performance-measurement" />
    
    <SubsectionHeader number="09.1" title="Publisher Metrics" id="publisher-metrics" />
    <div className="flex flex-wrap gap-x-8 gap-y-3 my-6">
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">Impressions</span>
        <span className="text-white/40 text-sm">Total suggestion views</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">Clicks</span>
        <span className="text-white/40 text-sm">Total clicks on suggestions</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">CPM</span>
        <span className="text-white/40 text-sm">Cost per 1,000 impressions</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">CTR</span>
        <span className="text-white/40 text-sm">Click-through rate</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">CPC</span>
        <span className="text-white/40 text-sm">Cost per click</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">Revenue</span>
        <span className="text-white/40 text-sm">Total revenue generated</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">Conv%</span>
        <span className="text-white/40 text-sm">Conversion rate</span>
      </div>
    </div>

    <SubsectionHeader number="09.2" title="Advertiser Metrics" id="advertiser-metrics" />
    <div className="flex flex-wrap gap-x-8 gap-y-3 my-6">
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">Impressions</span>
        <span className="text-white/40 text-sm">Total suggestion views</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">Clicks</span>
        <span className="text-white/40 text-sm">Total clicks on suggestions</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">CPM</span>
        <span className="text-white/40 text-sm">Cost per 1,000 impressions</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">CTR</span>
        <span className="text-white/40 text-sm">Click-through rate</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">CPC</span>
        <span className="text-white/40 text-sm">Cost per click</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">Revenue</span>
        <span className="text-white/40 text-sm">Total revenue generated</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">Conv%</span>
        <span className="text-white/40 text-sm">Conversion rate</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white font-semibold">ROAS</span>
        <span className="text-white/40 text-sm">Return on ad spend</span>
      </div>
    </div>

    <SubsectionHeader number="09.3" title="Network Benchmarks" id="benchmarks" />
    <Paragraph>
      Based on early pilot data, Gravity shows strong performance compared to traditional display and native ads:
    </Paragraph>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
        <div className="text-3xl font-bold text-[#3D3D3D] mb-2">12.4%</div>
        <div className="text-sm text-white/50">Average CTR</div>
        <div className="text-xs text-white/30 mt-1">vs 0.35% display</div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
        <div className="text-3xl font-bold text-[#10b981] mb-2">3.2x</div>
        <div className="text-sm text-white/50">Higher ROAS</div>
        <div className="text-xs text-white/30 mt-1">vs search ads</div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
        <div className="text-3xl font-bold text-[#3D3D3D] mb-2">40%</div>
        <div className="text-sm text-white/50">Lower CAC</div>
        <div className="text-xs text-white/30 mt-1">vs social ads</div>
      </div>
    </div>

    <SubsectionHeader number="09.4" title="Measuring UX Safety" id="ux-measurement" />
    <Paragraph>
      We track UX impact through user engagement metrics, session duration changes, 
      and direct feedback. Publishers see a detailed UX impact score in their dashboard.
    </Paragraph>
  </div>
);

// Section 10: Examples
const ExamplesSection = () => (
  <div className="docs-section">
    <SectionHeader number="10" title="Example Implementations" id="examples" />
    
    <SubsectionHeader number="10.1" title="Chat App Example" id="chat-example" />
    <Paragraph>
      A consumer chatbot integrating Gravity to monetize product recommendation queries. 
      Suggestions appear inline when users ask about products, services, or comparisons.
    </Paragraph>

    <SubsectionHeader number="10.2" title="Agent Example" id="agent-example" />
    <Paragraph>
      An autonomous shopping agent that uses Gravity to surface relevant offers 
      while helping users find the best deals. Revenue funds the agent's operation.
    </Paragraph>

    <SubsectionHeader number="10.3" title="Enterprise Assistant" id="enterprise-example" />
    <Paragraph>
      A B2B knowledge assistant that monetizes vendor recommendation queries. 
      When employees ask about tools or services, relevant enterprise solutions appear.
    </Paragraph>

    <SubsectionHeader number="10.4" title="Vertical Examples" id="vertical-examples" />
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
      {["Fintech", "SaaS", "Travel", "E-commerce", "Healthcare"].map((vertical) => (
        <div key={vertical} className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
          <span className="text-white/70 text-sm">{vertical}</span>
        </div>
      ))}
    </div>
  </div>
);

// Section 12: FAQs
const FAQsSection = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = {
    publisher: [
      { q: "How does Gravity affect my app's latency?", a: "Gravity adds less than 400ms to response time. Our SDK is optimized for minimal overhead." },
      { q: "Can I control which categories appear?", a: "Yes. You have full control over category allowlists, blocklists, and brand safety modes." },
      { q: "What if users don't like seeing suggestions?", a: "Our UX research shows 78% of users find relevant suggestions helpful. You can also offer ad-free premium tiers." },
    ],
    advertiser: [
      { q: "How do I ensure brand safety?", a: "Gravity offers multiple brand safety modes and publisher-level targeting. You control where your brand appears." },
      { q: "What's the minimum spend?", a: "No minimum. Start with any budget and scale as you see results." },
      { q: "How is attribution handled?", a: "We support click-through attribution and can integrate with your existing attribution platform." },
    ],
    technical: [
      { q: "Which LLM frameworks do you support?", a: "We support all major frameworks: LangChain, OpenAI, Anthropic, and custom implementations." },
      { q: "Is there a rate limit?", a: "Standard plans include 10K requests/day. Enterprise plans have custom limits." },
      { q: "Do you support streaming responses?", a: "Yes. Our SDK handles streaming responses with suggestions appearing at the appropriate moment." },
    ],
  };

  return (
    <div className="docs-section">
      <SectionHeader number="11" title="FAQs & Troubleshooting" id="faqs" />
      
      <SubsectionHeader number="11.1" title="Publisher Questions" id="publisher-faqs" />
      <div className="space-y-2 mb-8">
        {faqs.publisher.map((faq, i) => (
          <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === `p${i}` ? null : `p${i}`)}
              className="w-full text-left px-4 py-3 flex items-center justify-between text-white/80 hover:bg-white/5 transition-colors"
            >
              <span>{faq.q}</span>
              <svg className={`w-5 h-5 transition-transform ${openFaq === `p${i}` ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openFaq === `p${i}` && (
              <div className="px-4 py-3 bg-white/5 text-white/60 text-sm">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      <SubsectionHeader number="11.2" title="Advertiser Questions" id="advertiser-faqs" />
      <div className="space-y-2 mb-8">
        {faqs.advertiser.map((faq, i) => (
          <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === `a${i}` ? null : `a${i}`)}
              className="w-full text-left px-4 py-3 flex items-center justify-between text-white/80 hover:bg-white/5 transition-colors"
            >
              <span>{faq.q}</span>
              <svg className={`w-5 h-5 transition-transform ${openFaq === `a${i}` ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openFaq === `a${i}` && (
              <div className="px-4 py-3 bg-white/5 text-white/60 text-sm">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      <SubsectionHeader number="11.3" title="Technical Questions" id="technical-faqs" />
      <div className="space-y-2 mb-8">
        {faqs.technical.map((faq, i) => (
          <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === `t${i}` ? null : `t${i}`)}
              className="w-full text-left px-4 py-3 flex items-center justify-between text-white/80 hover:bg-white/5 transition-colors"
            >
              <span>{faq.q}</span>
              <svg className={`w-5 h-5 transition-transform ${openFaq === `t${i}` ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openFaq === `t${i}` && (
              <div className="px-4 py-3 bg-white/5 text-white/60 text-sm">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const GravityDocs = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up IntersectionObserver for scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    // Observe all section headers
    const headers = document.querySelectorAll('[id]');
    headers.forEach((header) => {
      if (sections.some(s => s.id === header.id || s.subsections?.some(sub => sub.id === header.id))) {
        observer.observe(header);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
      <section 
        ref={containerRef}
        className="relative bg-[#0a0a0a] min-h-screen"
      >
        {/* Corner brackets decoration */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-white/10" />
        <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-white/10" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-white/10" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-white/10" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sticky Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 py-12 pr-8 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <Sidebar activeSection={activeSection} onSectionClick={scrollToSection} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 py-12 lg:py-16 lg:pl-8 lg:border-l lg:border-white/10">
            <div className="space-y-32">
              <OverviewSection />
              <GravityModelSection />
              <NetworkArchitectureSection />
              <PublishersSection />
              <AdvertisersSection />
              <RenderingSection />
              <PublisherIntegrationsSection />
              <AdvertiserIntegrationsSection />
              <PrivacySafetySection />
              <PerformanceSection />
              <ExamplesSection />
              <FAQsSection />
            </div>
          </div>
        </div>
      </div>
      </section>
  );
};

export default GravityDocs;

