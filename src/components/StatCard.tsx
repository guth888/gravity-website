import { useEffect, useState, useRef } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  animate?: boolean;
}

export const StatCard = ({ value, label, prefix = '', suffix = '', animate = true }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(animate ? '0' : value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          
          // Parse the numeric value
          const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
          const hasDecimal = value.includes('.');
          const decimalPlaces = hasDecimal ? (value.split('.')[1]?.length || 0) : 0;
          
          // Animate the number
          const duration = 1500;
          const startTime = performance.now();
          
          const animateNumber = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = numericValue * easeOut;
            
            if (hasDecimal) {
              setDisplayValue(currentValue.toFixed(decimalPlaces));
            } else {
              setDisplayValue(Math.round(currentValue).toString());
            }
            
            if (progress < 1) {
              requestAnimationFrame(animateNumber);
            } else {
              setDisplayValue(value);
            }
          };
          
          requestAnimationFrame(animateNumber);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [animate, hasAnimated, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};




