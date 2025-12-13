import { ReactNode } from 'react';

interface StepCardProps {
  number: string | number;
  title: string;
  description: string;
  icon?: ReactNode;
  visual?: ReactNode;
  isActive?: boolean;
}

export const StepCard = ({
  number,
  title,
  description,
  icon,
  visual,
  isActive = false
}: StepCardProps) => {
  return (
    <div className={`
      relative p-6 sm:p-8 rounded-xl border transition-all duration-300
      ${isActive 
        ? 'bg-white border-primary/30 shadow-lg' 
        : 'bg-white/50 border-border/30 hover:border-border/50 hover:bg-white'
      }
    `}>
      {/* Step Number */}
      <div className={`
        inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold mb-4
        ${isActive 
          ? 'bg-primary text-white' 
          : 'bg-muted text-muted-foreground'
        }
      `}>
        {number.toString().padStart(2, '0')}
      </div>
      
      {/* Icon (optional) */}
      {icon && (
        <div className="w-12 h-12 mb-4 text-primary">
          {icon}
        </div>
      )}
      
      {/* Visual (optional) */}
      {visual && (
        <div className="mb-4">
          {visual}
        </div>
      )}
      
      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

// Horizontal step indicator for showing progress
export const StepIndicator = ({ 
  steps, 
  currentStep 
}: { 
  steps: number; 
  currentStep: number 
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
            ${i + 1 <= currentStep 
              ? 'bg-primary text-white' 
              : 'bg-muted text-muted-foreground'
            }
          `}>
            {i + 1}
          </div>
          {i < steps - 1 && (
            <div className={`
              w-12 h-0.5 mx-1 transition-colors
              ${i + 1 < currentStep ? 'bg-primary' : 'bg-border'}
            `} />
          )}
        </div>
      ))}
    </div>
  );
};




