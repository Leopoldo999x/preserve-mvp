import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        preserve: {
          ink: "#123127",
          leaf: "#0F8A5F",
          mint: "#DFF7ED",
          amber: "#FFB34D",
          coral: "#EF6A5B",
          sand: "#F6F4ED",
          sky: "#DCEFFF",
          slate: "#61706B"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 45px -24px rgba(18, 49, 39, 0.28)",
        float: "0 30px 80px -40px rgba(15, 138, 95, 0.35)"
      },
      backgroundImage: {
        "mesh-soft":
          "radial-gradient(circle at top left, rgba(15,138,95,0.18), transparent 42%), radial-gradient(circle at top right, rgba(255,179,77,0.14), transparent 34%), linear-gradient(180deg, #FCFCF8 0%, #F3F7F2 100%)"
      }
    }
  },
  plugins: []
};

export default config;
