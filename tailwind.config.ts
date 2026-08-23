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
          100: "#e4d9fb",
          150: "#d9c9f9",
          200: "#cdb8f6",
          250: "#c0a5f2",
          300: "#b291ee",
          350: "#a37de9",
          400: "#9268e2",
          450: "#7f56d4",
          500: "#6d47c2",
          550: "#5f3cae",
          600: "#513399",
          650: "#422a80",
          700: "#362368",
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
