/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E55B1F",
        light: "#07C983",
        dark: "#15803D",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
