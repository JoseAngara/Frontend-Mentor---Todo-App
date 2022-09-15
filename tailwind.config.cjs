/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "josefina-sans": ["Josefin Sans", "sans-serif"],
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
      letterSpacing: {
        "hyper-widest": "0.25em",
      },
      colors: {
        "very-dark-grayish-blue": {
          DEFAULT: "hsl(235, 19%, 35%)",
        },
        "dark-grayish-blue": {
          DEFAULT: "hsl(236, 9%, 61%)",
        },
        "light-grayish-blue": {
          DEFAULT: "hsl(233, 11%, 84%)",
          dark: "hsl(234, 39%, 85%)",
        },
        "light-grayish-blue-hover": {
          DEFAULT: "hsl(236, 33%, 92%)",
        },
        "very-light-grayish-blue": {
          DEFAULT: "hsl(236, 33%, 92%)",
        },
        "very-light-gray": {
          DEFAULT: "hsl(0, 0%, 98%)",
        },
        "very-dark-blue": {
          DEFAULT: "hsl(235, 21%, 11%)",
        },
        "very-dark-desaturated-blue": {
          DEFAULT: "hsl(235, 24%, 19%)",
        },
        "bright-blue": "hsl(220, 98%, 61%)",
      },
      backgroundImage: {
        "check-gradient":
          "linear-gradient(to bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        "desktop-dark": "url('/src/assets/images/bg-desktop-dark.jpg')",
        "desktop-light": "url('/src/assets/images/bg-desktop-light.jpg')",
        "mobile-dark": "url('/src/assets/images/bg-mobile-dark.jpg')",
        "mobile-light": "url('/src/assets/images/bg-mobile-light.jpg')",
        "icon-moon": "url('/src/assets/images/icon-moon.svg')",
        "icon-sun": "url('/src/assets/images/icon-sun.svg')",
      },
      content: {
        "check-icon": "url('/src/assets/images/icon-check.svg')",
      },
    },
  },
  plugins: [],
};
