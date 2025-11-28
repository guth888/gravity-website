import { useEffect, useRef, useState } from "react";

export const CursorSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if mouse is within the container
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          setMousePosition({ x, y });
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Singularity - pitch black center point */}
      <div
        className="absolute transition-opacity duration-100 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          width: "8px",
          height: "8px",
          background: "#000000",
          opacity: isVisible ? 1 : 0,
          borderRadius: "50%",
          zIndex: 10,
        }}
      />

      {/* Event Horizon - absolute darkness */}
      <div
        className="absolute transition-opacity duration-150 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          width: "40px",
          height: "40px",
          background: "radial-gradient(circle at center, #000000 0%, #000000 70%, rgba(0, 0, 0, 0.95) 85%, transparent 100%)",
          opacity: isVisible ? 1 : 0,
          borderRadius: "50%",
          zIndex: 9,
        }}
      />

      {/* Photon Sphere - bright ring where light orbits */}
      <div
        className="absolute transition-opacity duration-150 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          width: "44px",
          height: "44px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          opacity: isVisible ? 1 : 0,
          boxShadow: "0 0 12px rgba(255, 255, 255, 0.2), inset 0 0 12px rgba(255, 255, 255, 0.1)",
          zIndex: 8,
        }}
      />

      {/* Innermost Stable Circular Orbit (ISCO) */}
      <div
        className="absolute transition-opacity duration-200 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          width: "70px",
          height: "70px",
          border: "0.5px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          opacity: isVisible ? 0.3 : 0,
          zIndex: 6,
        }}
      />

    
    </div>
  );
};
