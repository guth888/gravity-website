import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCardProps {
  companyLogo: string;
  companyName: string;
  result: string;
  quote?: string;
  link?: string;
  category?: 'publisher' | 'advertiser';
}

export const CaseStudyCard = ({
  companyLogo,
  companyName,
  result,
  quote,
  link,
  category
}: CaseStudyCardProps) => {
  const content = (
    <div className="bg-white rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <img 
          src={companyLogo} 
          alt={companyName}
          className="h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
        />
        {category && (
          <span className={`
            text-xs font-medium px-2 py-1 rounded-full
            ${category === 'publisher' 
              ? 'bg-primary/10 text-primary' 
              : 'bg-blue-500/10 text-blue-600'
            }
          `}>
            {category === 'publisher' ? 'Publisher' : 'Advertiser'}
          </span>
        )}
      </div>
      
      {/* Result */}
      <h3 className="text-lg font-semibold text-foreground mb-3 flex-grow">
        {result}
      </h3>
      
      {/* Quote (optional) */}
      {quote && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          "{quote}"
        </p>
      )}
      
      {/* CTA */}
      {link && (
        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Read story
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};

// Featured case study with larger layout
export const FeaturedCaseStudy = ({
  companyLogo,
  companyName,
  result,
  quote,
  link,
  stat,
  statLabel
}: CaseStudyCardProps & { stat?: string; statLabel?: string }) => {
  return (
    <div className="bg-white rounded-2xl p-8 sm:p-10 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Company info and stat */}
        <div className="lg:w-1/3">
          <img 
            src={companyLogo} 
            alt={companyName}
            className="h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity mb-6"
          />
          {stat && (
            <div className="mb-2">
              <span className="text-5xl font-bold text-primary">{stat}</span>
              {statLabel && (
                <p className="text-sm text-muted-foreground mt-1">{statLabel}</p>
              )}
            </div>
          )}
        </div>
        
        {/* Right: Result and quote */}
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            {result}
          </h3>
          {quote && (
            <p className="text-muted-foreground mb-6 leading-relaxed">
              "{quote}"
            </p>
          )}
          {link && (
            <Link 
              to={link}
              className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
            >
              Read full story
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};




