/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nav-gray': '#38393E',
        'nav-yellow': '#FFF3C7',
        'gray-border': '#494A4F',
        'yellow-text': '#E3D79D',
        'form-bg': '#54555A',
      },
    },
  },
  plugins: [],
};
