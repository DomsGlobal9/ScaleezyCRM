/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#09090b', // Zinc 950
          card: '#18181b', // Zinc 900
          border: '#27272a', // Zinc 800
          primary: '#4f46e5', // Indigo 600
          primaryHover: '#4338ca', // Indigo 700
          text: '#fafafa', // Zinc 50
          textMuted: '#a1a1aa', // Zinc 400
        }
      }
    },
  },
  plugins: [],
};
