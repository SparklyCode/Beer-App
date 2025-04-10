/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#F1E4F3',
          pink: '#F686BD',
          cyclamen: '#FE5D9F',
          gray: '#D6D2D2',
          orchid: '#F4BBD3',
          lightPurple: '#F1E4F3',
        },
      },
    },
  },
  plugins: [],
};
