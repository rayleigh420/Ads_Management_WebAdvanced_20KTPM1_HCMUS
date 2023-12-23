/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#5599D6',
          500: '#ddebf7',
        },
      },
    },
  },
  plugins: [],
};
