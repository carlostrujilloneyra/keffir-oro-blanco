import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        '18': '72px',
      },

      screens: {
        tablet: '600px',
        super_desktop: '1400px',
      },

      boxShadow: {
        strong: '0 20px 40px -10px rgba(0, 0, 0, 0.35)',
        'glow-light': '0 25px 50px -12px rgba(255, 255, 255, 0.1)',
      },

      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: '#1a1a1a',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '#D94A38',
          hover: '#D94A38',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        light: {
          '50': '#FFFFFF', // ✅ BLANCO PURO. Úsalo con moderación para máximo impacto (ej. el texto de un botón de color vivo).
          '100': '#F9FAFB', // BLANCO ROTO BRILLANTE. Ideal para títulos principales (h1, h2) que necesitan "pop".
          '200': '#F3F4F6', // BLANCO SUAVE. Excelente para párrafos principales y texto importante que necesita ser cómodo de leer.
          '300': '#E5E7EB', // GRIS MUY CLARO. Perfecto para texto de subtítulos o elementos de UI importantes como labels de inputs.
          '400': '#D1D5DB', // GRIS CLARO. Tu antiguo 'light-200', ahora ideal para texto de párrafo secundario.
          '500': '#9CA3AF', // GRIS MEDIO. Para texto 'muted' (metadatos, descripciones cortas).
          '600': '#6B7281', // GRIS OSCURO. Para iconos, bordes sutiles y texto que debe pasar a segundo plano.
          '700': '#4B5563', // GRIS MUY OSCURO. Ideal para bordes de contenedores o fondos de inputs deshabilitados.
          '800': '#374151', // CASI NEGRO. Para fondos de 'hover' sutiles sobre elementos oscuros.
        },
        gray: {
          '100': '#F5F5F5', // Fondos de página o contenedores muy claros.
          '300': '#C6C6C6', // Bordes sutiles, divisores, texto deshabilitado.
          '400': '#999999', // Texto secundario (placeholders, metadatos).
          '500': '#7D7D7D', // Párrafos con un tono más suave.
          '600': '#666666', // ✅ Texto de párrafo principal para máxima legibilidad.
          '700': '#333333', // Títulos secundarios (h3, h4).
          '800': '#1a1a1a', // Títulos principales (h2).
          '900': '#000000', // Negro puro para máximo contraste o fondos oscuros.
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        league_spartan: ['var(--font-league-spartan)', ...fontFamily.serif],
        inter: ['var(--font-inter)', ...fontFamily.serif],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
