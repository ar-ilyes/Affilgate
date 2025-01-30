/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EFFAF4",
          100: "#D8F3E3",
          200: "#B3E7CA",
          300: "#82D3AC",
          400: "#4EB988",
          500: "#278D62",
          600: "#1D7E57",
          700: "#176548",
          800: "#15503B",
          900: "#124231",
          950: "#09251B"
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
