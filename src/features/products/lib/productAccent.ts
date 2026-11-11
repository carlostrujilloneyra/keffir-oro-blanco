import type { Product } from '../types/product.type';

/* Acento de marca derivado del sabor del producto. Centralizado para que todas
   las cards de producto (coverflow, promo, etc.) usen la misma lógica y tokens. */

export type Tone = 'verde' | 'fucsia' | 'miel' | 'guisante' | 'azul' | 'arandano';

/* Categorías y subcategorías solo usan los tonos de bloque. */
export type SectionTone = Extract<Tone, 'verde' | 'miel'>;

export const toneStyles: Record<Tone, { halo: string; shadow: string; shadowStatic: string }> = {
  verde: {
    halo: 'bg-verde/15',
    shadow: 'group-hover:shadow-[5px_5px_0_0_theme(colors.verde.DEFAULT)]',
    shadowStatic: 'shadow-[6px_6px_0_0_theme(colors.verde.DEFAULT)]',
  },
  fucsia: {
    halo: 'bg-fucsia/15',
    shadow: 'group-hover:shadow-[5px_5px_0_0_theme(colors.fucsia.DEFAULT)]',
    shadowStatic: 'shadow-[6px_6px_0_0_theme(colors.fucsia.DEFAULT)]',
  },
  miel: {
    halo: 'bg-miel/25',
    shadow: 'group-hover:shadow-[5px_5px_0_0_theme(colors.miel.oscuro)]',
    shadowStatic: 'shadow-[6px_6px_0_0_theme(colors.miel.oscuro)]',
  },
  /* Violeta de la kombucha de flor de guisante: solo en el hero del inicio. */
  guisante: {
    halo: 'bg-guisante/25',
    shadow: 'group-hover:shadow-[5px_5px_0_0_theme(colors.guisante)]',
    shadowStatic: 'shadow-[6px_6px_0_0_theme(colors.guisante)]',
  },
  /* Azul de la kombucha de espirulina: el mismo glow que el slide de los naturales del hero. */
  azul: {
    halo: 'bg-[#2D8CE6]/25',
    shadow: 'group-hover:shadow-[5px_5px_0_0_#2D8CE6]',
    shadowStatic: 'shadow-[6px_6px_0_0_#2D8CE6]',
  },
  /* Índigo de la kombucha de arándanos: más azul que el guisante, más violeta que la espirulina. */
  arandano: {
    halo: 'bg-[#4A4FD8]/25',
    shadow: 'group-hover:shadow-[5px_5px_0_0_#4A4FD8]',
    shadowStatic: 'shadow-[6px_6px_0_0_#4A4FD8]',
  },
};

/* Fondo de los paneles oscuros por tono (hero del inicio, "Conoce el kéfir"): glow
   arriba a la derecha + glow abajo a la izquierda + base oscura. Es un valor de
   `background` en línea, no una clase. */
export const tonePanelBackground: Record<Tone, string> = {
  verde:
    'radial-gradient(120% 120% at 88% 12%, rgba(47,125,82,0.38), rgba(30,58,47,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(242,183,5,0.12), rgba(22,32,26,0) 60%),' +
    '#1B3227',
  fucsia:
    'radial-gradient(120% 120% at 88% 12%, rgba(209,30,130,0.34), rgba(163,20,95,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(163,20,95,0.20), rgba(22,32,26,0) 60%),' +
    '#2A1220',
  miel:
    'radial-gradient(120% 120% at 88% 12%, rgba(242,183,5,0.30), rgba(201,134,14,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(201,134,14,0.18), rgba(22,32,26,0) 60%),' +
    '#241B0E',
  guisante:
    'radial-gradient(120% 120% at 88% 12%, rgba(112,64,204,0.42), rgba(64,40,150,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(64,40,150,0.24), rgba(22,32,26,0) 60%),' +
    '#1A1430',
  azul:
    'radial-gradient(120% 120% at 88% 12%, rgba(45,140,230,0.38), rgba(1,120,228,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(1,120,228,0.20), rgba(6,15,30,0) 60%),' +
    '#0B1628',
  arandano:
    'radial-gradient(120% 120% at 88% 12%, rgba(74,79,216,0.44), rgba(40,40,150,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(40,40,150,0.26), rgba(22,32,26,0) 60%),' +
    '#101232',
};

export const accentFor = (product: Product): Tone => {
  const s = `${product.title} ${product.slug}`.toLowerCase();
  /* Kombuchas de sabor: el color de su ingrediente, antes que el miel de las kombuchas. */
  if (/guisante/.test(s)) return 'guisante';
  if (/espirulina/.test(s)) return 'azul';
  if (/kombucha.*ar[aá]ndano/.test(s)) return 'arandano';
  if (/kombucha.*pitahaya/.test(s)) return 'fucsia';
  if (/kombucha|agua|miel/.test(s)) return 'miel';
  if (/ar[aá]ndano|fresa|frut|mora|fruta|bosque/.test(s)) return 'fucsia';
  return 'verde';
};
