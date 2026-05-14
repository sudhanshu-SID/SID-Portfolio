/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        accent: '#E84430',
        secondary: '#888888',
        surface: '#0F0F0F',
        elevated: '#1A1A1A',
      },
      letterSpacing: {
        tighter2: '-0.04em',
        tighter3: '-0.03em',
      },
    },
  },
  plugins: [],
}

