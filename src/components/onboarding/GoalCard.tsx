import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface GoalCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  isRecommended?: boolean;
  onClick: () => void;
}

export const GoalCard = ({
  id,
  title,
  subtitle,
  description,
  icon: Icon,
  isSelected,
  isRecommended,
  onClick
}: GoalCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-[1.02]",
        isSelected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border/40 bg-background/50 hover:border-border hover:bg-background/80",
        isRecommended && !isSelected && "border-primary/40"
      )}
      style={isSelected ? {
        boxShadow: "0 0 30px rgba(255, 77, 0, 0.2)"
      } : {}}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
          Recommended for your company
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
          isSelected ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"
        )}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};
