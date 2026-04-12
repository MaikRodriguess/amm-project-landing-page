import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amm-orange': '#f9a926',
        'amm-dark': '#151515',
        'amm-light': '#fefefe',
        'amm-beige': '#c3ae9e',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      letterSpacing: {
        'tight-4': '-0.04em',
      },
    },
  },
  plugins: [],
} satisfies Config
