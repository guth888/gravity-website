import { motion } from "framer-motion";

// Layer data structure
interface Layer {
  id: string;
  label: string;
  title: string;
  description: string;
  visualType: 'problem' | 'shift' | 'solution' | 'future';
}

const layers: Layer[] = [
  {
    id: "01",
    label: "Layer 01",
    title: "The Problem: LLM attention is unmonetized",
    description: "The old ad formats don't fit the new world. Users no longer browse — they ask, compare, and decide inside LLMs. Traditional display ads are skipped 73% of the time.",
    visualType: 'problem'
  },
  {
    id: "02",
    label: "Layer 02",
    title: "The Shift: Billions of high-intent micro-decisions",
    description: "Billions of high-intent micro-decisions happen inside LLM chats every day. This is where brands need to be. Over 4B+ daily LLM queries represent untapped commercial intent.",
    visualType: 'shift'
  },
  {
    id: "03",
    label: "Layer 03",
    title: "The Solution: Native, high-intent suggestions",
    description: "Show up inside the answer. Gravity inserts a native, high-intent suggestion right when the user is deciding. Average CTR of 12% — 35x higher than traditional display.",
    visualType: 'solution'
  },
  {
    id: "04",
    label: "Layer 04",
    title: "The Future: The next ad channel is live",
    description: "The next ad channel is live. Gravity lets you connect to it today. Infrastructure that reduces CAC by 40% while maintaining premium UX standards.",
    visualType: 'future'
  }
];

// Visual Components (adapted for dark backgrounds)
const ProblemVisual = () => {
  const bubbleData = [
    { x: -85, y: -35, text: "Best CRM?" },
    { x: 85, y: -35, text: "Compare prices" },
    { x: -85, y: 35, text: "Movie recs" },
    { x: 85, y: 35, text: "Gift ideas" },
    { x: 0, y: -55, text: "Top AI tools" },
    { x: 0, y: 55, text: "Learn Python" },
    { x: -110, y: 0, text: "Plan trip" },
    { x: 110, y: 0, text: "Invest 10k?" },
    { x: -135, y: -50, text: "Hotel Paris" },
    { x: -145, y: 25, text: "Stock tips" },
    { x: 135, y: -50, text: "Debug code" },
    { x: 145, y: 25, text: "Buy laptop" },
    { x: -60, y: -80, text: "Recipe ideas" },
    { x: 60, y: -80, text: "Fix resume" },
    { x: -60, y: 80, text: "Diet plan" },
    { x: 60, y: 80, text: "Write essay" },
    { x: -170, y: -20, text: "Chinese food" },
    { x: 170, y: -20, text: "Wedding speech" },
    { x: 0, y: -100, text: "Tokyo trip" },
    { x: 0, y: 100, text: "Best phone?" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full min-h-[400px] overflow-hidden">
        {/* Center icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center shadow-2xl border-4 border-white">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
        
        {/* Bubbles */}
        {bubbleData.map((b, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ 
              transform: `translate(calc(-50% + ${b.x}px), calc(-50% + ${b.y}px))`,
            }}
          >
            <div className="px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-xs font-medium text-gray-600 whitespace-nowrap">
              {b.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShiftVisual = () => {
  const queries = [
    { left: '18%', top: '22%', text: "Best CRM?" },
    { left: '15%', top: '45%', text: "Compare prices" },
    { left: '20%', top: '70%', text: "Buy laptop" },
    { left: '17%', top: '82%', text: "Movie recs" },
    { left: '82%', top: '25%', text: "Invest 10k?" },
    { left: '85%', top: '50%', text: "Plan trip" },
    { left: '83%', top: '75%', text: "Learn Python" },
    { left: '84%', top: '18%', text: "Gift ideas" },
    { left: '42%', top: '15%', text: "Debug code" },
    { left: '58%', top: '16%', text: "Diet plan" },
    { left: '38%', top: '85%', text: "Hotel Paris" },
    { left: '58%', top: '86%', text: "Stock tips" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] overflow-hidden">
      {/* Globe */}
      <div className="w-[400px] h-[400px] max-w-[90%] max-h-[90%] relative flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0">
          <defs>
            <radialGradient id="globeGlowStacked" cx="30%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#3D3D3D" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3D3D3D" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main sphere */}
          <circle cx="200" cy="200" r="187" fill="url(#globeGlowStacked)" />
          <circle cx="200" cy="200" r="187" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.15" />
          
          {/* Latitude lines */}
          <ellipse cx="200" cy="200" rx="187" ry="67" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          <ellipse cx="200" cy="200" rx="187" ry="133" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          <line x1="13" y1="200" x2="387" y2="200" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          
          {/* Longitude lines */}
          <ellipse cx="200" cy="200" rx="67" ry="187" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          <ellipse cx="200" cy="200" rx="133" ry="187" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          <line x1="200" y1="13" x2="200" y2="387" stroke="#3D3D3D" strokeWidth="1" opacity="0.1" />
          
          {/* Glowing activity dots */}
          <g>
            {[
              { cx: 100, cy: 133 }, { cx: 80, cy: 187 }, 
              { cx: 120, cy: 233 }, { cx: 93, cy: 280 },
              { cx: 300, cy: 147 }, { cx: 320, cy: 200 },
              { cx: 293, cy: 253 }, { cx: 307, cy: 100 },
              { cx: 200, cy: 80 }, { cx: 200, cy: 320 },
              { cx: 147, cy: 100 }, { cx: 253, cy: 300 }
            ].map((pos, i) => (
              <circle key={i} cx={pos.cx} cy={pos.cy} r="5" fill="#3D3D3D" opacity="0.5" filter="url(#glow)">
                <animate attributeName="r" values="4;7;4" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        </svg>
      </div>
      
      {/* Floating query labels */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {queries.map((q, i) => (
          <div
            key={i}
            className="absolute"
            style={{ 
              left: q.left,
              top: q.top,
              transform: 'translate(-50%, -50%)',
              animation: `fadeInUp 0.5s ease-out ${i * 50}ms forwards`
            }}
          >
            <span className="px-3 py-1.5 bg-white backdrop-blur-sm rounded-lg border border-gray-100 text-xs font-medium text-gray-600 whitespace-nowrap shadow-sm">
              {q.text}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, -40%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </div>
  );
};

const SolutionVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
          <div className="w-4 h-4 rounded-full bg-foreground" />
          <span className="text-sm font-medium text-foreground">AI Assistant</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-end">
            <div className="bg-foreground text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
              <p className="text-sm">Best project management tool for a remote team?</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
              <p className="text-sm text-foreground/80 mb-2">For remote teams, I'd recommend:</p>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>• Notion</span>
                <span>• Asana</span>
                <span>• Monday</span>
              </div>
            </div>
          </div>
          <div className="opacity-100 translate-y-0 transition-all duration-700" style={{ transitionDelay: '300ms' }}>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-4 py-3 flex items-start justify-between gap-3">
              <p className="text-sm text-foreground/90">
                <span className="font-bold text-emerald-600">Linear</span> is worth checking out—built for fast-moving teams with async workflows.
              </p>
              <span className="text-xs font-semibold text-emerald-500 whitespace-nowrap bg-emerald-100 px-2 py-0.5 rounded">Sponsored</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FutureVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
      <svg className="w-full max-w-[500px] h-[240px]" viewBox="0 0 500 240">
        <defs>
          <linearGradient id="lineGradLeftStacked" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3D3D3D" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3D3D3D" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="lineGradRightStacked" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
          <filter id="shadowStacked" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        <text x="60" y="25" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280" letterSpacing="0.1em">DEMAND</text>
        
        {/* Left nodes */}
        {['DSP', 'Direct', 'Agency'].map((label, i) => (
          <g key={label}>
            <path d={`M 110 ${60 + i * 60} Q 170 ${60 + i * 60} 200 120`} fill="none" stroke="url(#lineGradLeftStacked)" strokeWidth="2" />
            <g filter="url(#shadowStacked)">
              <rect x="20" y={45 + i * 60} width="90" height="32" rx="6" fill="white" stroke="#3D3D3D" strokeWidth="2" />
              <text x="65" y={66 + i * 60} textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="600">{label}</text>
            </g>
          </g>
        ))}
        
        {/* Center - Gravity hub */}
        <g transform="translate(250, 120)">
          <circle r="55" fill="none" stroke="#3D3D3D" strokeWidth="1" opacity="0.2">
            <animate attributeName="r" values="45;60" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="48" fill="#3D3D3D" fillOpacity="0.05" />
          <circle r="42" fill="white" stroke="#3D3D3D" strokeWidth="2.5" filter="url(#shadowStacked)" />
          <text y="-4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3D3D3D" letterSpacing="0.05em">GRAVITY</text>
          <text y="10" textAnchor="middle" fontSize="8" fontWeight="500" fill="#6b7280">AD NETWORK</text>
        </g>
        
        <text x="440" y="25" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280" letterSpacing="0.1em">SUPPLY</text>
        
        {/* Right nodes */}
        {['AI Chat', 'AI App', 'Agent'].map((label, i) => (
          <g key={label}>
            <path d={`M 300 120 Q 330 ${60 + i * 60} 390 ${60 + i * 60}`} fill="none" stroke="url(#lineGradRightStacked)" strokeWidth="2" />
            <g filter="url(#shadowStacked)">
              <rect x="390" y={45 + i * 60} width="90" height="32" rx="6" fill="white" stroke="#10b981" strokeWidth="2" />
              <text x="435" y={66 + i * 60} textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="600">{label}</text>
            </g>
          </g>
        ))}
        
        {/* Animated dots on paths */}
        {[0, 1, 2].map((i) => (
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
      </svg>
    </div>
  );
};

// Visual component mapper
const renderVisual = (visualType: Layer['visualType']) => {
  switch (visualType) {
    case 'problem':
      return <ProblemVisual />;
    case 'shift':
      return <ShiftVisual />;
    case 'solution':
      return <SolutionVisual />;
    case 'future':
      return <FutureVisual />;
    default:
      return null;
  }
};

export const StackedLayersSection = () => {
  // Progressive shadow depths for each layer
  const shadowClasses = [
    'shadow-[0_8px_30px_rgba(0,0,0,0.12)]',
    'shadow-[0_12px_40px_rgba(0,0,0,0.15)]',
    'shadow-[0_16px_50px_rgba(0,0,0,0.18)]',
    'shadow-[0_20px_60px_rgba(0,0,0,0.22)]',
  ];

  // Overlap amounts (significant overlap for stack effect)
  const overlapClasses = ['', '-mt-32', '-mt-36', '-mt-40'];

  return (
    <section className="relative w-full bg-background py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-0 relative">
          {layers.map((layer, index) => (
            <motion.article
              key={layer.id}
              initial={{ 
                opacity: 0.3, 
                y: 60, 
                scale: 0.94
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for mechanical feel
              }}
              viewport={{ once: true, amount: 0.4 }}
              className={`
                relative flex flex-col rounded-3xl 
                border border-gray-200/60 
                bg-white/90 backdrop-blur-md
                ${shadowClasses[index]}
                ${overlapClasses[index]}
                overflow-hidden
              `}
              style={{ 
                minHeight: '600px',
                zIndex: index + 1 // Later cards sit above earlier ones
              }}
            >
              {/* Top reflection line for glass effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
              
              {/* Grid texture overlay */}
              <div 
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />
              
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 pointer-events-none" style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.05)'
              }} />
              
              {/* Visual Panel - 60% */}
              <div className="relative flex-[0_0_60%] min-h-[400px] bg-gradient-to-br from-gray-50/50 to-white/80 z-0">
                {renderVisual(layer.visualType)}
              </div>
              
              {/* Text Panel - 40% */}
              <div className="relative flex-[0_0_40%] px-8 lg:px-12 py-8 lg:py-10 bg-white/80 backdrop-blur-sm z-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{layer.label}</span>
                  <span className="w-8 h-px bg-gray-200" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-4">
                  {layer.title}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {layer.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackedLayersSection;

