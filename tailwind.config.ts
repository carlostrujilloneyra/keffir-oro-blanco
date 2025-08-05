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
      screens: {
        tablet: '600px',
      },
      colors: {
        primary: {
          DEFAULT: '#000000',
          hover: '#1A1A1A',
        },

        secondary: {
          DEFAULT: '#f55947',
          hover: '#D94A38',
        },

        promotional: {
          chocolate: '#D2B48C',
        },

        light: {
          100: '#F9F9F9', // Para títulos principales (muy cercano al blanco)
          200: '#D1D5DB', // ✅ Ideal para párrafos y cuerpo de texto
          300: '#9CA3AF', // Para texto secundario o 'muted'
          400: '#6B7281', // Para íconos o elementos menos importantes
        },

        gray: {
          900: '#000000', // Títulos h1 y fondos oscuros
          800: '#1a1a1a', // Títulos h2
          700: '#333333', // Títulos h3
          600: '#666666', // Un gris para párrafos con un poco más de contraste
          500: '#7D7D7D', // Párrafos
          400: '#999999', // Texto secundario (muted)
          300: '#C6C6C6', // Texto para botones oscuros
          100: '#F5F5F5', // Texto para botones de color (casi blanco)
        },
      },
      fontFamily: {
        league_spartan: ['var(--font-league-spartan)', ...fontFamily.serif],
        inter: ['var(--font-inter)', ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
export default config;
