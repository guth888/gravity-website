import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Brand Basics",
  "Audience",
  "Goals",
  "Assets",
  "Tone & Voice",
  "Intent Surfaces"
];

interface OnboardingStepperProps {
  currentStep: number;
  completedSteps: number[];
}

export const OnboardingStepper = ({ currentStep, completedSteps }: OnboardingStepperProps) => {
  return (
    <div className="w-64 flex-shrink-0 space-y-8">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground" style={{ letterSpacing: "0.1em" }}>
          Strategy Session
        </h2>
        <p className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {STEPS.length}
        </p>
      </div>

      <div className="space-y-2">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;
          const isFuture = index > currentStep;

          return (
            <div
              key={step}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                isCurrent && "bg-primary/10 border border-primary/20",
                isCompleted && !isCurrent && "opacity-70",
                isFuture && "opacity-40"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  isCurrent && "bg-primary text-primary-foreground",
                  isCompleted && !isCurrent && "bg-primary/60 text-primary-foreground",
                  isFuture && "bg-muted border border-border"
                )}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isCurrent && "text-foreground",
                  isCompleted && !isCurrent && "text-muted-foreground",
                  isFuture && "text-muted-foreground/60"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
