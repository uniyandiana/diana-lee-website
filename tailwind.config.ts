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
        primary: "#5A9AB4",        // Refined Teal
        secondary: "#F7F9F9",      // Light Ivory
        accent: "#3E7C92",         // Deep Teal
        background: "#FFFEFA",     // Ivory White
        textPrimary: "#1f2937",    // Charcoal
        textSecondary: "#6b7280",  // Warm Grey
      },
    },
  },
  plugins: [],
};
export default config;
