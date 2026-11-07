import type { Tone } from '@/features/products';

export type HeroSlide = {
  /* Título, precio, URL e imagen de respaldo salen del producto. */
  productId: string;
  /* Nombre corto de la mini-card. */
  flavor: string;
  tone: Tone;
  /* El tag 'new' del producto lo reemplaza por "Nuevo". */
  eyebrow: string;
  headline: string;
  /*
    Foto de fondo 16:9 (2400×1350). Llenar `image` y `video` solo cuando el archivo
    exista: sin ellos, el slide muestra la botella sobre el degradado de su tono.
  */
  image?: string;
  video?: { mp4: string; webm: string; poster: string };
};

export const heroSlides: HeroSlide[] = [
  {
    productId: 'kefir-frutos-bosque',
    flavor: 'Frutos del bosque',
    tone: 'fucsia',
    eyebrow: '4 frutos en 1',
    headline: 'Cuatro frutos en una sola botella',
  },
  {
    productId: 'kefir-fresa',
    flavor: 'Fresa',
    tone: 'fucsia',
    eyebrow: 'Más vendido',
    headline: 'Kéfir cremoso con pulpa de fresa',
  },
  {
    productId: 'kefir-arandanos',
    flavor: 'Arándanos',
    tone: 'fucsia',
    eyebrow: 'Más vendido',
    headline: 'Kéfir cremoso con pulpa de arándanos',
  },
  {
    productId: 'kefir-vaca-1l',
    flavor: 'Natural',
    tone: 'verde',
    eyebrow: 'El clásico',
    headline: 'Kéfir natural, fermentado lote a lote',
  },
];
