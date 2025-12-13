import { ReactNode } from 'react';

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  variant?: 'default' | 'outlined' | 'filled';
}

export const BenefitCard = ({
  icon,
  title,
  description,
  stat,
  statLabel,
  variant = 'default'
}: BenefitCardProps) => {
  const baseClasses = "rounded-xl p-6 transition-all duration-300 group";
  
  const variantClasses = {
    default: "bg-white border border-border/50 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1",
    outlined: "border-2 border-border/30 hover:border-primary/50 hover:bg-primary/5",
    filled: "bg-primary/5 border border-primary/10 hover:bg-primary/10"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      
      {/* Stat (optional) */}
      {stat && (
        <div className="mb-3">
          <span className="text-3xl font-bold text-foreground">{stat}</span>
          {statLabel && (
            <span className="text-sm text-muted-foreground ml-2">{statLabel}</span>
          )}
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};




