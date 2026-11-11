import type { ProductCategory } from './categories';
import { allProducts, productFamilies } from './products';
import { subcategoryCategory, type SubcategorySlug } from './subcategoryIndex';
import { getAvailableFromPrice, getProductGroups } from './collections';
import type { Product } from '../types/product.type';
import type { SectionTone } from '../lib/productAccent';
import { getProductImage } from '../lib/productDisplay';

export interface SubcategoryDetail {
  slug: SubcategorySlug;
  /* Derivada de subcategoryIndex. */
  category: ProductCategory;
  title: string;
  eyebrow: string;
  description: string;
  tone: SectionTone;
  /*
    Hero "etiqueta": fondo oscuro y luz con los colores de la etiqueta del producto
    (medidos en sus fotos). La categoría usa el de su primera subcategoría.
  */
  panel: SubcategoryPanel;
  /* Título de los accesos a productos del hero; por defecto "Elige tu sabor". */
  chipsTitle?: string;

  /*
    Grupos de producto que forman la subcategoría, por `Product.name`. Derivado:
    las familias cuya `subcategory` es este slug, en el orden de productFamilies.
  */
  productNames: string[];

  /* Si no se define, se toma la imagen del primer producto del grupo. */
  imageUrl?: string;
  /* Agranda la imagen del hero desde lg (anclada abajo) sin cambiar el layout; útil para grupos de varias botellas. Por defecto 1. */
  imageScale?: number;

  /* Tabla "¿A o B?" bajo la grilla. Las claves son `Product.name` de esta subcategoría;
     la fila de precio "Desde" se calcula de los datos. */
  comparison?: SubcategoryComparison;
}

export interface SubcategoryPanel {
  backdrop: string;
  glow: string;
}

export interface SubcategoryComparison {
  title: string;
  columns: Record<string, string>;
  rows: { label: string; values: Record<string, string> }[];
}

/*
  Segundo nivel del catálogo: /categorias/<categoria>/<subcategoria>.

  Existe porque las dos categorías son demasiado amplias — 'Probióticos'
  tenía que servir a la vez para kéfir de leche, kombucha y chucrut. Cada
  subcategoría es una página propia que Google puede posicionar por una
  intención concreta.
*/
const subcategoryContent: Omit<SubcategoryDetail, 'category' | 'productNames'>[] = [
  /* ── Probióticos ──────────────────────────────────────────────────────── */
  {
    slug: 'kefir-natural',
    chipsTitle: 'Elige tu leche',
    title: 'Kéfir de leche natural',
    eyebrow: 'Fermentación viva',
    description:
      'Kéfir de leche de vaca y de cabra, sin fruta ni azúcar añadida. Con cultivos activos, en presentaciones de 1 L, 475 ml y 250 ml.',
    tone: 'verde',
    panel: { backdrop: '#060F1E', glow: '#0178E4' },
    imageUrl: '/assets/images/content/products/kefir-de-leche/hero.webp',
    comparison: {
      title: '¿Vaca o cabra?',
      columns: { 'kefir-leche-vaca': 'Vaca', 'kefir-leche-cabra': 'Cabra' },
      rows: [
        {
          label: 'Leche',
          values: {
            'kefir-leche-vaca': 'De vaca de establo',
            'kefir-leche-cabra': 'De cabra de libre pastoreo del Valle de Canta',
          },
        },
        {
          label: 'Sabor',
          values: {
            'kefir-leche-vaca': 'Suave y cremoso',
            'kefir-leche-cabra': 'Característico y ligeramente ácido',
          },
        },
      ],
    },
  },
  {
    slug: 'kefir-frutado',
    title: 'Kéfir con fruta y chocolate',
    eyebrow: 'Fermento con fruta',
    description:
      'La cremosidad del kéfir con pulpa de fruta real, endulzado con stevia. Fresa, arándanos, frutos del bosque y chocolate.',
    tone: 'verde',
    panel: { backdrop: '#1B0511', glow: '#FB035E' },
    imageUrl: '/assets/images/subcategories/kefir-frutado.webp',
    imageScale: 1.1,
  },
  {
    slug: 'kombucha-y-kefir-de-agua',
    title: 'Kombucha y kéfir de agua',
    eyebrow: 'Sin lácteos',
    description:
      'Kombucha natural en 1 L y 475 ml, y kéfir de agua. Además, 4 sabores de kombucha en 275 ml y 355 ml que llegan pronto. Sin lácteos, ligeras y burbujeantes.',
    tone: 'verde',
    panel: { backdrop: '#130F25', glow: '#7040CC' },
  },
  {
    slug: 'fermentados',
    chipsTitle: 'Elige tu producto',
    title: 'Para untar y acompañar',
    eyebrow: 'Cultivos vivos',
    description:
      'Chucrut morado y crema de kéfir con aceitunas. Fermentados de mesa con probióticos naturales, para acompañar y untar.',
    tone: 'verde',
    panel: { backdrop: '#1B0511', glow: '#FB035E' },
    imageUrl: '/assets/images/content/products/chucrut-morado/featured.webp',
  },

  /* ── Tradicionales ────────────────────────────────────────────────────── */
  {
    slug: 'para-cocinar',
    chipsTitle: 'Elige tu producto',
    title: 'Para cocinar y sazonar',
    eyebrow: 'Saberes ancestrales',
    description:
      'Los básicos de la cocina de casa: manteca de cerdo artesanal para freír y hornear y sal rosada de Maras.',
    tone: 'miel',
    panel: { backdrop: '#190C05', glow: '#F6BC02' },
    imageUrl: '/assets/images/categories/manteca-de-cerdo.webp',
  },
  {
    slug: 'mermeladas',
    title: 'Mermeladas',
    eyebrow: 'Fruta y paciencia',
    description:
      'Mermeladas artesanales hechas con pulpa de fruta y endulzadas con stevia, sin colorantes ni conservantes: fresa, arándanos y quito quito de Oxapampa.',
    tone: 'miel',
    panel: { backdrop: '#1C0706', glow: '#AC0102' },
    imageUrl: '/assets/images/subcategories/mermeladas.webp',
  },
];

export const subcategoryDetails: SubcategoryDetail[] = subcategoryContent.map((sub) => ({
  ...sub,
  category: subcategoryCategory[sub.slug],
  productNames: productFamilies.filter((family) => family.subcategory === sub.slug).map((family) => family.name),
}));

/* Productos de una subcategoría, en el orden de `productNames`. */
export const getSubcategoryProducts = (subcategory: SubcategoryDetail): Product[] =>
  subcategory.productNames.flatMap((name) => allProducts.filter((product) => product.name === name));

export const getSubcategorySummary = (subcategory: SubcategoryDetail) => {
  const products = getSubcategoryProducts(subcategory);
  const groups = getProductGroups(products);

  return {
    products,
    groups,
    count: groups.length,
    fromPrice: getAvailableFromPrice(products),
  };
};

/* Imagen del hero:la propia si se definió, si no la del primer producto. */
export const getSubcategoryImage = (subcategory: SubcategoryDetail): string => {
  if (subcategory.imageUrl) return subcategory.imageUrl;

  const [first] = getSubcategoryProducts(subcategory);
  return first ? getProductImage(first) : '';
};

/*
  Resuelve los dos segmentos de la URL. Devuelve null si el par no existe o si
  la subcategoría no pertenece a esa categoría (evita que
  /categorias/tradicionales/kombucha responda 200).
*/
export const resolveSubcategory = (categoriaSlug: string, subcategoriaSlug: string): SubcategoryDetail | null => {
  const found = subcategoryDetails.find((sub) => sub.slug === subcategoriaSlug);
  if (!found) return null;

  return found.category === categoriaSlug ? found : null;
};
