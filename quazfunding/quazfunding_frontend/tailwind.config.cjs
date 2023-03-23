/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        0: '#03191E', // bg
        1: '#941C2F', // modals, offcanvas, cards, buttons bg
        2: '#033860',
        3: '#004385',
        4: '#087CA7',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
