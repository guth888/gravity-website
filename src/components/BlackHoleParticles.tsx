import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export const BlackHoleParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isInView: false });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Initialize particles
    const particleCount = 80;
    const starColor = "0 0% 95%"; // White like stars

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: starColor,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isInView: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInView = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const mouse = mouseRef.current;

      particlesRef.current.forEach((particle) => {
        // Drift movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Black hole gravitational pull with time dilation
        if (mouse.isInView) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const blackHoleRadius = 200;
          const eventHorizonRadius = 20; // Event horizon

          if (distance < blackHoleRadius && distance > 0) {
            // Time dilation factor - particles slow down near event horizon
            const timeDilation = Math.max(0.1, (distance - eventHorizonRadius) / blackHoleRadius);
            
            // Gravitational force (inverse square law)
            const force = (1 - distance / blackHoleRadius) * 0.8 * timeDilation;
            const angle = Math.atan2(dy, dx);
            
            // Pull toward black hole (slowed by time dilation)
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;

            // Add orbital motion (tangential velocity)
            const orbitalAngle = angle + Math.PI / 2;
            const orbitalForce = force * 0.3;
            particle.vx += Math.cos(orbitalAngle) * orbitalForce;
            particle.vy += Math.sin(orbitalAngle) * orbitalForce;

            // Redshift effect - particles dim near event horizon
            if (distance < blackHoleRadius * 0.5) {
              const redshiftFactor = 1 - (distance / (blackHoleRadius * 0.5));
              // Particles dim and turn slightly red
              if (redshiftFactor > 0.3) {
                particle.color = `0 ${Math.floor(redshiftFactor * 30)}% ${Math.floor(60 - redshiftFactor * 30)}%`;
              }
            }

            // Particles get consumed near event horizon with extreme time dilation
            if (distance < eventHorizonRadius + 10) {
              // Extreme time dilation - almost frozen
              particle.vx *= 0.5;
              particle.vy *= 0.5;
              particle.opacity *= 0.92;
              particle.size *= 0.96;

              // Respawn if consumed
              if (particle.size < 0.1 || distance < eventHorizonRadius) {
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
                particle.size = Math.random() * 2 + 0.5;
                particle.opacity = Math.random() * 0.5 + 0.2;
                // Reset to white star color
                particle.color = "0 0% 95%";
              }
            }
          }
        }

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.color})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
