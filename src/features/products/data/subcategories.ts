import { ProductCategory, categoryDetails } from './categories';
import { allProducts } from './products';
import type { Product } from '../types/product.type';

export type SubcategoryTone = 'verde' | 'miel';

export interface SubcategoryDetail {
  slug: string;
  category: ProductCategory;
  title: string;
  eyebrow: string;
  description: string;
  tone: SubcategoryTone;

  /*
    Grupos de producto que forman la subcategoría, por `Product.name`.
    Se agrupa por `name` y no por slug para que las tallas hermanas entren
    juntas sin listarlas una a una: 'kefir-leche-vaca' arrastra 1 L, 475 y 250.
  */
  productNames: string[];

  /* Si no se define, se toma la imagen del primer producto del grupo. */
  imageUrl?: string;
}

/*
  Segundo nivel del catálogo: /categorias/<categoria>/<subcategoria>.

  Existe porque las dos categorías son demasiado amplias — 'Probióticos'
  tenía que servir a la vez para kéfir de leche, kombucha y chucrut. Cada
  subcategoría es una página propia que Google puede posicionar por una
  intención concreta.
*/
export const subcategoryDetails: SubcategoryDetail[] = [
  /* ── Probióticos ──────────────────────────────────────────────────────── */
  {
    slug: 'kefir-natural',
    category: ProductCategory.PROBIOTICOS,
    title: 'Kéfir de leche natural',
    eyebrow: 'Fermentación viva',
    description:
      'Kéfir de leche de vaca y de cabra, sin fruta ni azúcar añadida. Cultivos activos fermentados en frío, en las presentaciones de 1 L, 475 ml y 250 ml.',
    tone: 'verde',
    productNames: ['kefir-leche-vaca', 'kefir-leche-cabra'],
    imageUrl: '/assets/images/content/products/kefir-de-leche/featured.webp',
  },
  {
    slug: 'kefir-frutado',
    category: ProductCategory.PROBIOTICOS,
    title: 'Kéfires frutados',
    eyebrow: 'Fermento con fruta',
    description:
      'La cremosidad del kéfir con pulpa de fruta real, endulzado con stevia. Fresa, arándanos, aguaymanto, frutos del bosque y chocolate.',
    tone: 'verde',
    productNames: [
      'kefir-pulpa-fresa',
      'kefir-pulpa-arandanos',
      'kefir-aguaymanto',
      'kefir-frutos-bosque',
      'kefir-chocolate',
    ],
    imageUrl: '/assets/images/content/products/kefir-con-fresa/featured.webp',
  },
  {
    slug: 'kefir-de-agua',
    category: ProductCategory.PROBIOTICOS,
    title: 'Kéfir de agua',
    eyebrow: 'Sin lácteos',
    description:
      'Fermentado con granos de kéfir de agua: refrescante, burbujeante y sin lácteos. Probióticos vivos para quienes no toleran la leche.',
    tone: 'verde',
    productNames: ['kefir-agua'],
  },
  {
    slug: 'kombucha',
    category: ProductCategory.PROBIOTICOS,
    title: 'Kombucha',
    eyebrow: 'Té fermentado',
    description:
      'Bebida ancestral de té fermentado con cultivos vivos. Ligera, burbujeante y sin conservantes, elaborada lote a lote.',
    tone: 'verde',
    productNames: ['kombucha-natural'],
  },
  {
    slug: 'fermentados',
    category: ProductCategory.PROBIOTICOS,
    title: 'Fermentados',
    eyebrow: 'Cultivos vivos',
    description:
      'Chucrut morado y crema de kéfir con aceitunas. Fermentados de mesa con probióticos naturales, para acompañar y untar.',
    tone: 'verde',
    productNames: ['chucrut-morado', 'crema-de-kefir-aceituna'],
    imageUrl: '/assets/images/content/products/chucrut-morado/featured.webp',
  },

  /* ── Tradicionales ────────────────────────────────────────────────────── */
  {
    slug: 'manteca-de-cerdo',
    category: ProductCategory.TRADICIONALES,
    title: 'Manteca de cerdo',
    eyebrow: 'Saberes ancestrales',
    description:
      'Manteca 100% natural y artesanal para cocinar, freír y hornear. Sabor auténtico, en cuatro presentaciones según cuánto cocines.',
    tone: 'miel',
    productNames: ['manteca-de-cerdo'],
    imageUrl: '/assets/images/categories/manteca-de-cerdo.webp',
  },
  {
    slug: 'mermeladas',
    category: ProductCategory.TRADICIONALES,
    title: 'Mermeladas',
    eyebrow: 'Fruta y paciencia',
    description:
      'Mermeladas artesanales sin conservantes: fresa natural y quito quito traído de Oxapampa. Fruta cocida despacio, nada más.',
    tone: 'miel',
    productNames: ['mermelada-fresa', 'mermelada-quito-quito'],
  },
  {
    slug: 'despensa',
    category: ProductCategory.TRADICIONALES,
    title: 'Despensa',
    eyebrow: 'Ingredientes con origen',
    description: 'Los básicos de la cocina, con procedencia: sal rosada de Maras y vinagre de manzana artesanal.',
    tone: 'miel',
    productNames: ['sal-de-maras', 'vinagre-de-manzana'],
    imageUrl: '/assets/images/content/products/sal-de-maras/featured.webp',
  },
];

/* Productos de una subcategoría, en el orden en que están en el catálogo. */
export const getSubcategoryProducts = (subcategory: SubcategoryDetail): Product[] =>
  allProducts.filter((product) => subcategory.productNames.includes(product.name));

/* Subcategorías de una categoría, para el submenú y los listados. */
export const getSubcategoriesOf = (category: ProductCategory): SubcategoryDetail[] =>
  subcategoryDetails.filter((sub) => sub.category === category);

/* Imagen del hero: la propia si se definió, si no la del primer producto. */
export const getSubcategoryImage = (subcategory: SubcategoryDetail): string => {
  if (subcategory.imageUrl) return subcategory.imageUrl;

  const [first] = getSubcategoryProducts(subcategory);
  return first?.featuredImage || first?.thumbnailImage || '';
};

/* URL pública de la subcategoría. */
export const getSubcategoryUrl = (subcategory: SubcategoryDetail): string =>
  `/categorias/${categoryDetails[subcategory.category].slug}/${subcategory.slug}`;

/*
  Resuelve los dos segmentos de la URL. Devuelve null si el par no existe o si
  la subcategoría no pertenece a esa categoría (evita que
  /categorias/tradicionales/kombucha responda 200).
*/
export const resolveSubcategory = (categoriaSlug: string, subcategoriaSlug: string): SubcategoryDetail | null => {
  const found = subcategoryDetails.find((sub) => sub.slug === subcategoriaSlug);
  if (!found) return null;

  return categoryDetails[found.category].slug === categoriaSlug ? found : null;
};
