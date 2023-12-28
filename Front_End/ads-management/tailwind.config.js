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
        secondary: {
          success: 'rgb(30 70 32)',
          bgsuccess: 'rgb(237 247 237)',
          unsuccess: 'rgb(1 67 97)',
          bgunsuccess: 'rgb(229 246 253)',
        },
      },
    },
  },
  plugins: [],
};
