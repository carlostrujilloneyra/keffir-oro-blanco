import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        '18': '72px',
        section: '96px',
      },

      screens: {
        tablet: '600px',
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
          suave: '#5F665B', // metadatos, labels (≥ 4.5:1 sobre papel-hueso)
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

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        // Títulos — DM Sans (variable --font-heading, ver app/layout.tsx).
        display: ['var(--font-heading)', ...fontFamily.sans],
        // Cuerpo / UI / botones / spans — Inter.
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      fontSize: {
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
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
      transitionTimingFunction: {
        suave: 'cubic-bezier(0.32, 0.72, 0, 1)', // Salida suave para hovers y entradas
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
    /* Container query: `cq` marca el contenedor; `cq-sm:` aplica si mide ≥ 13rem. */
    plugin(({ addUtilities, addVariant }) => {
      addUtilities({
        '.cq': { 'container-type': 'inline-size' },
        // Oculta la barra de scroll sin quitar el desplazamiento (dedo, trackpad, teclado).
        '.scrollbar-none': { 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' } },
      });
      addVariant('cq-sm', '@container (min-width: 13rem)');
    }),
  ],
};
export default config;
