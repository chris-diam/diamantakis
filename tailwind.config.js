/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          terracotta: "#9E6B5E",
          sage: "#8A9A78",
          taupe: "#A69387",
          cream: "#EBE6E1",
          olive: "#8B8356",
          blue: "#6C89B9",
          rust: "#B6705A",
          brown: "#8B5E4D",
        },
      },
    },
  },
  plugins: [],
};
