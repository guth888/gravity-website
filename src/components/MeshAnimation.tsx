import { useEffect, useRef } from "react";

interface MeshAnimationProps {
  className?: string;
}

export const MeshAnimation = ({ className = "" }: MeshAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, isHovering: false });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Extract CSS custom property values for Canvas API
    const computedStyle = getComputedStyle(document.documentElement);
    const formatHSL = (varName: string) => {
      const value = computedStyle.getPropertyValue(varName).trim();
      if (!value) return 'hsl(0, 0%, 50%)'; // Fallback gray
      
      // HSL values are stored as "h s l" (space-separated)
      // We need to convert to "hsl(h, s, l)"
      const parts = value.split(' ').map(p => p.trim()).filter(p => p);
      if (parts.length === 3) {
        return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      }
      return value; // Return as-is if already formatted
    };
    
    // Use the new Gravity color variables
    const meshLineColor = formatHSL('--gravity-grey'); // Quantum Grey for mesh lines
    const accentTealColor = formatHSL('--gravity-teal'); // Antimatter Teal for accents
    const nodeBlueColor = formatHSL('--gravity-purple'); // Singularity Purple for nodes
    const nodeMintColor = formatHSL('--gravity-teal'); // Antimatter Teal for alternate nodes

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      mouseRef.current = {
        prevX: mouseRef.current.x || newX,
        prevY: mouseRef.current.y || newY,
        x: newX,
        y: newY,
        isHovering: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Scroll handler for morphing effects
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = Math.min(window.scrollY / Math.max(maxScroll, 1), 1);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize

    // Network configuration
    const nodeCount = 24;
    const nodes: { 
      x: number; 
      y: number; 
      baseY: number; 
      baseX: number; 
      vx: number; 
      vy: number;
      phaseOffset?: number;
      floatAmplitude?: number;
    }[] = [];
    const topY = 120;
    const bottomY = canvas.getBoundingClientRect().height - 120;
    const padding = 40;
    const width = canvas.getBoundingClientRect().width;

    // Create top row nodes with organic offset
    for (let i = 0; i < nodeCount; i++) {
      const x = padding + (i / (nodeCount - 1)) * (width - padding * 2);
      nodes.push({ 
        x, 
        y: topY, 
        baseY: topY, 
        baseX: x, 
        vx: 0, 
        vy: 0,
        // Add unique phase offset for organic motion
        phaseOffset: Math.random() * Math.PI * 2,
        floatAmplitude: Math.random() * 3 + 2
      });
    }

    // Create bottom row nodes with organic offset
    for (let i = 0; i < nodeCount; i++) {
      const x = padding + (i / (nodeCount - 1)) * (width - padding * 2);
      nodes.push({ 
        x, 
        y: bottomY, 
        baseY: bottomY, 
        baseX: x, 
        vx: 0, 
        vy: 0,
        phaseOffset: Math.random() * Math.PI * 2,
        floatAmplitude: Math.random() * 3 + 2
      });
    }

    let phase = 0; // Animation phase: 0=appearing, 1=pulsing, 2=stabilized

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      timeRef.current += 0.016;
      const time = timeRef.current;

      // Phase transitions
      if (time < 1.5) {
        phase = 0; // Nodes appearing
      } else if (time < 4) {
        phase = 1; // Gravity distortion + pulsing
      } else {
        phase = 2; // Stabilized breathing
      }

      // Calculate distortion based on phase
      let distortionAmount = 0;
      if (phase === 1) {
        const t = (time - 1.5) / 2.5;
        distortionAmount = Math.sin(t * Math.PI) * 0.12;
      } else if (phase === 2) {
        distortionAmount = Math.sin(time * 0.3) * 0.02;
      }

      // Update node positions with gravity effect + mouse interaction + scroll morphing + ambient motion
      const centerX = width / 2;
      const mouse = mouseRef.current;
      const scrollProgress = scrollRef.current;
      
      nodes.forEach((node, i) => {
        // Base gravity distortion
        const distanceFromCenter = Math.abs(node.baseX - centerX);
        const maxDistance = width / 2 - padding;
        const normalizedDistance = 1 - distanceFromCenter / maxDistance;
        
        const pull = normalizedDistance * distortionAmount * 40;
        const isTopRow = i < nodeCount;
        let targetY = node.baseY + (isTopRow ? pull : -pull);
        let targetX = node.baseX;

        // Ambient floating motion (always active for organic feel)
        const floatTime = time * 0.8 + (node.phaseOffset || 0);
        const floatX = Math.sin(floatTime) * (node.floatAmplitude || 2);
        const floatY = Math.cos(floatTime * 0.7) * (node.floatAmplitude || 2);
        targetX += floatX;
        targetY += floatY;

        // Wave pattern across mesh (continuous ambient animation)
        const waveProgress = (i % nodeCount) / nodeCount;
        const wave = Math.sin(time * 1.2 + waveProgress * Math.PI * 2) * 8;
        targetY += wave * (isTopRow ? 1 : -1) * 0.5;

        // Scroll-triggered morphing patterns
        if (scrollProgress > 0.1) {
          // Pattern 1: Spiral transformation (scroll 10-40%)
          if (scrollProgress < 0.4) {
            const spiralProgress = (scrollProgress - 0.1) / 0.3;
            const angle = (i % nodeCount) / nodeCount * Math.PI * 2;
            const radius = spiralProgress * 50;
            targetX += Math.cos(angle + spiralProgress * Math.PI * 2) * radius;
            targetY += Math.sin(angle + spiralProgress * Math.PI * 2) * radius * (isTopRow ? 1 : -1);
          }
          
          // Pattern 2: Diamond formation (scroll 40-70%)
          else if (scrollProgress < 0.7) {
            const diamondProgress = (scrollProgress - 0.4) / 0.3;
            const progress = (i % nodeCount) / nodeCount;
            const diamondY = Math.abs(progress - 0.5) * 2;
            targetY += (isTopRow ? 1 : -1) * diamondY * 60 * diamondProgress;
            targetX += (progress - 0.5) * 40 * diamondProgress;
          }
          
          // Pattern 3: Convergence to center (scroll 70-100%)
          else {
            const convergeProgress = (scrollProgress - 0.7) / 0.3;
            const pullToCenter = (centerX - node.baseX) * convergeProgress * 0.6;
            const verticalPull = (200 - node.baseY) * convergeProgress * 0.4;
            targetX += pullToCenter;
            targetY += verticalPull;
          }
        }

        // No mouse interaction on mesh - gravitational pull removed

        // Smooth easing to target position
        const easing = 0.15;
        node.vx += (targetX - node.x) * easing;
        node.vy += (targetY - node.y) * easing;
        node.vx *= 0.85; // Damping
        node.vy *= 0.85;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw connections (triangular mesh)
      ctx.lineWidth = 1.2;
      
      // Calculate center for focus halo effect
      const haloCenterX = rect.width / 2;
      const haloCenterY = rect.height / 2;
      const haloMaxRadius = Math.sqrt(haloCenterX * haloCenterX + haloCenterY * haloCenterY);
      
      for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < nodeCount; j++) {
          const topNode = nodes[i];
          const bottomNode = nodes[nodeCount + j];
          
          let lineAlpha = 0.18;
          
          // Opacity based on phase and pulse
          if (phase === 0) {
            lineAlpha = Math.min((time / 1.5) * 0.18, 0.18);
          } else if (phase === 1) {
            const pulseT = (time - 1.5) / 2.5;
            const pulse = Math.sin(pulseT * Math.PI * 4 + (i + j) * 0.1) * 0.09;
            lineAlpha = 0.18 + pulse;
          } else {
            const pulse = Math.sin(time * 0.5 + (i + j) * 0.1) * 0.04;
            lineAlpha = 0.18 + pulse;
          }

          // Focus halo: dim center, bright edges (reverse vignette)
          const midX = (topNode.x + bottomNode.x) / 2;
          const midY = (topNode.y + bottomNode.y) / 2;
          const distFromCenter = Math.sqrt((midX - haloCenterX) ** 2 + (midY - haloCenterY) ** 2);
          const normalizedDist = distFromCenter / haloMaxRadius;
          
          // Create soft focus circle: 30-40% opacity in center, ease to 100% at edges
          const focusMultiplier = normalizedDist < 0.4 
            ? 0.3 + (normalizedDist / 0.4) * 0.7  // 30% to 100% in inner 40% radius
            : 1.0;  // Full opacity outside
          
          lineAlpha *= focusMultiplier;

          // Draw line with consistent color (no color gradients on hover)
          ctx.strokeStyle = meshLineColor;

          ctx.globalAlpha = lineAlpha;
          ctx.beginPath();
          ctx.moveTo(topNode.x, topNode.y);
          ctx.lineTo(bottomNode.x, bottomNode.y);
          ctx.stroke();
        }
      }

      // Draw nodes with subtle, minimal style
      nodes.forEach((node, i) => {
        const nodeOpacity = phase === 0 ? Math.min(time / 1.5, 1) : 1;
        
        const nodeScale = 0.4;
        const nodeGlow = 0.15;
        
        // Use subtle grey - no color changes
        const color = meshLineColor;
        
        // Subtle outer glow (barely visible)
        ctx.globalAlpha = nodeOpacity * nodeGlow * 0.2;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6 * nodeScale, 0, Math.PI * 2);
        ctx.fill();

        // Core node (small and subtle)
        ctx.globalAlpha = nodeOpacity * 0.28;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3 * nodeScale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("scroll", handleScroll);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
