interface LogoBarProps {
  logos: { src: string; alt: string }[];
  title?: string;
  variant?: 'static' | 'scroll';
  grayscale?: boolean;
}

export const LogoBar = ({ 
  logos, 
  title, 
  variant = 'static',
  grayscale = true 
}: LogoBarProps) => {
  if (variant === 'scroll') {
    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos];
    
    return (
      <div className="w-full overflow-hidden">
        {title && (
          <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mb-6">
            {title}
          </p>
        )}
        <div className="relative">
          {/* Gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling track */}
          <div 
            className="flex items-center gap-12 animate-scroll-logos"
            style={{
              width: 'max-content',
              animation: 'scrollLogos 40s linear infinite'
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className={`
                  h-8 sm:h-10 w-auto object-contain
                  ${grayscale ? 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0' : 'opacity-70 hover:opacity-100'}
                  transition-all duration-300
                `}
              />
            ))}
          </div>
        </div>
        
        <style>{`
          @keyframes scrollLogos {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
        `}</style>
      </div>
    );
  }

  // Static variant
  return (
    <div className="w-full">
      {title && (
        <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mb-6">
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className={`
              h-8 sm:h-10 w-auto object-contain
              ${grayscale ? 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0' : 'opacity-70 hover:opacity-100'}
              transition-all duration-300
            `}
          />
        ))}
      </div>
    </div>
  );
};

// Compact logo strip for hero sections
export const LogoStrip = ({ 
  logos, 
  title 
}: { 
  logos: { src: string; alt: string }[];
  title?: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {title && (
        <p className="text-xs text-muted-foreground">
          {title}
        </p>
      )}
      <div className="flex items-center gap-6">
        {logos.slice(0, 5).map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="h-6 w-auto object-contain opacity-40 grayscale"
          />
        ))}
        {logos.length > 5 && (
          <span className="text-xs text-muted-foreground">
            +{logos.length - 5} more
          </span>
        )}
      </div>
    </div>
  );
};



