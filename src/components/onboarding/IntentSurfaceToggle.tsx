import { Switch } from "@/components/ui/switch";

interface IntentSurfaceToggleProps {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  onToggle: (id: string, enabled: boolean) => void;
}

export const IntentSurfaceToggle = ({
  id,
  name,
  description,
  enabled,
  onToggle
}: IntentSurfaceToggleProps) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-border/40 bg-background/50 hover:bg-background/80 transition-colors duration-200">
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold text-foreground">{name}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={(checked) => onToggle(id, checked)}
        className="mt-1"
      />
    </div>
  );
};
