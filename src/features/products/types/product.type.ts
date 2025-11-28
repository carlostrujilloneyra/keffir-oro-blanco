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
  name: string; // El slug (nombre URL-friendly)
  slug: string; // Slug generado automáticamente
  title: string;
  isNew?: boolean;
  linkUrl: string;
  tags?: BadgeType[];
  hasDifferentOrder?: boolean;
  presentations?: ProductVariant[];

  // Rutas a las imágenes
  bgImageSrc?: string; // Para el fondo de la tarjeta del carrusel
  featuredImage?: string; // La imagen "hero" para el modal
  thumbnailImage: string; // Para tarjetas pequeñas (a futuro)
  galleryImages?: string[]; // Imágenes para la vista detalla del producto

  /* Descripciones, textos largos o cortos */
  shortDescription: string; // Para tarjetas
  longDescription?: React.ReactNode; // El JSX para la vista de detalle
  benefits?: string[];
  howToUse?: string;

  details?: ProductTab[];
}
