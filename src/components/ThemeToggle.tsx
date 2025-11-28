import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-lg bg-gravity-void/80 backdrop-blur-sm border border-gravity-grey/30 hover:border-gravity-orange/50 flex items-center justify-center transition-all duration-300 cosmic-glow-hover group"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-gravity-grey group-hover:text-gravity-orange transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-gravity-grey group-hover:text-gravity-orange transition-colors" />
      )}
    </button>
  );
};
