/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'selector', // This enables dark mode based on the presence of the "dark" class in the HTML tag
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './presets/**/*.{js,vue,ts}'],
  plugins: [require('tailwindcss-primeui')],
  theme: {
    extend: {
      aria: {
        current: 'current="page"'
      },
      routerLink: {
        active: 'active'
      }
    }
  }
}
