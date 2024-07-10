import type { Config } from 'tailwindcss';
// TODO: add text shadow utility
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
        black: {
          '50': '#f3f4f8',
          '100': '#e1e3ec',
          '200': '#c5c9dc',
          '300': '#9ea4c2',
          '400': '#6e76a2',
          '500': '#535a87',
          '600': '#474a73',
          '700': '#3f415f',
          '800': '#393a51',
          '900': '#333346',
          '950': '#020203',
        },
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
