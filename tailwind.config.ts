import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'title-color': {
          700: '#141414',
          800: '#0A0A0A',
        },

        'color-text': {
          400: '#333',
        },

        'color-button': {
          green: '#25A244',
          hover: '#2DC653',
        },
      },
      fontFamily: {
        league_spartan: ['var(--font-league-spartan)', ...fontFamily.serif],
        public_sans: ['var(--font-public-sans)', ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
export default config;
