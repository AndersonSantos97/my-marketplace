/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",      // Azul profundo
        secondary: "#F1F5F9",    // Gris claro
        accent: "#FBBF24",       // Dorado suave
        dark: "#0F172A",         // Texto oscuro
        muted: "#475569",        // Texto secundario
      },
      fontFamily: {
        heading: ["Poppins", ...defaultTheme.fontFamily.sans],
        body: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
});