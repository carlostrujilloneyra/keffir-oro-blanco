import { ProductCategory } from './categories';
import { allProducts } from './products';
import { getProductGroups } from './collections';
import type { Product } from '../types/product.type';
import type { SectionTone } from '../lib/productAccent';
import { getProductImage } from '../lib/productDisplay';

export interface SubcategoryDetail {
  slug: string;
  category: ProductCategory;
  title: string;
  eyebrow: string;
  description: string;
  tone: SectionTone;

  /*
    Grupos de producto que forman la subcategoría, por `Product.name`.
    Se agrupa por `name` y no por slug para que las tallas hermanas entren
    juntas sin listarlas una a una: 'kefir-leche-vaca' arrastra 1 L, 475 y 250.
  */
  productNames: string[];

  /* Si no se define, se toma la imagen del primer producto del grupo. */
  imageUrl?: string;

  /* Tabla "¿A o B?" bajo la grilla. Las claves son `Product.name` de esta subcategoría;
     la fila de precio "Desde" se calcula de los datos. */
  comparison?: SubcategoryComparison;
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
    slug: 'kombucha-y-kefir-de-agua',
    category: ProductCategory.PROBIOTICOS,
    title: 'Kombucha y kéfir de agua',
    eyebrow: 'Sin lácteos',
    description:
      'Bebidas fermentadas con cultivos vivos y sin lácteos: kombucha natural, cinco sabores nuevos en botella de 355 ml y kéfir de agua. Ligeras y naturalmente burbujeantes.',
    tone: 'verde',
    productNames: [
      'kombucha-natural',
      'kombucha-flor-de-guisante',
      'kombucha-espirulina-azul',
      'kombucha-arandanos',
      'kombucha-frambuesa',
      'kombucha-pitahaya',
      'kefir-agua',
    ],
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
    slug: 'para-cocinar',
    category: ProductCategory.TRADICIONALES,
    title: 'Para cocinar',
    eyebrow: 'Saberes ancestrales',
    description:
      'Los básicos de la cocina de casa: manteca de cerdo artesanal para freír y hornear, sal rosada de Maras y vinagre de manzana con madre.',
    tone: 'miel',
    productNames: ['manteca-de-cerdo', 'sal-de-maras', 'vinagre-de-manzana'],
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
];

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
    fromPrice: products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0,
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
