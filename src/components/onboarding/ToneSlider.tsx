import { Slider } from "@/components/ui/slider";

interface ToneSliderProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}

export const ToneSlider = ({
  label,
  leftLabel,
  rightLabel,
  value,
  onChange
}: ToneSliderProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="space-y-2">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">{leftLabel}</span>
          <span className="text-xs text-muted-foreground">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
};
