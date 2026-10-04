import { allProducts } from './products';
import type { Product } from '../types/product.type';

/*
  Tallas hermanas de un producto: todos los SKU que comparten el mismo `name`
  (grupo de variantes), ordenados de menor a mayor precio. Incluye al propio
  producto. Si solo hay una talla, la ficha no muestra el bloque.
*/
export const getSizeVariants = (product: Product): Product[] =>
  allProducts.filter((p) => p.name === product.name).sort((a, b) => a.price - b.price);

/*
  Productos relacionados: misma categoría, distinto grupo de variantes (no las
  otras tallas del mismo producto), sin repetir grupo (una card por producto).
*/
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

// 2. Exportamos cada "lista de reproducción" como una constante
export const newProductsCollection = allProducts.filter((p) => p.tags?.includes('new'));

export const bestSellersCollection = allProducts.filter((p) => p.tags?.includes('best-seller'));

export const recommendedCollection = allProducts.filter((p) => p.tags?.includes('recommended'));

export const promotedCollection = allProducts.filter((p) => p.tags?.includes('discover'));

// También puedes exportar colecciones más complejas
export const featuredHomeProducts = allProducts.slice(0, 4);
