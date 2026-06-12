import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        muted: "#6B6B6B",
        surface: "#F5F3FF",
        accent: "#492FFB",
        "accent-dark": "#3520C8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        btn: "10px",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom right, #EEE5F6, #FFFFFF, #F0E9F8)",
      },
    },
  },
  plugins: [],
};
export default config;
