import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingParticles = ({ className = '' }: { className?: string }) => {
  // Generate random particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2, // 2-6px
      duration: Math.random() * 20 + 15, // 15-35s
      delay: Math.random() * -20, // Stagger start
      opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
    }));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      
      {/* Larger accent particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`accent-${i}`}
          className="absolute rounded-full floating-particle-accent"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: `${6 + (i % 3) * 2}px`,
            height: `${6 + (i % 3) * 2}px`,
            background: 'radial-gradient(circle, rgba(58, 139, 255, 0.3) 0%, rgba(58, 139, 255, 0) 70%)',
            animationDuration: `${25 + i * 3}s`,
            animationDelay: `${-i * 2}s`,
          }}
        />
      ))}

      <style>{`
        .floating-particle {
          animation: float-particle linear infinite;
        }
        
        .floating-particle-accent {
          animation: float-particle-accent ease-in-out infinite;
        }
        
        @keyframes float-particle {
          0% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, -100px) scale(0.9);
          }
          75% {
            transform: translate(40px, -50px) scale(1.05);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        
        @keyframes float-particle-accent {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(50px, -80px) scale(1.2);
            opacity: 0.5;
          }
          66% {
            transform: translate(-30px, -40px) scale(0.8);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};



