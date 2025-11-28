import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
}

interface Constellation {
  from: number;
  to: number;
}

export const AmbientStars = ({ starCount = 8 }: { starCount?: number }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [constellations, setConstellations] = useState<Constellation[]>([]);

  useEffect(() => {
    // Create static twinkling stars
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 1,
      opacity: Math.random() * 0.15 + 0.05,
      duration: Math.random() * 15 + 20
    }));
    setStars(newStars);

    // Create constellation connections between nearby stars
    const connections: Constellation[] = [];
    const maxDistance = 25; // Max distance between stars to connect (in viewport %)
    
    for (let i = 0; i < newStars.length; i++) {
      for (let j = i + 1; j < newStars.length; j++) {
        const star1 = newStars[i];
        const star2 = newStars[j];
        const distance = Math.sqrt(
          Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2)
        );
        
        // Only connect stars that are close enough and randomly (30% chance)
        if (distance < maxDistance && Math.random() > 0.7) {
          connections.push({ from: i, to: j });
        }
      }
    }
    
    setConstellations(connections);

    // Create shooting stars periodically
    const createShootingStar = () => {
      const newShootingStar: ShootingStar = {
        id: Date.now(),
        startX: Math.random() * 100,
        startY: Math.random() * 30, // Keep in upper portion
        angle: Math.random() * 30 + 30, // 30-60 degree angle
        duration: Math.random() * 1.5 + 1.5
      };

      setShootingStars(prev => [...prev, newShootingStar]);

      // Remove shooting star after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, newShootingStar.duration * 1000);
    };

    // Create shooting stars at random intervals (every 5-10 seconds)
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance
        createShootingStar();
      }
    }, 7000);

    return () => clearInterval(shootingStarInterval);
  }, [starCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="constellation-glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {constellations.map((connection, idx) => {
          const fromStar = stars[connection.from];
          const toStar = stars[connection.to];
          if (!fromStar || !toStar) return null;
          
          return (
            <line
              key={`constellation-${idx}`}
              x1={`${fromStar.x}%`}
              y1={`${fromStar.y}%`}
              x2={`${toStar.x}%`}
              y2={`${toStar.y}%`}
              stroke="url(#constellation-gradient)"
              strokeWidth="0.5"
              filter="url(#constellation-glow)"
              className="constellation-line"
              style={{
                opacity: 0,
                animation: `fadeInConstellation 2s ease-out ${idx * 0.3}s forwards`
              }}
            />
          );
        })}
      </svg>

      {/* Static twinkling stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity * 0.5})`
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((shootingStar) => (
        <div
          key={`shooting-${shootingStar.id}`}
          className="absolute shooting-star"
          style={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
            width: '2px',
            height: '2px',
            background: 'white',
            boxShadow: '0 0 6px 2px rgba(255,255,255,0.8)',
            animation: `shootingStar ${shootingStar.duration}s linear forwards`,
            transform: `rotate(${shootingStar.angle}deg)`,
            '--shooting-distance': '200px'
          } as React.CSSProperties}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, white, transparent)',
              width: '100px',
              height: '2px',
              opacity: 0.8
            }}
          />
        </div>
      ))}
    </div>
  );
};
