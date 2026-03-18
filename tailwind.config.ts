import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
        sans: ["Geist", "sans-serif"],
      },
      colors: {
        charcoal: "#0e0e0e",
        ink: "#161616",
        surface: "#1e1e1e",
        border: "#2a2a2a",
        muted: "#555555",
        ghost: "#888888",
        silver: "#c8c8c8",
        cream: "#f0ead6",
        amber: "#f5a623",
        gold: "#e8c84a",
        rust: "#c0392b",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "line-grow": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        blink: "blink 1s step-end infinite",
        "line-grow": "line-grow 1s ease forwards",
        marquee: "marquee 20s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
