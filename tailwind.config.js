/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        lighterTheme: {
          primary: "#AF1281",
          secondary: "#ee53c0",
          accent: "#FF9933",
          neutral: "#191D24",
          "base-100": "#f3f4f6",
          info: "#93d6e6",
          success: "#a1d7d1",
          warning: "#dfd1c1",
          error: "#d6b0c8",
        },
        darkerTheme: {
          primary: "#f280d0",
          secondary: "#f7b0d0",
          accent: "#ffbf80",
          neutral: "#d2d7e0",
          "base-100": "#292d37",
          info: "#bce6f0",
          success: "#d7eeeb",
          warning: "#f0ebe3",
          error: "#f0e2eb",
        },
      },
    ],
    darkTheme: "darkerTheme",
  },
  plugins: [require("daisyui")],
};
