import type { Product } from '../types/product.type';

/* `title` termina en la talla ("… natural 1 L"); esto la quita para hablar del producto y no del SKU. */
export const getProductBaseTitle = (product: Product): string => {
  const suffix = product.size ? ` ${product.size}` : '';
  return suffix && product.title.endsWith(suffix) ? product.title.slice(0, -suffix.length) : product.title;
};

export const getProductImage = (product: Product): string => product.featuredImage || product.thumbnailImage;

/* Nombre corto ("Fresa", "Vaca") para chips y mini-cards; sin `shortName`, el título sin talla. */
export const getProductShortName = (product: Product): string => product.shortName ?? getProductBaseTitle(product);
