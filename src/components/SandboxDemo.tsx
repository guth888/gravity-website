import { useState, useEffect, useRef } from "react";
import { MessageSquare, Star, Hotel, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { toast } from "@/hooks/use-toast";

interface AdData {
  type: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  priceLabel?: string;
  availability: string;
  features: string[];
  cta: string;
}

interface Scenario {
  id: string;
  label: string;
  icon: typeof Hotel;
  llm: string;
  userMessage: string;
  aiResponse: string;
  adData: AdData;
}

const scenarios: Scenario[] = [
  {
    id: 'travel',
    label: 'Travel',
    icon: Hotel,
    llm: 'ChatGPT',
    userMessage: "I'm looking for hotels in Miami Beach for next weekend with ocean views under $300/night",
    aiResponse: "I found several great options for you in Miami Beach with ocean views. Here's a top pick that matches your budget and preferences:",
    adData: {
      type: 'hotel',
      name: 'Surfside Ocean Suites',
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 1247,
      price: 289,
      originalPrice: 349,
      availability: '2 rooms left at this price',
      features: ['Ocean view', 'Free breakfast', 'Pool access'],
      cta: 'Book Now'
    }
  },
  {
    id: 'fashion',
    label: 'Fashion',
    icon: ShoppingBag,
    llm: 'ChatGPT',
    userMessage: "I need a versatile black leather jacket for fall, budget around $200-300",
    aiResponse: "Here's an excellent leather jacket that matches your style and budget perfectly:",
    adData: {
      type: 'product',
      name: 'Modern Moto Jacket - Genuine Leather',
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 892,
      price: 279,
      originalPrice: 425,
      availability: 'Limited stock - 8 left in M',
      features: ['Genuine leather', 'Free returns', '2-year warranty'],
      cta: 'Add to Cart'
    }
  },
  {
    id: 'dining',
    label: 'Dining',
    icon: UtensilsCrossed,
    llm: 'ChatGPT',
    userMessage: "Best Italian restaurants in Brooklyn with outdoor seating for tonight at 7pm, party of 4?",
    aiResponse: "I've found a fantastic Italian spot in Brooklyn with availability and outdoor seating:",
    adData: {
      type: 'reservation',
      name: 'Trattoria Bella Vista',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 2103,
      price: 45,
      priceLabel: 'avg per person',
      availability: '7:15pm available (last table)',
      features: ['Patio seating', 'Wine bar', "Chef's tasting menu"],
      cta: 'Reserve Table'
    }
  }
];

type AnimationStep = 'idle' | 'user-message' | 'typing' | 'ai-response' | 'show-ad' | 'hold';

export const SandboxDemo = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [animationStep, setAnimationStep] = useState<AnimationStep>('idle');
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [startAiTyping, setStartAiTyping] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const scenario = scenarios[activeScenario];
  const { displayedText: aiText, isComplete: aiTypingComplete } = useTypingEffect(
    scenario.aiResponse,
    30,
    startAiTyping
  );

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation sequence controller
  useEffect(() => {
    if (!isInView || isPaused) return;

    const runSequence = async () => {
      // Reset
      setShowUserMessage(false);
      setShowTyping(false);
      setStartAiTyping(false);
      setShowAd(false);
      setAnimationStep('idle');

      await delay(500);

      // Step 1: User message
      setAnimationStep('user-message');
      setShowUserMessage(true);
      await delay(1000);

      // Step 2: Typing indicator
      setAnimationStep('typing');
      setShowTyping(true);
      await delay(1500);

      // Step 3: AI response typing
      setAnimationStep('ai-response');
      setShowTyping(false);
      setStartAiTyping(true);
      await delay(scenario.aiResponse.length * 30 + 500);

      // Step 4: Show ad
      setAnimationStep('show-ad');
      setShowAd(true);
      await delay(3500);

      // Step 5: Hold
      setAnimationStep('hold');
      await delay(1000);

      // Next scenario
      setActiveScenario((prev) => (prev + 1) % scenarios.length);
    };

    timeoutRef.current = setTimeout(() => runSequence(), 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeScenario, isInView, isPaused, scenario.aiResponse.length]);

  const handleScenarioClick = (index: number) => {
    if (index === activeScenario) return;
    setIsPaused(true);
    setActiveScenario(index);
    setTimeout(() => setIsPaused(false), 100);
  };

  const handleAdClick = () => {
    toast({
      title: "Demo Mode",
      description: `In production, this would open the ${scenario.adData.type} booking flow.`,
    });
  };

  return (
    <section 
      id="sandbox-demo"
      ref={containerRef}
      className="relative py-36 px-6 bg-background overflow-hidden"
    >
      {/* Star Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#FF4C1E]/[0.01] rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-gravity-orange text-white text-sm font-medium mb-6 uppercase tracking-[0.08em]">
            SANDBOX PREVIEWS
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            See It Before You Spend It
          </h2>
          <p className="text-lg md:text-xl text-[#9EA2B1] max-w-2xl mx-auto leading-relaxed">
            Watch how GRAVITY ads blend seamlessly into real LLM conversations. 
            <span className="font-semibold text-foreground"> Pixel-perfect, context-aware, and objectively better than organic.</span>
          </p>
        </div>

        {/* Scenario Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {scenarios.map((s, index) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => handleScenarioClick(index)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300
                  ${activeScenario === index
                    ? 'bg-gravity-orange text-white shadow-[0_0_20px_rgba(255,76,30,0.3)]'
                    : 'bg-white/[0.06] text-white hover:bg-white/[0.08]'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Phone Demo */}
        <div className="flex justify-center">
          <div className="relative mx-auto" style={{ width: '375px', height: '812px' }}>
            {/* Outer bezel */}
            <div className="absolute inset-0 rounded-[60px] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-2xl p-3">
              {/* Screen */}
              <div className="relative h-[812px] w-full rounded-[50px] overflow-hidden bg-[#343541]">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />
                
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 text-white text-xs z-40">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-3 border border-white rounded-sm" />
                  </div>
                </div>

                {/* Content */}
                <div className="h-full flex flex-col pt-12">
                  {/* ChatGPT Header */}
                  <div className="bg-[#343541] px-4 py-3 flex items-center gap-3 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-[#10a37f] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">ChatGPT</span>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                    {/* User Message */}
                    {showUserMessage && (
                      <div className="flex justify-end animate-fade-in-up">
                        <div className="max-w-[80%] bg-[#2f2f2f] text-white rounded-2xl rounded-tr-sm px-4 py-3">
                          <p className="text-sm leading-relaxed">{scenario.userMessage}</p>
                        </div>
                      </div>
                    )}

                    {/* Typing Indicator */}
                    {showTyping && (
                      <div className="flex gap-2 items-start animate-fade-in-up">
                        <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-[#444654] rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI Response */}
                    {startAiTyping && (
                      <div className="flex gap-2 items-start animate-fade-in-up">
                        <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="max-w-[85%]">
                          <div className="bg-[#444654] text-white rounded-2xl rounded-tl-sm px-4 py-3 mb-3">
                            <p className="text-sm leading-relaxed">{aiText}</p>
                          </div>

                          {/* Gravity Ad Card */}
                          {showAd && (
                            <div 
                              onClick={handleAdClick}
                              className="rounded-2xl overflow-hidden border border-[#FF4C1E]/30 bg-gradient-to-br from-[#FF4C1E]/10 to-transparent backdrop-blur-sm hover:border-[#FF4C1E]/50 hover:shadow-lg hover:shadow-[#FF4C1E]/20 transition-all duration-300 cursor-pointer animate-fade-in-up"
                            >
                              {/* Image */}
                              <img 
                                src={scenario.adData.image} 
                                alt={scenario.adData.name}
                                className="w-full h-40 object-cover bg-gradient-to-br from-gray-700 to-gray-800"
                              />
                              
                              {/* Content */}
                              <div className="p-3">
                                {/* Sponsored Badge */}
                                <span className="text-[9px] text-gravity-text-subtle uppercase tracking-wide">Sponsored</span>
                                
                                {/* Title & Rating */}
                                <h3 className="text-sm font-semibold mt-1 text-foreground">{scenario.adData.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-medium ml-1 text-foreground">{scenario.adData.rating}</span>
                                  </div>
                                  <span className="text-[10px] text-gravity-text-subtle">
                                    ({scenario.adData.reviews.toLocaleString()} reviews)
                                  </span>
                                </div>
                                
                                {/* Features */}
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {scenario.adData.features.map(f => (
                                    <span 
                                      key={f} 
                                      className="text-[10px] bg-[#FF4C1E]/20 text-[#FF4C1E] px-2 py-0.5 rounded-full"
                                    >
                                      {f}
                                    </span>
                                  ))}
                                </div>
                                
                                {/* Pricing & CTA */}
                                <div className="flex items-end justify-between mt-3">
                                  <div>
                                    <div className="flex items-baseline gap-1.5">
                                      <span className="text-xl font-bold text-foreground">
                                        ${scenario.adData.price}
                                      </span>
                                      {scenario.adData.originalPrice && (
                                        <span className="text-xs text-gravity-text-subtle line-through">
                                          ${scenario.adData.originalPrice}
                                        </span>
                                      )}
                                      {scenario.adData.priceLabel && (
                                        <span className="text-[10px] text-gravity-text-subtle">
                                          {scenario.adData.priceLabel}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-[#FF4C1E] font-medium mt-0.5">
                                      {scenario.adData.availability}
                                    </p>
                                  </div>
                                  
                                  {/* CTA Button */}
                                  <button className="px-4 py-2 bg-[#FF4C1E] text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FF4C1E]/30 transition-all duration-200">
                                    {scenario.adData.cta}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-sm text-[#9EA2B1] italic mb-4">
            This is a 1:1 preview of how your ad appears in ChatGPT. No guessing. No surprises.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4C1E]/10 border border-[#FF4C1E]/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#FF4C1E]" />
            <span className="text-xs font-semibold text-foreground">Pixel-Perfect Preview Technology</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
