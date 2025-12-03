interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  image?: string;
  companyLogo?: string;
  variant?: 'default' | 'large' | 'compact';
}

export const TestimonialCard = ({
  quote,
  name,
  title,
  company,
  image,
  companyLogo,
  variant = 'default'
}: TestimonialCardProps) => {
  if (variant === 'large') {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Quote */}
          <div className="flex-1">
            <svg 
              className="w-10 h-10 text-primary/20 mb-6" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl sm:text-2xl text-foreground leading-relaxed mb-6">
              "{quote}"
            </blockquote>
          </div>
          
          {/* Attribution */}
          <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:min-w-[200px]">
            {image && (
              <img 
                src={image} 
                alt={name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <div className="font-semibold text-foreground">{name}</div>
              <div className="text-sm text-muted-foreground">{title}</div>
              <div className="text-sm text-muted-foreground">{company}</div>
            </div>
            {companyLogo && (
              <img 
                src={companyLogo} 
                alt={company}
                className="h-6 mt-4 opacity-60"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-border/30">
        <blockquote className="text-foreground/90 mb-4 text-sm leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-3">
          {image && (
            <img 
              src={image} 
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <div className="font-medium text-foreground text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">{title}, {company}</div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-border/50 hover:border-border transition-colors">
      <blockquote className="text-lg text-foreground/90 leading-relaxed mb-6">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-4">
        {image && (
          <img 
            src={image} 
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <div className="font-semibold text-foreground">{name}</div>
          <div className="text-sm text-muted-foreground">{title}, {company}</div>
        </div>
        {companyLogo && (
          <img 
            src={companyLogo} 
            alt={company}
            className="h-5 opacity-50"
          />
        )}
      </div>
    </div>
  );
};



