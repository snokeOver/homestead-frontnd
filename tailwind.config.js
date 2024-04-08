/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        rubik: '"Rubik Scribble", system-ui',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "blue",
          secondary: "teal",
          ".navbarr": {
            "background-color": "#e0dede",
          },
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "green",
          secondary: "teal",
          ".navbarr": {
            "background-color": "#242323",
          },
        },
      },
    ],
  },
};
