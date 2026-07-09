import type { Config } from "tailwindcss";

const config: Config = {
  // SIGURADUHING NANDITO ITONG APARTMENT PATHS NA ITO:
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // GAR NEW: Keyframes para sa spark/glow animation ng VirtualKeyboard
      keyframes: {
        "key-glow": {
          "0%": { boxShadow: "0 0 0px rgba(59,130,246,0)" },
          "30%": { boxShadow: "0 0 18px 4px rgba(59,130,246,0.55)" },
          "100%": { boxShadow: "0 0 0px rgba(59,130,246,0)" },
        },
        spark: {
          "0%": {
            transform: "rotate(var(--spark-angle, 0deg)) translateY(-4px) scale(0.4)",
            opacity: "1",
          },
          "100%": {
            transform: "rotate(var(--spark-angle, 0deg)) translateY(-22px) scale(1)",
            opacity: "0",
          },
        },
        "glow-pulse": {
          "0%": { opacity: "0.8", transform: "scale(0.6)" },
          "100%": { opacity: "0", transform: "scale(1.7)" },
        },
      },
      animation: {
        "key-glow": "key-glow 600ms ease-out",
        spark: "spark 700ms ease-out forwards",
        "glow-pulse": "glow-pulse 650ms ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;