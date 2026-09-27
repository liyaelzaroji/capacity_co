/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#15130F",
          light: "#1E1B16",
          soft: "#2A2620",
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
        crimson: {
          DEFAULT: "#B3261E",
          deep: "#7E1B16",
          soft: "#D98A84",
        },
        coral: "#D65B4A",
        mist: "#EEEAE0",
        slate2: "#5C574E",
        line: "#DDD6C4",
      },
      fontFamily: {
        display: ["'Anton'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(21,19,15,0.06)",
      },
    },
  },
  plugins: [],
};
