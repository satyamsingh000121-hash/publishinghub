/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050807',
          soft: '#09110d',
          card: '#080d0a',
          surface: '#0b120f',
          surface2: '#101914',
          surface3: '#151e18',
          darker: '#040605',
        },
        forest: {
          DEFAULT: '#123d2b',
          dark: '#0d2a1d',
          medium: '#185238',
          light: '#2c7650',
          hover: '#37865d',
        },
        gold: {
          DEFAULT: '#b89245',
          light: '#d4b56a',
          bright: '#e5c479',
          muted: 'rgba(184, 146, 69, 0.45)',
        },
        cream: {
          DEFAULT: '#f2eee3',
          soft: '#d9d5ca',
          muted: '#9a9b94',
          subtle: '#656861',
        },
        line: {
          DEFAULT: 'rgba(242, 238, 227, 0.12)',
          subtle: 'rgba(242, 238, 227, 0.08)',
          gold: 'rgba(184, 146, 69, 0.45)',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        container: '1380px',
      },
    },
  },
  plugins: [],
};
