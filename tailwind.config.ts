import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple-heart': {
          '50': '#eef0ff',
          '100': '#e0e4ff',
          '200': '#c6ccff',
          '300': '#a4a9fd',
          '400': '#8280f9',
          '500': '#6e61f3',
          '600': '#593de6',
          '700': '#5236cc',
          '800': '#432fa4',
          '900': '#392d82',
          '950': '#221a4c',
        },
        viking: {
          '50': '#ecfeff',
          '100': '#d0fafd',
          '200': '#a7f3fa',
          '300': '#6ae9f6',
          '400': '#20d2e9',
          '500': '#0ab7d0',
          '600': '#0c92ae',
          '700': '#11748d',
          '800': '#175f73',
          '900': '#184e61',
          '950': '#093343',
        },
      },
    },
  },
  plugins: [],
};
export default config;
