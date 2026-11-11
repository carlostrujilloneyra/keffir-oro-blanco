import type { ProductCategory } from '../data/categories';
import type { BadgeType } from '../data/badgeConfig';
import type { SubcategorySlug } from '../data/subcategoryIndex';

/* Ausente = 'available'. Se publica en el JSON-LD (InStock / PreOrder / OutOfStock). */
export type ProductAvailability = 'available' | 'coming-soon' | 'sold-out';

/* SKU plano: una talla concreta. Se genera desde una ProductFamily (data/products.tsx). */
export interface Product {
  id: string;
  category: ProductCategory;
  price: number;
  /* Clave de familia, NO un slug. Todas las tallas del mismo producto comparten
     `name` ('kefir-leche-vaca'); es lo que agrupa a las hermanas y lo que usan
     getSizeVariants() y las subcategorías. El slug de la URL es `slug`. */
  name: string;

  /* Nombre corto del sabor o producto ("Fresa", "Vaca"): chips del hero de subcategoría y mini-cards del inicio. Sin él, el título sin talla. */
  shortName?: string;

  slug: string; // Derivado: `name` + talla compacta.
  title: string;

  tags?: BadgeType[];

  availability?: ProductAvailability;

  /* Lleva leche o derivados. Ausente = sin lácteos (el menú lo usa para guiar a intolerantes). */
  containsDairy?: boolean;

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

/* Lo que una variante puede cambiar respecto de su familia (SKUs con foto o texto propios). */
type VariantOverrides = Partial<
  Pick<
    Product,
    | 'title'
    | 'featuredImage'
    | 'thumbnailImage'
    | 'galleryImages'
    | 'shareImage'
    | 'shortDescription'
    | 'longDescription'
    | 'benefits'
    | 'howToUse'
    | 'shelfLife'
  >
>;

/* Una talla de la familia: solo lo que cambia entre presentaciones. */
export interface ProductVariant extends VariantOverrides {
  id: string;
  size?: string;
  price: number;
  tags?: BadgeType[];
  availability?: ProductAvailability;
}

/*
  Producto con todas sus tallas. Los datos comunes se escriben una vez; cada
  variante genera un Product con title = `title` + talla y slug = `name` + talla compacta.
  La categoría se deriva de `subcategory`.
*/
export interface ProductFamily
  extends Pick<
    Product,
    | 'name'
    | 'shortName'
    | 'containsDairy'
    | 'featuredImage'
    | 'thumbnailImage'
    | 'galleryImages'
    | 'shareImage'
    | 'shortDescription'
    | 'longDescription'
    | 'benefits'
    | 'howToUse'
    | 'shelfLife'
  > {
  subcategory: SubcategorySlug;
  title: string; // Sin talla
  variants: ProductVariant[];
}
