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
        bg: {
          DEFAULT: "#0c0c0c",
          elevated: "#141414",
          surface: "#1a1a1a",
        },
        border: {
          DEFAULT: "#262626",
          subtle: "#1e1e1e",
        },
        text: {
          primary: "#f0f0f0",
          secondary: "#8a8a8a",
          tertiary: "#555",
        },
        accent: {
          DEFAULT: "#e8a44a",
          dim: "#c4873a",
        },
        danger: "#d44",
      },
      fontFamily: {
        display: ['"Newsreader"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
