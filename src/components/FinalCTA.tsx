import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  headline: string;
  subheadline?: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'dark' | 'gradient';
}

export const FinalCTA = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  variant = 'default'
}: FinalCTAProps) => {
  const variants = {
    default: {
      bg: 'bg-muted/30',
      text: 'text-foreground',
      subtext: 'text-muted-foreground',
      button: 'bg-foreground text-background hover:bg-foreground/90',
      secondary: 'text-foreground hover:text-primary'
    },
    dark: {
      bg: 'bg-foreground',
      text: 'text-background',
      subtext: 'text-background/70',
      button: 'bg-background text-foreground hover:bg-background/90',
      secondary: 'text-background/80 hover:text-background'
    },
    gradient: {
      bg: 'bg-gradient-to-br from-primary/10 via-background to-primary/5',
      text: 'text-foreground',
      subtext: 'text-muted-foreground',
      button: 'bg-primary text-white hover:bg-primary/90',
      secondary: 'text-foreground hover:text-primary'
    }
  };

  const styles = variants[variant];

  return (
    <section className={`py-20 sm:py-28 ${styles.bg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${styles.text} mb-4`}>
          {headline}
        </h2>
        
        {subheadline && (
          <p className={`text-lg ${styles.subtext} mb-8 max-w-2xl mx-auto`}>
            {subheadline}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryCTA.href}
            className={`
              inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium
              transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
              ${styles.button}
            `}
          >
            {primaryCTA.text}
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          {secondaryCTA && (
            <Link
              to={secondaryCTA.href}
              className={`
                inline-flex items-center gap-2 px-6 py-4 font-medium
                transition-colors
                ${styles.secondary}
              `}
            >
              {secondaryCTA.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

// Compact CTA for use within sections
export const InlineCTA = ({
  text,
  href,
  variant = 'primary'
}: {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}) => {
  const variants = {
    primary: 'bg-foreground text-background hover:bg-foreground/90 shadow-sm',
    secondary: 'bg-white text-foreground border border-border hover:border-primary/30 hover:shadow',
    ghost: 'text-primary hover:text-primary/80'
  };

  return (
    <Link
      to={href}
      className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium
        transition-all duration-200
        ${variants[variant]}
      `}
    >
      {text}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
};




