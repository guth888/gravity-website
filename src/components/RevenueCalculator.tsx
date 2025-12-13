import { useState, useRef, useCallback } from "react";

const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    const billions = num / 1000000000;
    return billions % 1 === 0 ? `${billions}B` : `${billions.toFixed(1)}B`;
  }
  if (num >= 1000000) {
    const millions = num / 1000000;
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
  }
  if (num >= 1000) {
    const thousands = num / 1000;
    return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(0)}K`;
  }
  return num.toString();
};

const formatCurrency = (num: number): string => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(1)}K`;
  }
  return `$${num.toFixed(0)}`;
};

export const RevenueCalculator = () => {
  const [messages, setMessages] = useState(10000000); // Default 10M messages (middle of slider)
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const MIN_MESSAGES = 100000;       // 100K (so 10M is at exact middle)
  const MAX_MESSAGES = 1000000000;   // 1B
  const LOW_CPM = 6;    // $6 per 1000 queries
  const MID_CPM = 20;   // $20 per 1000 queries
  const HIGH_CPM = 150; // $150 per 1000 queries

  // Calculate earnings
  const lowEarnings = (messages / 1000) * LOW_CPM;
  const midEarnings = (messages / 1000) * MID_CPM;
  const highEarnings = (messages / 1000) * HIGH_CPM;

  // Calculate slider percentage
  const getPercentage = (value: number): number => {
    // Use logarithmic scale for better UX with large range
    const minLog = Math.log10(MIN_MESSAGES);
    const maxLog = Math.log10(MAX_MESSAGES);
    const valueLog = Math.log10(value);
    return ((valueLog - minLog) / (maxLog - minLog)) * 100;
  };

  const getValueFromPercentage = (percentage: number): number => {
    const minLog = Math.log10(MIN_MESSAGES);
    const maxLog = Math.log10(MAX_MESSAGES);
    const valueLog = minLog + (percentage / 100) * (maxLog - minLog);
    return Math.round(Math.pow(10, valueLog));
  };

  const percentage = getPercentage(messages);

  const handleSliderInteraction = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = getValueFromPercentage(newPercentage);
    setMessages(Math.max(MIN_MESSAGES, Math.min(MAX_MESSAGES, newValue)));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleSliderInteraction(e.clientX);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleSliderInteraction(e.clientX);
      }
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    handleSliderInteraction(e.touches[0].clientX);
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        handleSliderInteraction(e.touches[0].clientX);
      }
    };
    
    const handleTouchEnd = () => {
      isDragging.current = false;
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
    
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Main Stat Display */}
      <div className="text-center mb-8">
        <h2 
          className="text-7xl sm:text-8xl md:text-9xl font-bold text-white mb-2"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}
        >
          {formatNumber(messages)}
        </h2>
        <p className="text-gray-400 text-lg">queries per month</p>
      </div>

      {/* Slider */}
      <div className="mb-12">
        <div
          ref={sliderRef}
          className="relative h-12 rounded-lg overflow-hidden cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Background track */}
          <div className="absolute inset-0 bg-[#2a2a2a] rounded-lg" />
          
          {/* Filled track */}
          <div
            className="absolute inset-y-0 left-0 bg-blue-500/80 rounded-l-lg transition-none"
            style={{ width: `${percentage}%` }}
          />
          
          {/* Drag handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full shadow-lg transition-none"
            style={{ left: `calc(${percentage}% - 2px)` }}
          />
        </div>
        
        {/* Slider Labels */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
          <span>100K</span>
          <span className="uppercase tracking-wider text-xs">Drag</span>
          <span>1B</span>
        </div>
      </div>

      {/* Earnings Display */}
      <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
        {/* Left: Earning potential */}
        <div className="border-l-2 border-white/20 pl-6">
          <p className="text-gray-400 text-sm mb-2">Your earning potential</p>
          <div className="flex items-baseline gap-2">
            <span 
              className="text-5xl sm:text-6xl font-bold text-white"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              {formatCurrency(lowEarnings)} - {formatCurrency(highEarnings)}
            </span>
            <span className="text-gray-400 text-lg">per month</span>
          </div>
        </div>
        
        {/* Right: Stats */}
        <div className="space-y-4 border-l-2 border-white/10 pl-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Low estimate (${LOW_CPM} CPM):</span>
            <span className="text-white font-semibold">{formatCurrency(lowEarnings)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Mid estimate (${MID_CPM} CPM):</span>
            <span className="text-white font-semibold">{formatCurrency(midEarnings)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">High estimate (${HIGH_CPM} CPM):</span>
            <span className="text-white font-semibold">{formatCurrency(highEarnings)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

