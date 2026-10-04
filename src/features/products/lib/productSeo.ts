import type { Product } from '../types/product.type';

/* Google recorta alrededor de los 160 caracteres. */
const MAX_DESCRIPTION = 158;

/*
  La meta description es el texto que aparece bajo el título en los resultados:
  es copy de venta, no la misma frase de la tarjeta.

  Antes se reutilizaba `shortDescription` y las 25 páginas de producto se
  quedaban en 40-68 caracteres — la mitad del espacio disponible, sin decir la
  presentación ni por qué comprar. Aquí se compone con lo que ya está en el
  catálogo.
*/
export const buildProductMetaDescription = (product: Product): string => {
  const presentacion = product.size ? ` Presentación de ${product.size}.` : '';
  const description = `${product.shortDescription}${presentacion} Artesanal, sin conservantes. Pedidos por WhatsApp.`;

  if (description.length <= MAX_DESCRIPTION) return description;

  /* Se corta en el último espacio para no partir una palabra. */
  const cut = description.slice(0, MAX_DESCRIPTION);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};
