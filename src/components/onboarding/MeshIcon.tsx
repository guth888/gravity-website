import { useEffect, useRef } from "react";

interface MeshIconProps {
  className?: string;
  size?: number;
}

export const MeshIcon = ({ className = "", size = 48 }: MeshIconProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Extract CSS custom property values
    const computedStyle = getComputedStyle(document.documentElement);
    const formatHSL = (varName: string) => {
      const value = computedStyle.getPropertyValue(varName).trim();
      if (!value) return 'hsl(20, 100%, 50%)';
      
      const parts = value.split(' ').map(p => p.trim()).filter(p => p);
      if (parts.length === 3) {
        return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      }
      return value;
    };
    
    const meshColor = formatHSL('--primary');

    // Network configuration (smaller scale for icon)
    const nodeCount = 6;
    const nodes: { 
      x: number; 
      y: number; 
      baseY: number; 
      baseX: number; 
      vx: number; 
      vy: number;
      phaseOffset: number;
      floatAmplitude: number;
    }[] = [];
    
    const topY = size * 0.25;
    const bottomY = size * 0.75;
    const padding = size * 0.1;

    // Create top row nodes
    for (let i = 0; i < nodeCount; i++) {
      const x = padding + (i / (nodeCount - 1)) * (size - padding * 2);
      nodes.push({ 
        x, 
        y: topY, 
        baseY: topY, 
        baseX: x, 
        vx: 0, 
        vy: 0,
        phaseOffset: Math.random() * Math.PI * 2,
        floatAmplitude: Math.random() * 1.5 + 1
      });
    }

    // Create bottom row nodes
    for (let i = 0; i < nodeCount; i++) {
      const x = padding + (i / (nodeCount - 1)) * (size - padding * 2);
      nodes.push({ 
        x, 
        y: bottomY, 
        baseY: bottomY, 
        baseX: x, 
        vx: 0, 
        vy: 0,
        phaseOffset: Math.random() * Math.PI * 2,
        floatAmplitude: Math.random() * 1.5 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      timeRef.current += 0.016;
      const time = timeRef.current;

      // Breathing distortion effect
      const distortionAmount = Math.sin(time * 0.8) * 0.04;

      // Update node positions with breathing effect
      const centerX = size / 2;
      
      nodes.forEach((node, i) => {
        // Base breathing distortion
        const distanceFromCenter = Math.abs(node.baseX - centerX);
        const maxDistance = size / 2 - padding;
        const normalizedDistance = 1 - distanceFromCenter / maxDistance;
        
        const pull = normalizedDistance * distortionAmount * size * 0.15;
        const isTopRow = i < nodeCount;
        let targetY = node.baseY + (isTopRow ? pull : -pull);
        let targetX = node.baseX;

        // Ambient floating motion
        const floatTime = time * 0.6 + node.phaseOffset;
        const floatX = Math.sin(floatTime) * node.floatAmplitude;
        const floatY = Math.cos(floatTime * 0.7) * node.floatAmplitude;
        targetX += floatX;
        targetY += floatY;

        // Wave pattern across mesh
        const waveProgress = (i % nodeCount) / nodeCount;
        const wave = Math.sin(time * 1.2 + waveProgress * Math.PI * 2) * 2;
        targetY += wave * (isTopRow ? 1 : -1) * 0.5;

        // Smooth easing to target position
        const easing = 0.15;
        node.vx += (targetX - node.x) * easing;
        node.vy += (targetY - node.y) * easing;
        node.vx *= 0.85;
        node.vy *= 0.85;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw connections (triangular mesh)
      ctx.lineWidth = 0.8;
      
      for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < nodeCount; j++) {
          const topNode = nodes[i];
          const bottomNode = nodes[nodeCount + j];
          
          const pulse = Math.sin(time * 0.5 + (i + j) * 0.1) * 0.04;
          const lineAlpha = 0.25 + pulse;

          ctx.strokeStyle = meshColor;
          ctx.globalAlpha = lineAlpha;
          ctx.beginPath();
          ctx.moveTo(topNode.x, topNode.y);
          ctx.lineTo(bottomNode.x, bottomNode.y);
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const nodeScale = 0.3;
        const nodeGlow = 0.15;
        
        // Subtle outer glow
        ctx.globalAlpha = nodeGlow * 0.25;
        ctx.fillStyle = meshColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4 * nodeScale, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2 * nodeScale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
};
