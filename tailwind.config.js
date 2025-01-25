/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all component and page files
  ],
  theme: {
    extend: {
      colors: {
        tableHeader: {
          light: "#f3f4f6", // Light gray for table header in light mode
          dark: "#1f2937", // Darker gray for table header in dark mode
        },
        tableBorder: {
          light: "#e5e7eb", // Light mode table border
          dark: "#374151", // Dark mode table border
        },
      },
    },
  },
  darkMode: "class", // Enable class-based dark mode
  plugins: [],
};
