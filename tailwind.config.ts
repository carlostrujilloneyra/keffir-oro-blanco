import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        '18': '72px',
        section: '96px',
        'section-lg': '160px',
      },

      screens: {
        tablet: '600px',
        super_desktop: '1400px',
      },

      boxShadow: {
        hard: '4px 4px 0 0 #16201A',
        'hard-sm': '3px 3px 0 0 #16201A',
        'hard-fucsia': '4px 4px 0 0 #D11E82',
        strong: '0 20px 40px -10px rgba(22, 32, 26, 0.28)',
        'glow-light': '0 25px 50px -12px rgba(255, 255, 255, 0.1)',
      },

      backgroundImage: {
        // Gradientes de marca (con motivo: el líquido del fermento y las etiquetas).
        'gradient-verde': 'linear-gradient(135deg, #2F7D52 0%, #1E3A2F 100%)',
        'gradient-fucsia': 'linear-gradient(135deg, #D11E82 0%, #A3145F 100%)',
        'gradient-miel': 'linear-gradient(135deg, #F2B705 0%, #C9860E 100%)',
      },

      colors: {
        /* ── Paleta "Fermento vivo" ──────────────────────────────────
          Verde = bloques y acción (evoca el fermento vivo).
          Papel = fondos cálidos casi blancos (NUNCA blanco puro).
          Tinta = texto (verde-carbón, NO #000).
          Fucsia y Miel = acentos vivos tomados de las etiquetas físicas.
         */
        papel: {
          DEFAULT: '#F7F5EF', // fondo base de página
          hueso: '#EFEBE0', // secciones alternas, fondos de tarjeta
          sombra: '#E0D9CA', // bordes suaves, divisores
        },
        tinta: {
          DEFAULT: '#16201A', // texto principal (verde-carbón)
          media: '#3A463D', // párrafos
          suave: '#6E756A', // metadatos, labels
        },
        bosque: '#1E3A2F', // bloques oscuros, hero, footer (verde profundo)
        verde: {
          DEFAULT: '#2F7D52', // acción / acento vivo
          oscuro: '#1E3A2F', // hover / fin del gradiente
        },
        fucsia: {
          DEFAULT: '#D11E82', // acento de etiqueta (CTA especial)
          oscuro: '#A3145F', // fin del gradiente fucsia
        },
        miel: {
          DEFAULT: '#F2B705', // acento de etiqueta (destaques cálidos)
          oscuro: '#C9860E', // fin del gradiente miel
        },

        primary: {
          DEFAULT: 'hsl(var(--primary))', // verde
          hover: '#1E3A2F',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '#1E3A2F', // bosque
          hover: '#16201A',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        light: {
          '50': '#FAF9F4',
          '100': '#F7F5EF',
          '200': '#EFEBE0',
          '300': '#E0D9CA',
          '400': '#C4BEB0',
          '500': '#A7A295',
          '600': '#8B877B',
          '700': '#6E756A',
          '800': '#3A463D',
        },
        gray: {
          '100': '#EFEBE0',
          '300': '#E0D9CA',
          '400': '#9AA093',
          '500': '#6E756A',
          '600': '#3A463D',
          '700': '#2A342C',
          '800': '#1E2A22',
          '900': '#16201A',
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
        // Títulos — DM Sans (variable --font-heading, ver app/layout.tsx).
        display: ['var(--font-heading)', ...fontFamily.sans],
        // Cuerpo / UI / botones / spans — Inter.
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.16em' }],
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        headline: ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        title: ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        measure: '68ch',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '3px',
        md: '3px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        '3xl': '6px',
        card: '12px', // Superficies tipo card
        panel: '28px', // Bloques grandes (heros, secciones oscuras)
        full: '9999px',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    /* Container query: `cq` marca el contenedor; `cq-sm:` aplica si mide ≥ 13rem. */
    plugin(({ addUtilities, addVariant }) => {
      addUtilities({ '.cq': { 'container-type': 'inline-size' } });
      addVariant('cq-sm', '@container (min-width: 13rem)');
    }),
  ],
};
export default config;
