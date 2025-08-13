import { ProductCategory } from '@/features/products';

export interface ProductTab {
  id: string;
  title: string;
  content: React.ReactNode;
}
export interface Product {
  id: string;
  category: ProductCategory;
  name: string; // El slug
  title: string;
  isNew?: boolean;

  /* Descripciones, textos largos o cortos */
  shortDescription: string; // Para tarjetas
  longDescription: React.ReactNode; // El JSX para la vista de detalle

  // Rutas a las imágenes
  bgImageSrc: string; // Para el fondo de la tarjeta del carrusel
  featuredImage: string; // La imagen "hero" para el modal
  thumbnailImage: string; // Para tarjetas pequeñas (a futuro)
  galleryImages?: string[];

  details?: ProductTab[];

  linkUrl: string;

  tags?: ('new' | 'best-seller')[];

  hasDifferentOrder?: boolean;
}
