import { ReactNode } from "react";

interface NeonBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: "purple" | "teal" | "orange";
}

export const NeonBorder = ({ 
  children, 
  className = "",
  glowColor = "purple"
}: NeonBorderProps) => {
  const glowColors = {
    purple: "shadow-[0_0_20px_rgba(123,22,255,0.3)]",
    teal: "shadow-[0_0_20px_rgba(0,229,196,0.3)]",
    orange: "shadow-[0_0_20px_rgba(255,77,0,0.3)]"
  };

  const borderColors = {
    purple: "border-gravity-purple/40",
    teal: "border-gravity-teal/40",
    orange: "border-gravity-orange/40"
  };

  return (
    <div 
      className={`relative border-2 rounded-2xl transition-all duration-500 hover:${glowColors[glowColor]} ${borderColors[glowColor]} ${className}`}
    >
      {children}
    </div>
  );
};
