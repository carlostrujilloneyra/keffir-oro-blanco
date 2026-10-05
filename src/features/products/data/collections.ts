import { allProducts } from './products';
import type { Product } from '../types/product.type';
import { getProductUrl } from '@/lib/routes';

/* Lanza si el id no existe: un enlace a un producto borrado rompe el build, no la web. */
export const getProductById = (id: string): Product => {
  const product = allProducts.find((p) => p.id === id);
  if (!product) throw new Error(`Producto no encontrado: "${id}"`);
  return product;
};

export const getProductUrlById = (id: string) => getProductUrl(getProductById(id).slug);

/*
  Tallas hermanas de un producto: todos los SKU que comparten el mismo `name`
  (grupo de variantes), ordenados de menor a mayor precio. Incluye al propio
  producto. Si solo hay una talla, la ficha no muestra el bloque.
*/
export const getSizeVariants = (product: Product): Product[] =>
  allProducts.filter((p) => p.name === product.name).sort((a, b) => a.price - b.price);

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
