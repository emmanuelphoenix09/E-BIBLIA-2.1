/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./www/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        biblia: {
          gold: "#d4af37",
          darkGold: "#b89428",
          navy: "#0f172a",
          parchment: "#fcfbf7",
          parchmentDark: "#1a1815",
          cardDark: "#26231e",
          amberBorder: "#e2d1a6"
        }
      },
      fontFamily: {
        brand: ["Cinzel", "serif"],
        reader: ["Merriweather", "serif"],
        sans: ["Inter", "sans-serif"]
      }
    }
  }
};
