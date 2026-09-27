/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E1B2A",
          light: "#152538",
          soft: "#1C3247",
        },
        teal: {
          DEFAULT: "#1F6F78",
          deep: "#134851",
          bright: "#2F9AA6",
        },
        amber: {
          DEFAULT: "#E8A33D",
          soft: "#F4C878",
        },
        coral: "#D65B4A",
        mist: "#F4F7F6",
        slate2: "#4A5A66",
        line: "#D8E2E1",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(14,27,42,0.06)",
      },
    },
  },
  plugins: [],
};
