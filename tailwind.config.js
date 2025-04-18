/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#888876",
          secondary: "#E5E5CD",
          tertiary: "#B1AFA4",
          accent: "#EB8F6A",
        },
        dark: {
          primary: "#3F3F37",
          secondary: "#D6D6B1",
          tertiary: "#878472",
          accent: "#DE541E",
        },
      },
    },
  },
  plugins: [],
};
