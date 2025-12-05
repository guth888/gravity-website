import { useState, useEffect, useCallback } from "react";

// Import publisher logos
import iaskLogo from "@/assets/publishers/iask.png";
import rampLogo from "@/assets/publishers/ramp.png";
import ampCodeLogo from "@/assets/publishers/sourcegraph.svg";

interface PublisherSlide {
  name: string;
  type: string;
  logo: string;
  secondaryLogo?: string;
}

const publisherSlides: PublisherSlide[] = [
  { 
    name: "iAsk", 
    type: "Search/Chat Hybrid",
    logo: iaskLogo,
  },
  { 
    name: "Ramp", 
    type: "Productivity Tools & Copilots",
    logo: rampLogo,
  },
  { 
    name: "Amp Code", 
    type: "Developer Tools & IDEs",
    logo: ampCodeLogo,
  },
];

export const PublisherCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % publisherSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
        {/* Slides */}
        {publisherSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === (activeIndex - 1 + publisherSlides.length) % publisherSlides.length;
          const isNext = index === (activeIndex + 1) % publisherSlides.length;
          
          let transform = "translateX(100%) scale(0.85)";
          let opacity = "0";
          let zIndex = 0;
          
          if (isActive) {
            transform = "translateX(0) scale(1)";
            opacity = "1";
            zIndex = 20;
          } else if (isPrev) {
            transform = "translateX(-30%) scale(0.85)";
            opacity = "0.4";
            zIndex = 10;
          } else if (isNext) {
            transform = "translateX(30%) scale(0.85)";
            opacity = "0.4";
            zIndex = 10;
          }

          return (
            <div
              key={slide.name}
              className={`absolute inset-0 transition-all duration-700 ease-out`}
              style={{
                transform,
                opacity,
                zIndex,
              }}
            >
              {/* Card */}
              <div className="h-full w-full rounded-2xl bg-[#111111] p-8 flex flex-col items-center justify-center relative overflow-hidden border border-white/5">
                {/* Center Content - Logo and Category */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Logo Container */}
                  <div className={`${slide.secondaryLogo ? 'w-56 h-72 lg:w-80 lg:h-96' : 'w-56 h-56 lg:w-80 lg:h-80'} rounded-3xl bg-[#1a1a1a] flex flex-col items-center justify-center mb-8 border border-white/10 p-6`}>
                    {/* Main Logo */}
                    <img 
                      src={slide.logo} 
                      alt={slide.name} 
                      className={`${slide.secondaryLogo ? 'w-36 h-36 lg:w-52 lg:h-52' : 'w-48 h-48 lg:w-72 lg:h-72'} object-contain brightness-0 invert`}
                    />
                    
                    {/* Secondary Logo - About 1/5 of main logo */}
                    {slide.secondaryLogo && (
                      <img 
                        src={slide.secondaryLogo} 
                        alt="Partner" 
                        className="w-40 h-16 lg:w-52 lg:h-20 object-contain brightness-0 invert mt-8"
                      />
                    )}
                  </div>
                  
                  {/* Category */}
                  <p className="text-lg lg:text-xl text-white/50">{slide.type}</p>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {publisherSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex 
                ? "w-8 h-2 bg-white" 
                : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

