interface MeshAccentProps {
  className?: string;
  opacity?: number;
}

export const MeshAccent = ({ className = "", opacity = 5 }: MeshAccentProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        className="w-full h-full"
        style={{ opacity: opacity / 100 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="mesh-pattern"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0L50 50M50 0L0 50"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              className="text-gravity-purple"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
      </svg>
    </div>
  );
};
