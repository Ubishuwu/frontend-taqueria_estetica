
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#242856",

        "mark": "#293080",

        "secondary": "#FFFFFF",

        "accent": "#D9D9D9",

        "neutral": "#F3F4F6",

        "base-100": "#ECEDF0",

        "info": "#4449db",

        "info2": "#D056BB",

        "success": "#15b01a",

        "warning": "#80a5ff",

        "error": "#fb4b71",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake",{
      "sistemaGestor": {

        "primary": "#242856",

        "mark": "#293080",

        "secondary": "#FFFFFF",

        "accent": "#D9D9D9",

        "neutral": "#F3F4F6",

        "base-100": "#ECEDF0",

        "info": "#4449db",

        "info2": "#D056BB",

        "success": "#15b01a",

        "warning": "#80a5ff",

        "error": "#fb4b71",
      }
    }],
  },
}