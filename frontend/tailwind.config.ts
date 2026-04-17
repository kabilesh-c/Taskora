import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#4F46E5",
        accent: "#06B6D4",
        background: "#FAFAFA",
        "background-alt": "#F3F0FF",
        "text-primary": "#0F0A1E",
        "text-secondary": "#6B7280",
        success: "#10B981",
        "dark-bg": "#0F0A1E",
        "dark-panel": "#1E1A31",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      animation: {
        "float-slow": "float 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
