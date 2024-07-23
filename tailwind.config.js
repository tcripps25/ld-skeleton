/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector', // This enables dark mode based on the presence of the "dark" class in the HTML tag
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aria: {
        current: 'current="page"'
      }
    }
  },
  plugins: []
}
