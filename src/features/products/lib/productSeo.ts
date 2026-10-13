import { toMetaDescription } from '@/lib/metadata';
import type { Product } from '../types/product.type';

/*
  La meta description es el texto que aparece bajo el título en los resultados:
  es copy de venta, no la misma frase de la tarjeta. Se compone con lo que ya
  está en el catálogo (presentación + cómo pedir).
*/
export const buildProductMetaDescription = (product: Product): string => {
  const sizeSentence = product.size ? ` Presentación de ${product.size}.` : '';
  return toMetaDescription(
    `${product.shortDescription}${sizeSentence} Artesanal, sin conservantes. Pedidos por WhatsApp.`,
  );
};
