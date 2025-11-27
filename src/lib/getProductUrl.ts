/**
 * Genera la URL de un producto basada en su slug
 * @param slug - El slug del producto
 * @returns La URL completa del producto
 *
 * @example
 * getProductUrl("sal-rosada-de-maras-cusco") // "/products/sal-rosada-de-maras-cusco"
 */
export function getProductUrl(slug: string): string {
  return `/products/${slug}`;
}
