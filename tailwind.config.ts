import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "1024px",
        lg: "1440px",
        xl: "1920px",
      },
    },
    screens: {
      // Mobile: 320px - 639px (default, no prefix needed)
      'sm': '640px',    // Tablet: 640px - 1023px
      'md': '1024px',   // Desktop: 1024px - 1439px
      'lg': '1440px',   // Large Desktop: 1440px - 1919px
      'xl': '1920px',   // Ultra-wide: 1920px+
    },
    extend: {
    fontFamily: {
      'studio': ['Cormorant Garamond', 'serif'],
      'headline': ['TT Runs', 'system-ui', 'sans-serif'],
      'body': ['Inter', 'system-ui', 'sans-serif'],
    },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        gravity: {
          black: "hsl(var(--gravity-black))",
          blue: "hsl(var(--gravity-blue))",
          "blue-light": "hsl(var(--gravity-blue-light))",
          chrome: "hsl(var(--gravity-chrome))",
          white: "hsl(var(--gravity-white))",
          steel: "hsl(var(--gravity-steel))",
          "steel-dark": "hsl(var(--gravity-steel-dark))",
          grey: "hsl(var(--gravity-grey))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				"shimmer-slide": {
					"0%": {
						transform: "translateX(-100%)",
					},
					"100%": {
						transform: "translateX(150%)",
					},
				},
        "mesh-pulse": {
          "0%, 100%": {
            opacity: "0.4",
          },
          "50%": {
            opacity: "0.8",
          },
        },
        "mesh-breathe": {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.01)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "timeline-pulse": {
          "0%, 100%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(0.8%)",
          },
        },
        "beam-flow": {
          "0%": { 
            opacity: "0.3",
            transform: "translateY(-20px)"
          },
          "50%": {
            opacity: "1"
          },
          "100%": { 
            opacity: "0.3",
            transform: "translateY(20px)"
          }
        },
        "particle-flow": {
          "0%": { 
            transform: "translateY(-100%)",
            opacity: "0"
          },
          "10%": {
            opacity: "1"
          },
          "90%": {
            opacity: "1"
          },
          "100%": { 
            transform: "translateY(100vh)",
            opacity: "0"
          }
        },
        "spark-1": {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.4" },
          "100%": { top: "100%", opacity: "0" },
        },
        "spark-2": {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "0.4" },
          "90%": { opacity: "0.3" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"shimmer-slide": "shimmer-slide 1.2s ease-in-out",
        "mesh-pulse": "mesh-pulse 3s ease-in-out infinite",
        "mesh-breathe": "mesh-breathe 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "timeline-pulse": "timeline-pulse 8s ease-in-out infinite",
        "beam-flow": "beam-flow 3s linear infinite",
        "particle-1": "particle-flow 4s linear infinite",
        "particle-2": "particle-flow 5s linear infinite 1.5s",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spark-1": "spark-1 6s ease-in-out infinite",
        "spark-2": "spark-2 8s ease-in-out infinite 2s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
