import { useEffect, useState } from "react";

// Import brand logos
import doordashLogo from "@/assets/advertisers/doordash.png";
import flaxlabsLogo from "@/assets/advertisers/flaxlabs.png";
import verveLogo from "@/assets/advertisers/verve.png";
import layersLogo from "@/assets/advertisers/layers.png";
import reachhLogo from "@/assets/advertisers/reachh-digital.png";
import revylLogo from "@/assets/advertisers/revyl.png";

interface BrandCard {
  name: string;
  logo?: string;
  initial?: string;
  color: string;
  stat: string;
  statLabel: string;
  featured?: boolean;
  logoScale?: number;
}

const brandCards: BrandCard[] = [
  { name: "DoorDash", logo: doordashLogo, color: "#FF3008", stat: "+8%", statLabel: "conversion lift", featured: true, logoScale: 1.0 },
  { name: "Flaxlabs", logo: flaxlabsLogo, color: "#10B981", stat: "1.2M", statLabel: "impressions", logoScale: 2.2 },
  { name: "Verve", logo: verveLogo, color: "#8B5CF6", stat: "2.8%", statLabel: "CTR", logoScale: 1.1 },
  { name: "Layers", logo: layersLogo, color: "#F59E0B", stat: "$4.20", statLabel: "avg CPA", logoScale: 1.3 },
  { name: "Reachh", logo: reachhLogo, color: "#EC4899", stat: "142K", statLabel: "clicks", featured: true, logoScale: 1.8 },
  { name: "Revyl", logo: revylLogo, color: "#06B6D4", stat: "2.4x", statLabel: "ROAS", logoScale: 1.4 },
];

export const FloatingBrandCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animate the rotation
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.15) % 360); // Slow rotation
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isVisible]);

  // Calculate positions around an ellipse
  const numCards = brandCards.length;
  const radiusX = 40; // horizontal radius as percentage
  const radiusY = 35; // vertical radius as percentage

  return (
    <>
      <style>{`
        @keyframes card-fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .brand-card {
          will-change: transform, left, top;
          backface-visibility: hidden;
          transition: left 0.05s linear, top 0.05s linear;
        }
        .brand-card-inner {
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border: 1px solid rgba(0,0,0,0.06);
          transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .brand-card-inner:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {brandCards.map((card, index) => {
          // Position each card around the ellipse with shared rotation
          const angleOffset = (index / numCards) * 360;
          const currentAngle = angleOffset + rotation;
          const angleRad = (currentAngle * Math.PI) / 180;
          
          // Calculate position on ellipse (centered at 50%, 50%)
          const x = 50 + radiusX * Math.cos(angleRad);
          const y = 50 + radiusY * Math.sin(angleRad);
          
          // Scale based on position (back = smaller, front = larger)
          const depth = Math.sin(angleRad);
          const scale = 0.85 + (depth + 1) * 0.15; // 0.85 to 1.15
          const zIndex = Math.round((depth + 1) * 10);

          return (
            <div
              key={card.name}
              className="brand-card absolute hidden lg:block"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: isVisible ? (0.6 + (depth + 1) * 0.2) : 0, // Fade based on depth
                zIndex: zIndex,
              }}
            >
              <div 
                className="brand-card-inner rounded-2xl p-4 pointer-events-auto"
                style={{
                  boxShadow: `0 ${8 + depth * 8}px ${24 + depth * 16}px rgba(0,0,0,${0.06 + depth * 0.04})`,
                  width: '140px',
                  height: '160px',
                }}
              >
                {/* Large Brand Logo - fills available space */}
                <div className="flex justify-center items-center overflow-hidden" style={{ height: '90px' }}>
                  {card.logo ? (
                    <img 
                      src={card.logo} 
                      alt={card.name} 
                      className="object-contain"
                      style={{ 
                        transform: `scale(${card.logoScale || 1})`,
                        maxWidth: '200px',
                        maxHeight: '150px',
                      }}
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                      }}
                    >
                      {card.initial}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="text-center space-y-0.5 mt-2">
                  <div className="text-xl font-bold text-gray-900">
                    {card.stat}
                  </div>
                  <div className="text-[8px] text-gray-400 uppercase tracking-widest font-medium">
                    {card.statLabel}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
