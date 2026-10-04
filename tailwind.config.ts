import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1B2333",
          light: "#2B3650",
        },
        paper: {
          DEFAULT: "#F6F2E7",
          dim: "#EFE9D8",
        },
        gold: {
          DEFAULT: "#2E8B57",
          dark: "#1F5D3A",
          light: "#8FD0A5",
        },
        forest: {
          DEFAULT: "#1D5B46",
          dark: "#123B2D",
        },
        slate: {
          DEFAULT: "#6B7280",
          light: "#9BA0AB",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-worksans)", "Helvetica", "Arial", "sans-serif"],
      },
      maxWidth: {
        prose: "42rem",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(27,35,51,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
