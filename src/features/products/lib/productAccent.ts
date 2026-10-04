import { type Product } from '../types/product.type';

/* Acento de marca derivado del sabor del producto. Centralizado para que todas
   las cards de producto (coverflow, promo, etc.) usen la misma lógica y tokens. */

export type Tone = 'verde' | 'fucsia' | 'miel';

export const toneStyles: Record<
  Tone,
  { dot: string; halo: string; arrow: string; shadow: string; shadowStatic: string }
> = {
  verde: {
    dot: 'bg-verde',
    halo: 'bg-verde/15',
    arrow: 'bg-verde text-papel',
    shadow: 'group-hover:shadow-[5px_5px_0_0_#2F7D52]',
    shadowStatic: 'shadow-[6px_6px_0_0_#2F7D52]',
  },
  fucsia: {
    dot: 'bg-fucsia',
    halo: 'bg-fucsia/15',
    arrow: 'bg-fucsia text-papel',
    shadow: 'group-hover:shadow-[5px_5px_0_0_#D11E82]',
    shadowStatic: 'shadow-[6px_6px_0_0_#D11E82]',
  },
  miel: {
    dot: 'bg-miel',
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

/* Glow (rgba) para fondos oscuros (ej. modal de detalle). Usa el color explícito
   del producto si existe; si no, lo deriva del sabor. Así, un producto nuevo
   (ej. kéfir de frutos del bosque) obtiene su glow sin tocar SCSS. */
const toneGlow: Record<Tone, string> = {
  verde: 'rgba(47, 125, 82, 0.45)',
  fucsia: 'rgba(209, 30, 130, 0.4)',
  miel: 'rgba(242, 183, 5, 0.4)',
};

export const accentGlow = (product: Product): string => product.accentColor ?? toneGlow[accentFor(product)];
