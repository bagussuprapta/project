/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      nunito: ["Nunito", "monospace"],
      mono: ["monospace"],
    },
    boxShadow: {
      "lime-light": "inset 0 2px 0 0 #d9f99d, inset 0 -2px 0 0 #65a30d",
      "lime-normal": "inset 0 2px 0 0 #a3e635, inset 0 -2px 0 0 #65a30d",
    },
  },
  plugins: [],
};
