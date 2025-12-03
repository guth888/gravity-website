import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ChevronDown } from "lucide-react";

// Step data
const steps = [
  {
    number: "01",
    title: "The Problem",
    description: "The old ad formats don't fit the new world. Users no longer browse — they ask, compare, and decide inside LLMs.",
    boldStart: "The old ad formats don't fit the new world.",
    kpi: { value: "73%", label: "Users skip traditional ads" },
  },
  {
    number: "02",
    title: "The Shift",
    description: "Billions of high-intent micro-decisions happen inside LLM chats every day. This is where brands need to be.",
    boldStart: "Billions of high-intent micro-decisions",
    kpi: { value: "4B+", label: "Daily LLM queries" },
  },
  {
    number: "03", 
    title: "The Solution",
    description: "Show up inside the answer. Gravity inserts a native, high-intent suggestion right when the user is deciding.",
    boldStart: "Show up inside the answer.",
    kpi: { value: "12%", label: "Average CTR" },
  },
  {
    number: "04",
    title: "The Future",
    description: "The next ad channel is live. Gravity lets you connect to it today.",
    boldStart: "The next ad channel is live.",
    kpi: { value: "40%", label: "Lower CAC" },
  },
];

// ============================================
// VISUAL COMPONENTS
// ============================================

const ALL_PROMPTS = [
  "Best CRM?", "Invest 10k?", "Hotel Paris", "Top AI tools", 
  "Compare prices", "Debug code", "Plan trip", "Recipe ideas",
  "Chinese food", "Tokyo trip", "Write essay", "Fix resume",
  "Wedding speech", "Buy laptop", "Movie recs", "Stock tips",
];

const SLOT_POSITIONS = (() => {
  const positions: {x: number, y: number}[] = [];
  const cols = [-160, -100, -40, 40, 100, 160];
  const rows = [-70, -35, 0, 35, 70];
  for (const y of rows) {
    for (const x of cols) {
      if (Math.abs(x) < 30 && Math.abs(y) < 25) continue;
      positions.push({ x, y });
    }
  }
  return positions;
})();

// Visual 01: Problem - Death of Browsing (Looping Futuristic Glitch)
const ProblemVisual = ({ isActive }: { isActive: boolean }) => {
  const [showChat, setShowChat] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      setShowChat(false);
      setIsManual(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Don't auto-rotate if user manually clicked
    if (isManual) return;

    // Reset to Google UI first
    setShowChat(false);

    // Auto-rotate: Google UI (5s) -> Chat UI (5s) -> repeat
    const startAutoRotate = () => {
      // Show Google UI for 5 seconds
      timeoutRef.current = setTimeout(() => {
        setShowChat(true);
        // Then show Chat UI for 5 seconds
        timeoutRef.current = setTimeout(() => {
          setShowChat(false);
          // Restart cycle
          startAutoRotate();
        }, 5000);
      }, 5000);
    };

    // Start the cycle
    startAutoRotate();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isManual]);

  const handleDotClick = (index: number) => {
    setIsManual(true);
    setShowChat(index === 1); // 0 = Google, 1 = Chat
    
    // Resume auto-rotation after 12 seconds of manual control
    setTimeout(() => {
      setIsManual(false);
    }, 12000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Micro-label - PAST / FUTURE */}
      <div 
        className="absolute top-[4%] left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500"
        style={{
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: '#6b7280',
          opacity: showChat ? 0 : 0.5,
          textTransform: 'uppercase'
        }}
      >
        Past
      </div>
      <div 
        className="absolute top-[4%] left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500"
        style={{
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: '#6b7280',
          opacity: showChat ? 0.5 : 0,
          textTransform: 'uppercase'
        }}
      >
        Future
      </div>

      {/* Main container */}
      <div className="absolute inset-[10%] rounded-xl overflow-hidden shadow-xl bg-white">
        
        {/* Sliding wrapper - holds both UIs */}
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ 
            width: '200%',
            transform: showChat ? 'translateX(-50%)' : 'translateX(0%)'
          }}
        >
        
          {/* OLD UI - Google Search */}
          <div className="w-1/2 h-full bg-white flex-shrink-0 overflow-hidden">
            {/* Google Header */}
            <div className="flex items-center gap-3 px-4 pt-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-0.5 text-sm font-medium">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
            </div>
              <div className="flex-1 h-8 bg-white border border-gray-300 rounded-full flex items-center px-3 text-[10px] text-gray-600 shadow-sm">
                best laptop for video editing
          </div>
            </div>
            
            <div className="flex h-[calc(100%-48px)]">
              {/* Main Results */}
              <div className="flex-1 px-4 pt-2 overflow-hidden">
                {/* Banner Ad */}
                <div className="p-2 bg-[#fef7e0] rounded-lg border border-amber-200/50 mb-2">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-amber-200 rounded flex items-center justify-center text-amber-700 text-[8px] font-bold">B+</div>
                    <div>
                      <p className="text-[10px] text-blue-700 font-medium">Best Buy® - Top Laptops for Creators</p>
                      <p className="text-[8px] text-green-700">www.bestbuy.com/laptops</p>
                      <p className="text-[8px] text-gray-500">Shop creator laptops. Free shipping on $35+.</p>
                    </div>
                    <span className="text-[7px] text-amber-600 font-bold ml-auto">Ad</span>
                  </div>
                </div>
                
                <p className="text-[8px] text-gray-400 mb-2">About 892,000,000 results (0.42 seconds)</p>
                
                {/* Results */}
                <div className="space-y-2.5 text-[9px]">
                  <div className="border-b border-gray-100 pb-2">
                    <p className="text-[8px] text-green-700">www.tomsguide.com › best-laptops</p>
                    <p className="text-blue-700 font-medium text-[11px]">Best Laptops for Video Editing 2024 | Tom's Guide</p>
                    <p className="text-gray-600 text-[9px]">The MacBook Pro 16 is our top pick for video editors...</p>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <p className="text-[8px] text-green-700">www.pcmag.com › picks</p>
                    <p className="text-blue-700 font-medium text-[11px]">The Best Laptops for Video Editing in 2024 | PCMag</p>
                    <p className="text-gray-600 text-[9px]">We tested 47 laptops for Premiere Pro, DaVinci Resolve...</p>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <p className="text-[8px] text-green-700">www.techradar.com › guides</p>
                    <p className="text-blue-700 font-medium text-[11px]">Best video editing laptops 2024: top picks</p>
                    <p className="text-gray-600 text-[9px]">Whether you're a YouTuber or professional editor...</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-green-700">www.creativebloq.com › guides</p>
                    <p className="text-blue-700 font-medium text-[11px]">Best laptops for video editing in 2024</p>
                    <p className="text-gray-600 text-[9px]">Expert guide from budget to professional...</p>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="w-24 p-2 space-y-2 border-l border-gray-100">
                <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
                  <p className="text-[6px] text-gray-400 mb-1">Sponsored</p>
                  <div className="w-full h-10 bg-gray-200 rounded mb-1 flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-medium">Dell XPS</span>
                  </div>
                </div>
                <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
                  <p className="text-[6px] text-gray-400 mb-1">Sponsored</p>
                  <div className="w-full h-10 bg-blue-50 rounded mb-1 flex items-center justify-center">
                    <span className="text-[8px] text-blue-600 font-medium">HP ZBook</span>
                  </div>
                </div>
                <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
                  <p className="text-[6px] text-gray-400 mb-1">Sponsored</p>
                  <div className="w-full h-10 bg-red-50 rounded mb-1 flex items-center justify-center">
                    <span className="text-[8px] text-red-600 font-medium">Lenovo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEW UI - Chat Interface (rebuilt from scratch) */}
          <div className="w-1/2 h-full bg-white flex-shrink-0 flex flex-col overflow-hidden">
            {/* Header */}
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #374151, #111827)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '12px', height: '12px', color: 'white' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
                </svg>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#374151' }}>AI Assistant</span>
            </div>
            
            {/* Chat Messages */}
            <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
              {/* User Message */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ background: '#1f2937', color: 'white', padding: '8px 12px', borderRadius: '16px 16px 4px 16px', maxWidth: '75%', fontSize: '11px', lineHeight: '1.4' }}>
                  Best laptop for video editing?
                </div>
              </div>
              
              {/* AI Response */}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: '#f3f4f6', borderRadius: '16px 16px 16px 4px', maxWidth: '85%', overflow: 'hidden' }}>
                  {/* Main response */}
                  <div style={{ padding: '10px 12px', fontSize: '11px', lineHeight: '1.5', color: '#374151' }}>
                    <div>For video editing, you need powerful GPU, 32GB+ RAM, and fast SSD. Top picks:</div>
                    <div style={{ marginTop: '4px' }}><strong>1. MacBook Pro 16"</strong> — M3 Max chip, great for Final Cut</div>
                    <div style={{ marginTop: '2px' }}><strong>2. Dell XPS 15</strong> — RTX 4070, stunning OLED display</div>
                    <div style={{ marginTop: '2px' }}><strong>3. ASUS ProArt</strong> — Budget-friendly, color-accurate</div>
                  </div>
                  {/* Sponsored */}
                  <div style={{ borderTop: '1px solid #d1fae5', background: '#ecfdf5', padding: '8px 12px' }}>
                    <div style={{ fontSize: '8px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sponsored · Gravity</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#111827', marginTop: '2px' }}>MacBook Pro 16" M3 Max</div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '1px' }}>Built for professional video. Up to 128GB RAM.</div>
                    <div style={{ fontSize: '11px', color: '#374151', fontWeight: 500, marginTop: '4px' }}>Learn more →</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Input Bar */}
            <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1, height: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '0 12px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>Ask anything...</span>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ width: '14px', height: '14px', color: 'white' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dot indicators */}
        <div 
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 20
          }}
        >
          <button
            onClick={() => handleDotClick(0)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: showChat ? '#d1d5db' : '#374151',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.3s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Show Google UI"
          />
          <button
            onClick={() => handleDotClick(1)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: showChat ? '#374151' : '#d1d5db',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.3s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Show Chat UI"
          />
        </div>
      </div>
    </div>
  );
};

// Visual 02: Shift - Globe
const ShiftVisual = ({ isActive }: { isActive: boolean }) => {
  // Expanded query set to show volume and scale
  const queries = [
    // High-intent purchase queries
    { left: '18%', top: '22%', text: "Best CRM?", intent: 'purchase' },
    { left: '15%', top: '45%', text: "Compare prices", intent: 'purchase' },
    { left: '20%', top: '70%', text: "Buy laptop", intent: 'purchase' },
    { left: '17%', top: '82%', text: "Movie recs", intent: 'purchase' },
    { left: '82%', top: '25%', text: "Invest 10k?", intent: 'purchase' },
    { left: '85%', top: '50%', text: "Plan trip", intent: 'purchase' },
    { left: '83%', top: '75%', text: "Learn Python", intent: 'purchase' },
    { left: '84%', top: '18%', text: "Gift ideas", intent: 'purchase' },
    { left: '42%', top: '15%', text: "Debug code", intent: 'purchase' },
    { left: '58%', top: '16%', text: "Diet plan", intent: 'purchase' },
    { left: '38%', top: '85%', text: "Hotel Paris", intent: 'purchase' },
    { left: '58%', top: '86%', text: "Stock tips", intent: 'purchase' },
    
    // Additional queries to show volume
    { left: '12%', top: '30%', text: "Best phone?", intent: 'purchase' },
    { left: '25%', top: '60%', text: "Car insurance", intent: 'purchase' },
    { left: '22%', top: '90%', text: "Book flight", intent: 'purchase' },
    { left: '88%', top: '35%', text: "Find dentist", intent: 'purchase' },
    { left: '90%', top: '65%', text: "Best VPN?", intent: 'purchase' },
    { left: '75%', top: '88%', text: "Credit card", intent: 'purchase' },
    { left: '50%', top: '8%', text: "Software tool", intent: 'purchase' },
    { left: '8%', top: '55%', text: "Compare deals", intent: 'purchase' },
    { left: '92%', top: '12%', text: "Best app?", intent: 'purchase' },
    { left: '5%', top: '75%', text: "Buy now", intent: 'purchase' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[450px] overflow-hidden">
      {/* Globe - reduced size for better responsiveness */}
      <div 
        className={`w-[400px] h-[400px] max-w-[90%] max-h-[90%] relative flex items-center justify-center transition-all duration-1000 ${isActive ? 'animate-globe-float' : ''}`}
        style={{
          transform: isActive ? 'scale(1)' : 'scale(0.9)',
          opacity: isActive ? 1 : 0.5,
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <svg 
          viewBox="0 0 400 400" 
          className={`w-full h-full absolute inset-0 ${isActive ? 'animate-globe-rotate' : ''}`}
          style={{
            transformOrigin: 'center center'
          }}
        >
          <defs>
            <radialGradient id="globeGlow" cx="30%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#3D3D3D" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3D3D3D" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Main sphere with enhanced glow when active */}
          <circle cx="200" cy="200" r="187" fill="url(#globeGlow)" />
          {isActive && (
            <circle cx="200" cy="200" r="187" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.2" className="animate-globe-glow">
              <animate attributeName="r" values="187;195;187" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx="200" cy="200" r="187" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.15" />
          
          {/* Latitude lines - Static */}
          <ellipse cx="200" cy="200" rx="187" ry="67" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          <ellipse cx="200" cy="200" rx="187" ry="133" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          <line x1="13" y1="200" x2="387" y2="200" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          
          {/* Longitude lines - Static */}
          <ellipse cx="200" cy="200" rx="67" ry="187" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          <ellipse cx="200" cy="200" rx="133" ry="187" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          <line x1="200" y1="13" x2="200" y2="387" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          
          {/* Activity dots - increased density to show volume */}
          {isActive && (
            <g>
              {[
                // Left side
                { cx: 100, cy: 133 }, { cx: 80, cy: 187 }, 
                { cx: 120, cy: 233 }, { cx: 93, cy: 280 },
                
                // Right side
                { cx: 300, cy: 147 }, { cx: 320, cy: 200 },
                { cx: 293, cy: 253 }, { cx: 307, cy: 100 },
                
                // Top/Bottom
                { cx: 200, cy: 80 }, { cx: 200, cy: 320 },
                { cx: 147, cy: 100 }, { cx: 253, cy: 300 },
                
                // Additional dots to show scale
                { cx: 130, cy: 160 }, { cx: 70, cy: 220 },
                { cx: 270, cy: 180 }, { cx: 330, cy: 240 },
                { cx: 160, cy: 90 }, { cx: 240, cy: 310 },
                { cx: 110, cy: 260 }, { cx: 290, cy: 140 },
                { cx: 150, cy: 200 }, { cx: 250, cy: 200 },
                { cx: 180, cy: 120 }, { cx: 220, cy: 280 }
              ].map((pos, i) => (
                <g key={i} style={{
                  animation: `dot-entrance 0.5s ease-out forwards`,
                  animationDelay: `${i * 100}ms`,
                  opacity: 0
                }}>
                  {/* Outer glow ring */}
                  <circle 
                    cx={pos.cx} 
                    cy={pos.cy} 
                    r="8" 
                    fill="#3D3D3D" 
                    opacity="0.1"
                    style={{
                      animation: `pulse-ring-${i} ${2 + i * 0.15}s ease-in-out infinite`,
                      animationDelay: `${i * 100}ms`
                    }}
                  >
                    <animate attributeName="r" values="6;12;6" dur={`${2 + i * 0.15}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0;0.15" dur={`${2 + i * 0.15}s`} repeatCount="indefinite" />
                </circle>
                  {/* Main dot */}
                  <circle 
                    cx={pos.cx} 
                    cy={pos.cy} 
                    r="4" 
                    fill="#3D3D3D" 
                    opacity="0.7"
                    style={{
                      animation: `pulse-dot-${i} ${1.8 + i * 0.2}s ease-in-out infinite`,
                      animationDelay: `${i * 100}ms`
                    }}
                  >
                    <animate attributeName="r" values="3;6.5;3" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0.2;0.7" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>
      
      {/* Connection lines from queries to globe - appearing sequentially with queries */}
      {isActive && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {queries.slice(0, 20).map((q, i) => {
            // Calculate angle from query to center (50%, 50%)
            const leftPercent = parseFloat(q.left);
            const topPercent = parseFloat(q.top);
            const centerX = 50;
            const centerY = 50;
            const distance = Math.sqrt(Math.pow(leftPercent - centerX, 2) + Math.pow(topPercent - centerY, 2));
            
            // Match sequential delay pattern from queries
            const sequentialDelay = i * 150;
            const positionVariation = (distance / 40) * 50;
            const totalDelay = sequentialDelay + positionVariation + 200; // Appear 200ms after query pops
            
            return (
              <line
                key={`line-${i}`}
                x1={`${leftPercent}%`}
                y1={`${topPercent}%`}
                x2="50%"
                y2="50%"
                stroke="#3D3D3D"
                strokeWidth="1"
                strokeOpacity="0"
                strokeDasharray="4 4"
                className="animate-query-connection"
                style={{
                  animationDelay: `${totalDelay}ms`,
                  animationDuration: '1.2s'
                }}
              />
            );
          })}
        </svg>
      )}
      
      {/* Floating query labels - appearing in natural flowing waves */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {isActive && queries.map((q, i) => {
          // Calculate position relative to center for natural flow
          const leftPercent = parseFloat(q.left);
          const topPercent = parseFloat(q.top);
          const centerX = 50;
          const centerY = 50;
          
          // Determine which quadrant/sector the query is in
          const angle = Math.atan2(topPercent - centerY, leftPercent - centerX) * (180 / Math.PI);
          const distance = Math.sqrt(Math.pow(leftPercent - centerX, 2) + Math.pow(topPercent - centerY, 2));
          
          // Group by angle sectors for wave-like appearance
          // Each sector gets a base delay, then queries within sector get staggered
          let sector = 0;
          if (angle >= -45 && angle < 45) sector = 0; // Right
          else if (angle >= 45 && angle < 135) sector = 1; // Bottom
          else if (angle >= 135 || angle < -135) sector = 2; // Left
          else sector = 3; // Top
          
          // Continuous sequential pop-out - queries appear one after another
          // Create a flowing sequence where each query pops in after the previous
          const sequentialDelay = i * 150; // Each query appears 150ms after the previous one
          
          // Add slight variation based on position for natural flow
          const positionVariation = (distance / 40) * 50; // Slight delay based on distance
          const totalDelay = sequentialDelay + positionVariation;
          
          // Determine entrance direction based on position
          let entranceX = 0;
          let entranceY = 0;
          if (leftPercent < centerX) entranceX = -30; // From left
          else entranceX = 30; // From right
          if (topPercent < centerY) entranceY = -20; // From top
          else entranceY = 20; // From bottom
          
          return (
          <div
            key={i}
              className="absolute animate-label-flow-in animate-label-float animate-query-pulse"
            style={{ 
              left: q.left,
              top: q.top,
                animationDelay: `${totalDelay}ms`,
                transform: 'translate(-50%, -50%)',
                '--entrance-x': `${entranceX}px`,
                '--entrance-y': `${entranceY}px`,
                '--float-delay': `${totalDelay * 0.01}s`,
                '--pulse-delay': `${totalDelay * 0.015}s`
              } as React.CSSProperties}
            >
            <span className={`px-3 py-1.5 backdrop-blur-sm rounded-lg border text-xs font-medium whitespace-nowrap block transition-all duration-300 animate-label-shadow-pop ${
              q.intent === 'purchase' 
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-700' 
                : 'bg-white/90 border-gray-100 text-gray-600'
            }`}
            style={{
              animationDelay: `${totalDelay}ms`
            }}>
              {q.text}
            </span>
          </div>
          );
        })}
      </div>
      
      {/* Particle stream effect - flowing in waves */}
      {isActive && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            const radius = 45 + (i % 3) * 5;
            const startX = 50 + Math.cos(angle) * radius;
            const startY = 50 + Math.sin(angle) * radius;
            
            // Group particles by angle sectors for wave effect
            let sector = 0;
            if (angle >= -Math.PI/4 && angle < Math.PI/4) sector = 0;
            else if (angle >= Math.PI/4 && angle < 3*Math.PI/4) sector = 1;
            else if (angle >= 3*Math.PI/4 || angle < -3*Math.PI/4) sector = 2;
            else sector = 3;
            
            const baseDelay = sector * 300 + (i % 3) * 150;
            
            return (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-0 animate-particle-stream"
                style={{
                  left: `${startX}%`,
                  top: `${startY}%`,
                  animationDelay: `${baseDelay}ms`,
                  animationDuration: `${2.5 + (i % 3) * 0.5}s`
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Volume indicator - subtle background pulse */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <div className="w-[500px] h-[500px] rounded-full border-2 border-emerald-200/20 animate-volume-pulse" />
        </div>
      )}
      
      <style>{`
        @keyframes globe-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-globe-rotate {
          animation: globe-rotate 20s linear infinite;
        }
        
        @keyframes globe-float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-8px) scale(1.02);
          }
        }
        .animate-globe-float {
          animation: globe-float 4s ease-in-out infinite;
        }
        
        @keyframes label-flow-in {
          0% { 
            opacity: 0; 
            transform: translate(calc(-50% + var(--entrance-x, 0px)), calc(-50% + var(--entrance-y, 0px))) scale(0) rotate(-5deg);
            filter: blur(6px);
          }
          25% {
            opacity: 0.9;
            transform: translate(calc(-50% + var(--entrance-x, 0px) * 0.3), calc(-50% + var(--entrance-y, 0px) * 0.3)) scale(1.2) rotate(2deg);
            filter: blur(2px);
          }
          45% {
            opacity: 1;
            transform: translate(calc(-50% + var(--entrance-x, 0px) * -0.08), calc(-50% + var(--entrance-y, 0px) * -0.08)) scale(0.95) rotate(-1deg);
            filter: blur(0px);
          }
          65% {
            transform: translate(-50%, -50%) scale(1.08) rotate(0.5deg);
          }
          80% {
            transform: translate(-50%, -50%) scale(0.97) rotate(0deg);
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }
        .animate-label-flow-in {
          animation: label-flow-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes label-shadow-pop {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
          25% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 12px rgba(16, 185, 129, 0.15);
          }
          45% {
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12), 0 0 0 6px rgba(16, 185, 129, 0.08);
          }
          65% {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          }
          100% {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }
        }
        .animate-label-shadow-pop {
          animation: label-shadow-pop 0.7s ease-out forwards;
        }
        
        @keyframes label-float {
          0%, 100% { 
            transform: translate(-50%, calc(-50% + 0px));
          }
          50% { 
            transform: translate(-50%, calc(-50% + -6px));
          }
        }
        .animate-label-float {
          animation: label-float 3s ease-in-out infinite;
          animation-delay: var(--float-delay, 0s);
        }
        
        @keyframes dot-entrance {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          60% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes query-connection {
          0% {
            stroke-dashoffset: 100;
            stroke-opacity: 0;
          }
          50% {
            stroke-opacity: 0.2;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-opacity: 0.15;
          }
        }
        .animate-query-connection {
          animation: query-connection 1.5s ease-out forwards;
        }
        
        @keyframes query-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-query-pulse {
          animation: query-pulse 2s ease-in-out infinite;
          animation-delay: var(--pulse-delay, 0s);
        }
        
        @keyframes particle-stream {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(calc(50% - var(--target-x, 0px)), calc(50% - var(--target-y, 0px))) scale(0.3);
            opacity: 0;
          }
        }
        .animate-particle-stream {
          animation: particle-stream 2.5s ease-out infinite;
        }
        
        @keyframes volume-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
        }
        .animate-volume-pulse {
          animation: volume-pulse 3s ease-in-out infinite;
        }
        
        @keyframes globe-glow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-globe-glow {
          animation: globe-glow 3s ease-in-out infinite;
        }
        
        @keyframes scale-indicator {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-scale-indicator {
          animation: scale-indicator 0.8s ease-out forwards;
          animation-delay: 1s;
        }
      `}</style>
      
      {/* Scale indicator - showing billions */}
      {isActive && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="bg-emerald-50/90 backdrop-blur-sm border border-emerald-200 rounded-lg px-4 py-2 shadow-lg animate-scale-indicator">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-emerald-700">
                <span className="text-lg font-bold">4B+</span> queries/day
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Visual 03: Solution - Chat
const SolutionVisual = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
          <div className="w-4 h-4 rounded-full bg-foreground" />
          <span className="text-sm font-medium text-foreground">AI Assistant</span>
        </div>
        <div className="p-4 space-y-3">
          {/* User question */}
          <div className="flex justify-end">
            <div className="bg-foreground text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
              <p className="text-sm">Best project management tool for a remote team?</p>
            </div>
          </div>
          {/* Sponsored ad */}
          <div 
            className={`transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
            style={{ transitionDelay: isActive ? '800ms' : '0ms' }}
          >
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-4 py-3 flex items-start justify-between gap-3 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-sm text-foreground/90">
                <span className="font-bold text-emerald-600">Linear</span> is worth checking out—built for fast-moving teams with async workflows.
              </p>
              <span className="text-xs font-semibold text-emerald-500 whitespace-nowrap bg-emerald-100 px-2 py-0.5 rounded">Sponsored</span>
            </div>
          </div>
          {/* Organic LLM answer */}
          <div 
            className={`flex justify-start transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
            style={{ transitionDelay: isActive ? '1200ms' : '0ms' }}
          >
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
              <p className="text-sm text-foreground/80 mb-2">For remote teams, I'd recommend:</p>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>• Notion</span>
                <span>• Asana</span>
                <span>• Monday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Visual 04: Infrastructure
const InfrastructureVisual = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
      <svg className="w-full max-w-[500px] h-[240px]" viewBox="0 0 500 240">
        <defs>
          <linearGradient id="lineGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3D3D3D" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3D3D3D" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        <text x="60" y="25" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280" letterSpacing="0.1em">DEMAND</text>
        
        {/* Left nodes */}
        {['DSP', 'Direct', 'Agency'].map((label, i) => (
          <g key={label}>
            <path 
              d={`M 110 ${60 + i * 60} Q 170 ${60 + i * 60} 200 120`} 
              fill="none" 
              stroke="url(#lineGradLeft)" 
              strokeWidth="2" 
              opacity={isActive ? 1 : 0.3} 
              className="transition-opacity duration-700"
              strokeDasharray={isActive ? "200" : "0"}
              strokeDashoffset={isActive ? "200" : "0"}
              style={{
                animation: isActive ? `draw-line-${i} 1s ease-out forwards` : 'none',
                animationDelay: `${i * 150}ms`
              }}
            />
            <g filter="url(#shadow)">
              <rect 
                x="20" 
                y={45 + i * 60} 
                width="90" 
                height="32" 
                rx="6" 
                fill="white" 
                stroke={isActive ? "#3D3D3D" : "#e5e7eb"} 
                strokeWidth={isActive ? "2" : "1"} 
                className="transition-all duration-500"
                style={{
                  transform: isActive ? 'scale(1)' : 'scale(0.95)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 100}ms`
                }}
              />
              <text x="65" y={66 + i * 60} textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="600">{label}</text>
            </g>
          </g>
        ))}
        
        <text x="440" y="25" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280" letterSpacing="0.1em">SUPPLY</text>
        
        {/* Right nodes */}
        {['AI Chat', 'AI App', 'Agent'].map((label, i) => (
          <g key={label}>
            <path 
              d={`M 300 120 Q 330 ${60 + i * 60} 390 ${60 + i * 60}`} 
              fill="none" 
              stroke="url(#lineGradRight)" 
              strokeWidth="2" 
              opacity={isActive ? 1 : 0.3} 
              className="transition-opacity duration-700"
              strokeDasharray={isActive ? "200" : "0"}
              strokeDashoffset={isActive ? "200" : "0"}
              style={{
                animation: isActive ? `draw-line-right-${i} 1s ease-out forwards` : 'none',
                animationDelay: `${(i + 3) * 150}ms`
              }}
            />
            <g filter="url(#shadow)">
              <rect 
                x="390" 
                y={45 + i * 60} 
                width="90" 
                height="32" 
                rx="6" 
                fill="white" 
                stroke={isActive ? "#10b981" : "#e5e7eb"} 
                strokeWidth={isActive ? "2" : "1"} 
                className="transition-all duration-500"
                style={{
                  transform: isActive ? 'scale(1)' : 'scale(0.95)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${(i + 3) * 100}ms`
                }}
              />
              <text x="435" y={66 + i * 60} textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="600">{label}</text>
            </g>
          </g>
        ))}
        
        {/* Direct → Gravity → AI App connection line (stops at circle edges) */}
        {isActive && (
          <>
            {/* Left segment: Direct to left edge of Gravity circle */}
            <path 
              d="M 110 120 Q 170 120 208 120" 
              fill="none" 
              stroke="#3D3D3D" 
              strokeWidth="2.5" 
              strokeDasharray="100"
              strokeDashoffset="100"
              opacity="0.8"
              style={{
                animation: 'draw-direct-to-gravity-left 1s ease-out forwards',
                animationDelay: '600ms'
              }}
            />
            {/* Right segment: Right edge of Gravity circle to AI App */}
            <path 
              d="M 292 120 Q 330 120 390 120" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2.5" 
              strokeDasharray="100"
              strokeDashoffset="100"
              opacity="0.8"
              style={{
                animation: 'draw-gravity-right-to-ai-app 1s ease-out forwards',
                animationDelay: '1600ms'
              }}
            />
          </>
        )}
        
        {/* Animated dots on paths */}
        {isActive && [0, 1, 2].map((i) => (
          <g key={`dots-${i}`}>
            <circle r="4" fill="#3D3D3D">
              <animateMotion dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" path={`M 110 ${60 + i * 60} Q 170 ${60 + i * 60} 200 120`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#10b981">
              <animateMotion dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" path={`M 300 120 Q 330 ${60 + i * 60} 390 ${60 + i * 60}`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        
        {/* Animated dots on Direct → AI App path (respecting circle boundaries) */}
        {isActive && (
          <>
            {/* Dot on left segment (Direct to Gravity) */}
            <circle r="5" fill="#3D3D3D" opacity="0.9">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M 110 120 Q 170 120 208 120" />
              <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            {/* Dot on right segment (Gravity to AI App) */}
            <circle r="5" fill="#10b981" opacity="0.9">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M 292 120 Q 330 120 390 120" begin="0.5s" />
              <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
          </>
        )}
        
        {/* Center - Gravity hub (rendered last so it appears on top) */}
        <g transform="translate(250, 120)">
          {isActive && (
            <circle r="55" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.2">
              <animate attributeName="r" values="45;60" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          <circle r="48" fill="#3D3D3D" fillOpacity="0.05" />
          <circle r="42" fill="white" stroke="#3D3D3D" strokeWidth="2.5" filter="url(#shadow)" />
          <text y="-4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3D3D3D" letterSpacing="0.05em">GRAVITY</text>
          <text y="10" textAnchor="middle" fontSize="8" fontWeight="500" fill="#6b7280">AD NETWORK</text>
        </g>
      </svg>
    </div>
  );
};

const StepVisuals = [ProblemVisual, ShiftVisual, SolutionVisual, InfrastructureVisual];

// ============================================
// FILM STRIP PROGRESS BAR
// ============================================

const FilmStripProgress = ({ 
  activeStep, 
  totalSteps, 
  onStepClick 
}: { 
  activeStep: number; 
  totalSteps: number;
  onStepClick?: (step: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-gray-100/50">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center">
          {/* Frame */}
          <button
            onClick={() => onStepClick?.(i)}
            className={`
              w-8 h-6 rounded border-2 flex items-center justify-center transition-all duration-500 relative cursor-pointer hover:scale-105
              ${i === activeStep 
                ? 'border-foreground bg-foreground text-white scale-110 shadow-[0_0_12px_rgba(0,0,0,0.2)]' 
                : i < activeStep 
                  ? 'border-foreground/50 bg-foreground/10 text-foreground/50 scale-100 hover:bg-foreground/20' 
                  : 'border-gray-200 bg-gray-50 text-gray-300 scale-100 hover:bg-gray-100'
              }
            `}
            style={{
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {i === activeStep && (
              <div className="absolute inset-0 rounded border-foreground/30 animate-pulse-glow" />
            )}
            <span className="text-[10px] font-bold relative z-10">{String(i + 1).padStart(2, '0')}</span>
          </button>
          {/* Connector */}
          {i < totalSteps - 1 && (
            <div 
              className={`h-0.5 transition-all duration-500 ${
                i < activeStep 
                  ? 'bg-foreground/50 w-4' 
                  : i === activeStep - 1
                    ? 'bg-gradient-to-r from-foreground/50 to-gray-200 w-4'
                    : 'bg-gray-200 w-4'
              }`}
              style={{
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// ============================================
// STEP CONTENT - Text that slides in with unique effects
// ============================================

const StepContent = ({ 
  step, 
  isActive, 
  direction,
  index
}: { 
  step: typeof steps[0]; 
  isActive: boolean; 
  direction: 'enter' | 'exit' | 'idle';
  index: number;
}) => {
  // diverse transition styles based on index
  const getTransitionStyle = () => {
    if (isActive) return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0';
    
    // Step 0: Slide Up/Down
    if (index === 0) return direction === 'enter' ? 'opacity-0 translate-y-10' : 'opacity-0 -translate-y-10';
    
    // Step 1: Scale (Zoom)
    if (index === 1) return direction === 'enter' ? 'opacity-0 scale-90' : 'opacity-0 scale-110';
    
    // Step 2: Slide Side (Wipe)
    if (index === 2) return direction === 'enter' ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20';
    
    // Step 3: Blur Reveal
    if (index === 3) return 'opacity-0 blur-md scale-95';
    
    return 'opacity-0';
  };

  // Adjust padding based on position - less padding on center side
  const paddingClass = index % 2 === 0 
    ? 'pl-8 lg:pl-12 pr-4 lg:pr-6' // Even steps: text on left, less padding on right (center side)
    : 'pl-4 lg:pl-6 pr-8 lg:pr-12'; // Odd steps: text on right, less padding on left (center side)

  return (
    <div 
      className={`
        absolute inset-0 flex flex-col justify-center ${paddingClass}
        transition-all duration-700 ease-out
        ${getTransitionStyle()}
      `}
    >
      {/* Step number */}
      <div 
        className="flex items-center gap-3 mb-4"
        style={{ 
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isActive ? '0ms' : '0ms',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(-10px)'
        }}
      >
        <span className="text-sm font-bold tracking-[0.2em] text-foreground">{step.number}</span>
        <span className="w-8 h-px bg-foreground/30" />
        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{step.title}</span>
      </div>
      
      {/* Headline */}
      <h3 
        className="text-2xl lg:text-4xl font-bold text-foreground leading-tight mb-4"
        style={{ 
          transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isActive ? '100ms' : '0ms',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(15px)'
        }}
      >
        {step.boldStart}
      </h3>
      
      {/* Description */}
      <p 
        className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 max-w-md"
        style={{ 
          transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isActive ? '200ms' : '0ms',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(15px)'
        }}
      >
        {step.description.replace(step.boldStart, '').trim()}
      </p>
      
      {/* KPI */}
      <div 
        className="flex items-baseline gap-3"
        style={{ 
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isActive ? '300ms' : '0ms',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
        }}
      >
        <span className="text-4xl lg:text-5xl font-bold text-foreground">{step.kpi.value}</span>
        <span className="text-sm text-muted-foreground">{step.kpi.label}</span>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const HowItWorksSimple = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isManualScrollingRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [showOverview, setShowOverview] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = useCallback(() => {
    // Skip if we're manually scrolling
    if (isManualScrollingRef.current) return;
    
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    // Calculate how far we've scrolled through the section
    const scrolled = -rect.top;
    const totalScrollable = sectionHeight - viewportHeight;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    
    setScrollProgress(progress);
    
    // Remove overview completely - start directly with step 0
    setShowOverview(false);
    
    // Calculate active step (distribute evenly across scroll)
    const step = Math.min(3, Math.floor(progress * 4));
    setActiveStep(step);
  }, []);


  const scrollToStep = useCallback((step: number) => {
    if (!sectionRef.current) return;
    
    // Set flag to prevent scroll handler from interfering
    isManualScrollingRef.current = true;
    
    const sectionHeight = sectionRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollable = sectionHeight - viewportHeight;
    
    // Calculate target scroll position for this step
    // Steps are distributed evenly: 0 = 0%, 1 = 25%, 2 = 50%, 3 = 75%
    // Center each step in its viewport
    const targetProgress = Math.min(1, (step + 0.5) / 4);
    const targetScroll = targetProgress * totalScrollable;
    
    // Get current position of section
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    
    // Update active step immediately for visual feedback
    setActiveStep(step);
    
    // Scroll to target position
    window.scrollTo({
      top: sectionTop + targetScroll,
      behavior: 'smooth'
    });
    
    // Re-enable scroll handler after animation completes
    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Mobile layout
  if (isMobile) {
    return (
      <section id="how-it-works" className="relative bg-[#F8F8F8] py-12">
        <div className="max-w-2xl mx-auto px-4">
          {steps.map((step, index) => {
            const VisualComponent = StepVisuals[index];
            return (
              <div key={step.number} className="py-8 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-bold tracking-[0.2em]">{step.number}</span>
                  <span className="w-6 h-px bg-foreground/30" />
                  <span className="text-sm uppercase tracking-wider text-muted-foreground">{step.title}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.boldStart}</h3>
                <p className="text-muted-foreground mb-4">{step.description.replace(step.boldStart, '').trim()}</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold">{step.kpi.value}</span>
                  <span className="text-sm text-muted-foreground">{step.kpi.label}</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-[280px] overflow-hidden">
                  <VisualComponent isActive={true} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Desktop cinematic layout
  return (
    <section 
      ref={sectionRef}
      id="how-it-works" 
      className="relative bg-[#F8F8F8]"
      style={{ height: '400vh' }} // Tall section for scroll
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          
          {/* TEXT Container - Moves Left/Right */}
          <div 
            className="absolute top-0 h-full bg-[#F8F8F8] transition-all duration-700 ease-in-out z-10 flex flex-col justify-center"
            style={{
              width: '50%',
              left: activeStep % 2 === 0 ? '0%' : '50%',
              borderRight: activeStep % 2 === 0 ? '1px solid #f3f4f6' : 'none',
              borderLeft: activeStep % 2 !== 0 ? '1px solid #f3f4f6' : 'none',
              willChange: 'left',
              transform: 'translateZ(0)',
            }}
          >
            {steps.map((step, index) => (
              <StepContent 
                key={step.number}
                step={step}
                isActive={activeStep === index}
                direction={activeStep > index ? 'exit' : activeStep < index ? 'enter' : 'idle'}
                index={index}
              />
            ))}
          </div>

          {/* VISUAL Container - Moves Right/Left */}
          <div 
            className="absolute top-0 h-full bg-white transition-all duration-700 ease-in-out flex items-center justify-center overflow-hidden"
            style={{
              width: '50%',
              left: activeStep % 2 === 0 ? '50%' : '0%',
              willChange: 'left',
              transform: 'translateZ(0)',
            }}
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(#3D3D3D 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
            
            {/* Visual morphing area with floating effect */}
            {steps.map((_, index) => {
              const VisualComponent = StepVisuals[index];
              const isActive = activeStep === index;
              return (
                <div 
                  key={index}
                  className={`
                    absolute inset-0 flex items-center justify-center p-6 lg:p-8
                    transition-all duration-700 ease-out
                    ${isActive ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-sm pointer-events-none'}
                  `}
                  style={{
                    willChange: isActive ? 'transform, opacity' : 'auto',
                    transform: 'translateZ(0)',
                    contentVisibility: isActive ? 'auto' : 'hidden',
                  }}
                >
                  <div 
                    className={`
                      w-full h-full flex items-center justify-center overflow-hidden
                      rounded-2xl border border-gray-100/50
                      shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                      backdrop-blur-sm bg-white/95
                      ${isActive ? 'animate-float' : ''}
                    `}
                    style={{
                      transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      willChange: isActive ? 'transform, opacity' : 'auto',
                      transform: 'translateZ(0)',
                    }}
                  >
                    <VisualComponent isActive={isActive} />
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
        
        {/* Film Strip Progress - Bottom center */}
        <div 
          className={`
            absolute bottom-8 left-1/2 -translate-x-1/2 z-30
            transition-all duration-500
            opacity-100 translate-y-0
            flex flex-col items-center gap-3
          `}
        >
          <FilmStripProgress activeStep={activeStep} totalSteps={steps.length} onStepClick={scrollToStep} />
          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-1 animate-bounce-subtle">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Scroll</span>
            <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: translate(calc(-50% + var(--x, 0px)), calc(-50% + var(--y, 0px))) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(calc(-50% + var(--x, 0px)), calc(-50% + var(--y, 0px))) scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes draw-line-0 {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-line-1 {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-line-2 {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-line-right-0 {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-line-right-1 {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-line-right-2 {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-direct-to-gravity-left {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-gravity-right-to-ai-app {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
};
