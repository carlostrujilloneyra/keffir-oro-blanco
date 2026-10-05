import { type Product } from '../types/product.type';

/* Acento de marca derivado del sabor del producto. Centralizado para que todas
   las cards de producto (coverflow, promo, etc.) usen la misma lógica y tokens. */

export type Tone = 'verde' | 'fucsia' | 'miel';

export const toneStyles: Record<Tone, { halo: string; arrow: string; shadow: string; shadowStatic: string }> = {
  verde: {
    halo: 'bg-verde/15',
    arrow: 'bg-verde text-papel',
    shadow: 'group-hover:shadow-[5px_5px_0_0_#2F7D52]',
    shadowStatic: 'shadow-[6px_6px_0_0_#2F7D52]',
  },
  fucsia: {
    halo: 'bg-fucsia/15',
    arrow: 'bg-fucsia text-papel',
    shadow: 'group-hover:shadow-[5px_5px_0_0_#D11E82]',
    shadowStatic: 'shadow-[6px_6px_0_0_#D11E82]',
  },
  miel: {
    halo: 'bg-miel/25',
    arrow: 'bg-miel text-tinta',
    shadow: 'group-hover:shadow-[5px_5px_0_0_#C9860E]',
    shadowStatic: 'shadow-[6px_6px_0_0_#C9860E]',
  },
};

export const accentFor = (product: Product): Tone => {
  const s = `${product.title} ${product.slug}`.toLowerCase();
  if (/aguaymanto|kombucha|agua|miel/.test(s)) return 'miel';
  if (/ar[aá]ndano|fresa|frut|mora|fruta|bosque/.test(s)) return 'fucsia';
  return 'verde';
};
