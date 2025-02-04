/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue}"],
  theme: {
    extend: {
      colors: {
        primaryColor: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        customGray: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e0e0e0',
          300: '#c7c7c7',
          400: '#a3a3a3',
          500: '#F6F7FA',
          600: '#756E80',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          heading: ['Roboto', 'sans-serif'],
          primary: ['Inter','sans-serif']
        },
      },
    },
  },
  plugins: [],
};
