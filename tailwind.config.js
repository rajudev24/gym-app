/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sm: '0px 0px 16px 0px rgba(0, 0, 0, 0.1)',
        md: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)'
        
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#c964db",
          secondary: "#F1A0FF",
          accent: "#726ee4",
          neutral: "#f7f7fb",
          third: "#3B387B",
          "base-100": "#ffffff",
          "semiMain": "#5c5bbd"
        },
        colors: {
          "cl-zink-100": "#99a1b1",
        },
      },
    ],
  },
};
