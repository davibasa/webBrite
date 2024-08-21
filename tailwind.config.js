/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brite': '#6363EF',
        'brite-hover': '#5C5CD8',
        'brite-active': '#4141B3'
      },
      fontFamily: {
        fontBrite: 'DM-Sans'
      },
      gridTemplateColumns : {
        "1/5": "1fr 5fr"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

