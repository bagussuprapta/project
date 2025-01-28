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
      "rose-light": "inset 0 2px 0 0 #fda4af, inset 0 -2px 0 0 #9f1239",
      "rose-normal": "inset 0 2px 0 0 #fb7185, inset 0 -2px 0 0 #881337",
      "liver-light": "inset 0 2px 0 0 #c3a3b7, inset 0 -2px 0 0 #5b404e",
      "liver-normal": "inset 0 2px 0 0 #ae869e, inset 0 -2px 0 0 #34232c",
      "chestnut-light": "inset 0 2px 0 0 #ba9e8f, inset 0 -2px 0 0 #613f40",
      "chestnut-normal": "inset 0 2px 0 0 #aa8475, inset 0 -2px 0 0 #513637",
      "hookers-light": "inset 0 2px 0 0 #c4d6cb, inset 0 -2px 0 0 #304c3f",
      "hookers-normal": "inset 0 2px 0 0 #9cb9a8, inset 0 -2px 0 0 #273e33",
    },
  },
  plugins: [],
};
