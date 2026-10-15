import { allProducts } from './products';
import type { Product } from '../types/product.type';
import { getProductUrl } from '@/lib/routes';

/* Lanza si el id no existe: un enlace a un producto borrado rompe el build, no la web. */
export const getProductById = (id: string): Product => {
  const product = allProducts.find((p) => p.id === id);

  if (!product) throw new Error(`Producto no encontrado: "${id}"`);
  return product;
};

export const getProductBySlug = (slug: string): Product | undefined => allProducts.find((p) => p.slug === slug);

export const getProductUrlById = (id: string) => getProductUrl(getProductById(id).slug);

/*
  Tallas hermanas de un producto: todos los SKU que comparten el mismo `name`
  (grupo de variantes), ordenados de menor a mayor precio. Incluye al propio
  producto. Si solo hay una talla, la ficha no muestra el bloque.
*/
export const getSizeVariants = (product: Product): Product[] =>
  allProducts.filter((p) => p.name === product.name).sort((a, b) => a.price - b.price);

/*
  Talla que representa al grupo: la marcada 'best-seller'. Si varias lo están, la
  de mayor precio (la presentación más grande); si ninguna, la primera de
  `variants` (getSizeVariants las ordena de menor a mayor precio). Define el chip
  elegido por defecto en las tarjetas y la URL canónica de la ficha.
*/
export const getDefaultVariant = (variants: Product[]): Product => {
  const bestSellers = variants.filter((p) => p.tags?.includes('best-seller'));
  if (bestSellers.length === 0) return variants[0];
  return bestSellers.reduce((top, p) => (p.price > top.price ? p : top));
};

export interface ProductGroup {
  product: Product;
  fromPrice: number;
  sizes: number;
}

/* Un grupo por `name` (todas sus tallas), en el orden de entrada. `product` es el primer SKU. */
export const getProductGroups = (products: Product[]): ProductGroup[] => {
  const groups = new Map<string, Product[]>();
  products.forEach((p) => groups.set(p.name, [...(groups.get(p.name) ?? []), p]));

  return [...groups.values()].map((skus) => ({
    product: skus[0],
    fromPrice: Math.min(...skus.map((p) => p.price)),
    sizes: skus.length,
  }));
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  const seen = new Set<string>();
  return allProducts
    .filter((p) => {
      if (p.category !== product.category || p.name === product.name) return false;
      if (seen.has(p.name)) return false;
      seen.add(p.name);
      return true;
    })
    .slice(0, limit);
};

export const bestSellersCollection = allProducts.filter((p) => p.tags?.includes('best-seller'));
export const promotedCollection = allProducts.filter((p) => p.tags?.includes('discover'));
