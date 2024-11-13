/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000",
          white: "#FFFFFF",
          border: "#000000",  // primary border color
        },
        background: "#FAFAFA",  // website background color
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
}
