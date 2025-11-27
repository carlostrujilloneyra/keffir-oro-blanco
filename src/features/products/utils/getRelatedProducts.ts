import { Product } from '../types/product.type';
import { allProducts } from '../data/products';

/**
 * Obtiene productos relacionados basados en la categoría
 * @param currentProduct - El producto actual
 * @param limit - Número máximo de productos a retornar (default: 4)
 * @returns Array de productos relacionados
 */
export function getRelatedProducts(currentProduct: Product, limit: number = 4): Product[] {
  return allProducts
    .filter(
      (product) =>
        product.id !== currentProduct.id && // Excluir el producto actual
        product.category === currentProduct.category, // Misma categoría
    )
    .slice(0, limit);
}

/**
 * Obtiene productos por categoría
 * @param category - La categoría de productos
 * @param limit - Número máximo de productos a retornar (opcional)
 * @returns Array de productos de la categoría
 */
export function getProductsByCategory(category: string, limit?: number): Product[] {
  const products = allProducts.filter((product) => product.category === category);
  return limit ? products.slice(0, limit) : products;
}

/**
 * Obtiene productos por tag
 * @param tag - El tag a buscar
 * @param limit - Número máximo de productos a retornar (opcional)
 * @returns Array de productos con el tag
 */
export function getProductsByTag(
  tag: 'new' | 'best-seller' | 'recommended' | 'main-product' | 'discover',
  limit?: number,
): Product[] {
  const products = allProducts.filter((product) => product.tags?.includes(tag));
  return limit ? products.slice(0, limit) : products;
}
