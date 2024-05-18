/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-100': '#0D1117',
        'dark-200': '#1C232E',
        'dark-300': '#2E3745',
        'dark-400': '#414C5D',
        'dark-500': '#566274',
      },
    },
  },
  plugins: [],
}

