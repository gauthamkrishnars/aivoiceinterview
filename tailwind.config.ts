import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1a1714",
          light: "#6b6560",
          faint: "#a8a09a",
        },
        paper: {
          DEFAULT: "#f7f5f2",
          warm: "#f0ece6",
          deep: "#e8e2da",
        },
        accent: {
          DEFAULT: "#c0392b",
          hover: "#a93226",
          light: "#fdf0ee",
        },
        success: {
          DEFAULT: "#276749",
          light: "#f0fdf4",
        },
        warning: {
          DEFAULT: "#b45309",
          light: "#fffbeb",
        },
        border: {
          DEFAULT: "#ddd6ce",
          light: "#ebe5dd",
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
