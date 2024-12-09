/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        text: '#cad3f5',
        subtext1: '#b8c0e0',
        subtext0: '#a5adcb',
        overlay2: '#939ab7',
        overlay1: '#8087a2',
        overlay0: '#6e738d',
        surface2: '#5b6078',
        surface1: '#494d64',
        surface0: '#363a4f',
        base: '#24273a',
        mantle: '#1e2030',
        crust: '#181926',
        yellow: '#eed49f',
        green: '#a6da95',
        sapphire: '#7dc4e4',
        teal: '#8bd5ca',
        sky: '#91d7e3',
        blue: '#8aadf4',
        lavender: '#b7bdf8',
        peach: '#f5a97f',
        maroon: '#ee99a0',
        red: '#ed8796',
        mauve: '#c6a0f6',
        pink: '#f5bde6',
        flamingo: '#f0c6c6',
        rose: '#f4dbd6',
      },
    },
  },
  plugins: [],
};