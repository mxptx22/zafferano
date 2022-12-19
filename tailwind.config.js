/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Yaldevi", "sans-serif"],
        serif: ["Yrsa", "serif"],
        serifnumbers: ["Frank Ruhl Libre", "serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        lighterTheme: {
          primary: "#C04497",
          secondary: "#ee53c0",
          accent: "#F7AA42",
          neutral: "#191D24",
          "base-100": "#f3f4f6",
          info: "#93d6e6",
          success: "#a1d7d1",
          warning: "#dfd1c1",
          error: "#d6b0c8",
          "--rounded-box": "0.15rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.07rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0.25rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "0.75px", // border width of buttons
          "--tab-border": "0.75px", // border width of tabs
          "--tab-radius": "0.25rem", // border radius of tabs
        },
        darkerTheme: {
          primary: "#A85184",
          secondary: "#f7b0d0",
          accent: "#ffbf80",
          neutral: "#d2d7e0",
          "base-100": "#292d37",
          info: "#bce6f0",
          success: "#d7eeeb",
          warning: "#f0ebe3",
          error: "#f0e2eb",
          "--rounded-box": "0.15rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.07rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0.25rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "0.75px", // border width of buttons
          "--tab-border": "0.75px", // border width of tabs
          "--tab-radius": "0.25rem", // border radius of tabs
        },
      },
    ],
    darkTheme: "darkerTheme",
  },
  plugins: [require("daisyui")],
};
