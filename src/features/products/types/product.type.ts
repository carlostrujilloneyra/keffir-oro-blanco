import { ProductCategory } from '@/features/products';
import { BadgeType } from '../data/badgeConfig';

export interface ProductTab {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  stock?: number;
}
export interface Product {
  id: string;
  category: ProductCategory;
  price: number;
  /* Clave de familia, NO un slug. Todas las tallas del mismo producto comparten
     `name` ('kefir-leche-vaca'); es lo que agrupa a las hermanas y lo que usan
     getSizeVariants() y las subcategorías. El slug de la URL es `slug`. */
  name: string;

  slug: string; // Derivado: `name` + talla compacta (lo calcula make()).
  title: string;
  isNew?: boolean;

  /* Derivado de `slug`. No es dato: lo calcula make() con getProductUrl(). */
  linkUrl: string;

  tags?: BadgeType[];

  /* Disponibilidad real de este SKU. Ausente = disponible. Se publica en el
     JSON-LD, así que marcarlo false también lo comunica a Google. */
  available?: boolean;

  /* Talla de este SKU (ej. '1 L', '475 ml'). Cada presentación es un producto
     propio; las hermanas se agrupan por el campo `name` (mismo grupo). */
  size?: string;

  presentations?: ProductVariant[];

  /* Color del glow (rgba) para el fondo del modal de detalle. Si no se define,
     se deriva del sabor con accentGlow(). */
  accentColor?: string;

  // Rutas a las imágenes
  bgImageSrc?: string; // Para el fondo de la tarjeta del carrusel
  featuredImage?: string; // La imagen "hero" para el modal
  thumbnailImage: string; // Para tarjetas pequeñas (a futuro)
  galleryImages?: string[]; // Imágenes para la vista detalla del producto
  /* Imagen para compartir en redes (og:image): horizontal 1200×630, JPG < 300 KB.
    Convención: <carpeta del producto>/share.jpg. Si falta, se usa thumbnailImage. */
  shareImage?: string;

  /* Descripciones, textos largos o cortos */
  shortDescription: string; // Para tarjetas
  longDescription?: React.ReactNode; // El JSX para la vista de detalle
  /* Texto plano con **negrita**. Se renderiza con inlineMarkdown(). No es JSX
     a propósito: así el campo se serializa y puede venir de una API o un CMS. */
  benefits?: string[];
  howToUse?: React.ReactNode; // Cambiar de string a React.ReactNode
  shelfLife?: string; // Tiempo de vida del producto

  details?: ProductTab[];
}
