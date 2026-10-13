import type { Product } from '../types/product.type';

/* Acento de marca derivado del sabor del producto. Centralizado para que todas
   las cards de producto (coverflow, promo, etc.) usen la misma lógica y tokens. */

export type Tone = 'verde' | 'fucsia' | 'miel';

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
};

export const accentFor = (product: Product): Tone => {
  const s = `${product.title} ${product.slug}`.toLowerCase();
  if (/aguaymanto|kombucha|agua|miel/.test(s)) return 'miel';
  if (/ar[aá]ndano|fresa|frut|mora|fruta|bosque/.test(s)) return 'fucsia';
  return 'verde';
};
