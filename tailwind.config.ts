import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          page: "#f9f9f7",
          card: "#fcfcfb",
        },
        ink: {
          primary: "#0b0b0b",
          secondary: "#52514e",
          muted: "#898781",
        },
        seq: {
          100: "#cde2fb",
          150: "#b7d3f6",
          200: "#9ec5f4",
          250: "#86b6ef",
          300: "#6da7ec",
          350: "#5598e7",
          400: "#3987e5",
          450: "#2a78d6",
          500: "#256abf",
          550: "#1c5cab",
          600: "#184f95",
          650: "#104281",
          700: "#0d366b",
        },
        status: {
          good: "#0ca30c",
          warning: "#fab219",
          serious: "#ec835a",
          critical: "#d03b3b",
        },
        hairline: "#e1e0d9",
        baseline: "#c3c2b7",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
