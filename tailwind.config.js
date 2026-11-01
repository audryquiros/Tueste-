/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tueste: {
          orange: "#B85D08",
          deep: "#8F4505",
          coral: "#D98170",
          cream: "#FFF5EC",
          paper: "#F7F4F0",
          ink: "#29231F",
          muted: "#786F68",
          line: "#EAD6C8",
          green: "#32835B",
          yellow: "#D9A329",
          red: "#C64C43"
        }
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Playfair Display", "serif"]
      },
      boxShadow: {
        soft: "0 8px 24px rgba(83,48,22,.07)"
      }
    }
  },
  plugins: []
};
