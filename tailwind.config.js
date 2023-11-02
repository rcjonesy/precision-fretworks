/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px', // Custom class for a very thin border
      },
      margin: {
        '30': '7.5rem', // Define custom margin values
        '40': '10rem',  // Add more custom margin values as needed
        // You can define additional margin values as required
      },
    },
  },
  plugins: [],
}