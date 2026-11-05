/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- THIS IS CRUCIAL
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          yellow: '#FFD700',
          dark: '#0a0a0a',
          gray: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
