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
      },
      animation: {
        'custom-ping': 'customPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        customPing: {
          '0%, 100%': { color: '#6363EF', transform: 'scale(1)', opacity: '1' },
          '50%': { color: '#2d2d89', transform: 'scale(1.3)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

