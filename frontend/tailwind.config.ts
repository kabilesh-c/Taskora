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
        "bordup-bg": "#F9F6F0", // cream background
        "bordup-dark": "#161616", // almost black elements
        "bordup-orange": "#FF8F6B",
        "bordup-purple": "#D9C6F4",
        "bordup-yellow": "#FBCB46"
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'strong': '0 20px 50px -10px rgba(0,0,0,0.2)'
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
