import type { Tone } from '@/features/products';

export type HeroVideo = { mp4: string; webm: string; poster: string };

export type HeroImage = {
  src: string;
  /* Color sólido del fondo de la foto, medido en sus píxeles: el panel entero lo usa para que no se note el borde. */
  backdrop: string;
  /* Luz detrás del título, del color del sabor. */
  glow: string;
  /*
    Centro del producto en la foto ('x% y%'), medido sobre sus píxeles (caja de lo
    que no es fondo). En mobile la foto se desplaza para dejarlo al centro; desde lg
    es el object-position.
  */
  focus: string;
};

type BaseSlide = {
  tone: Tone;
  /* Copy editorial: no lo reemplaza ningún tag del producto. */
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel: string;
  /*
    Foto de fondo en public/assets/images/hero/: WebP 3:2, fondo oscuro liso del color
    del slide, producto en el tercio derecho y lado izquierdo vacío para el texto.
    Si el archivo aún no existe, el slide muestra las botellas sobre el degradado
    de su tono (se comprueba en el servidor).
  */
  image?: HeroImage;
  video?: HeroVideo;
  /* true = solo en desarrollo (mismo criterio que los packs). */
  draft?: boolean;
};

export type HeroSlide = BaseSlide &
  /* La mini-card usa el `shortName` del producto. */
  (| { kind: 'product'; productId: string }
    /* Precio "Desde" (el menor de `productIds`) y enlace a la subcategoría. */
    | { kind: 'collection'; productIds: string[]; subcategory: string; flavor: string }
  );

/* TODO: manteca-580 → foto sola del frasco con la etiqueta TRIALFERI (la actual también muestra la sal de Maras). */
export const heroSlides: HeroSlide[] = [
  {
    kind: 'product',
    productId: 'kefir-frutos-bosque',
    tone: 'fucsia',
    eyebrow: 'El más pedido',
    headline: '4 frutos en una sola botella',
    description: 'Fresa, frambuesa, arándano y zarzamora con pulpa real. Endulzado con stevia.',
    ctaLabel: 'Quiero probarlo',
    image: {
      src: '/assets/images/hero/frutos-del-bosque.webp',
      backdrop: '#1B0511',
      focus: '75% 52%',
      glow: '#D11E82',
    },
  },
  {
    kind: 'collection',
    productIds: ['kefir-vaca-1l', 'kefir-cabra-1l'],
    subcategory: 'kefir-natural',
    flavor: 'Natural vaca o cabra',
    tone: 'verde',
    eyebrow: '¿Vaca o cabra?',
    headline: 'Kéfir de verdad, hecho a mano',
    description: 'Fermentado lote a lote con nódulos vivos. Leche de vaca de establo o de cabra de libre pastoreo.',
    ctaLabel: 'Elige el tuyo',
    image: { src: '/assets/images/hero/naturales.webp', backdrop: '#060F1E', focus: '76% 51%', glow: '#2D8CE6' },
  },
  {
    kind: 'collection',
    productIds: ['kombucha-espirulina-azul', 'kombucha-flor-de-guisante', 'kombucha-arandanos', 'kombucha-pitahaya'],
    subcategory: 'kombucha-y-kefir-de-agua',
    flavor: 'Kombuchas',
    tone: 'guisante',
    eyebrow: 'Próximamente',
    headline: 'Cuatro kombuchas, cuatro colores',
    description: 'Espirulina azul, flor de guisante, arándanos y pitahaya. Burbujeantes y sin lácteos.',
    ctaLabel: 'Descúbrelas',
    image: { src: '/assets/images/hero/kombuchas.webp', backdrop: '#130F25', focus: '74% 50%', glow: '#7040CC' },
  },
  {
    kind: 'product',
    productId: 'manteca-580',
    tone: 'miel',
    eyebrow: 'Dura 1 año',
    headline: 'Manteca de cerdo artesanal',
    description: 'Hecha a la antigua, sin aditivos ni conservantes. Para freír, hornear y darle sabor a tus guisos.',
    ctaLabel: 'Ver presentaciones',
    image: { src: '/assets/images/hero/manteca.webp', backdrop: '#190C05', focus: '76% 49%', glow: '#F2B705' },
  },
];
