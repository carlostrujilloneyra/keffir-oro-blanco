import { ProductCategory } from '@/features/products';
import { BadgeType } from '../data/badgeConfig';

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

  tags?: BadgeType[];

  /* Disponibilidad real de este SKU. Ausente = disponible. Se publica en el
     JSON-LD, así que marcarlo false también lo comunica a Google. */
  available?: boolean;

  /* Talla de este SKU (ej. '1 L', '475 ml'). Cada presentación es un producto
     propio; las hermanas se agrupan por el campo `name` (mismo grupo). */
  size?: string;

  // Rutas a las imágenes
  featuredImage?: string; // Imagen principal de la ficha
  thumbnailImage: string; // Cards y listados
  galleryImages?: string[]; // Galería de la ficha
  /* Imagen para compartir en redes (og:image): horizontal 1200×630, JPG < 300 KB.
    Convención: <carpeta del producto>/share.jpg. Si falta, se usa thumbnailImage. */
  shareImage?: string;

  shortDescription: string; // Para tarjetas
  longDescription?: React.ReactNode; // JSX de la ficha
  /* Texto plano con **negrita**. Se renderiza con inlineMarkdown(). No es JSX
     a propósito: así el campo se serializa y puede venir de una API o un CMS. */
  benefits?: string[];
  howToUse?: React.ReactNode;
  shelfLife?: string;
}
