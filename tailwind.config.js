/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        covenant: {
          50: '#fdfbf7',
          100: '#f9f5eb',
          200: '#f2e8d1',
          300: '#e7d5af',
          400: '#d7b87c',
          500: '#c59b27',
          600: '#ad7e1e',
          700: '#8a5e1a',
          800: '#714b1c',
          900: '#5e3e1a',
          950: '#36200c',
        },
        navy: {
          800: '#151e33',
          900: '#0c1222',
          950: '#070a14',
        },
        parchment: {
          50: '#faf8f5',
          100: '#f4f0e8',
          200: '#eae2d3',
          300: '#ddd0bb',
          400: '#cbb69b',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
