/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        acronym: ["Acronym", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#000000",
          white: "#FFFFFF",
          border: "#000000", // primary border color
        },
        background: "#FAFAFA", // website background color
      },
      container: {
        center: true,
        padding: "8rem",
      },
      backgroundImage: {
        'hero-banner': "url('/assets/hero-banner.webp')", // Path relative to the public folder
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-hero-patterns"),
  ],
};
