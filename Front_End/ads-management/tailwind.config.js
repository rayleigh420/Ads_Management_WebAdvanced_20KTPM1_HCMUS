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
          success: '#488d4b',
          bgsuccess: '#edf7ed',
          unsuccess: 'rgb(1 67 97)',
          bgunsuccess: 'rgb(229 246 253)',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
};
