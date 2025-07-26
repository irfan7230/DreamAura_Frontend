/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
      },
      transitionProperty: {
        'form': 'opacity, transform',
      },
    },
  },
  variants: {},
  plugins: [],
}

