/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorMain: "var(--colorMain)",
        colorBackground: "var(--colorBackground)",
      },
      fontFamily: {
        sans: "var(--fontPrimary)",
        fontSecondary: "var(--fontSecondary)",
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/line-clamp')
  ],
}
