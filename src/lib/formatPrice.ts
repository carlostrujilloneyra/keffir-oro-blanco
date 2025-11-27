/**
 * Formatea un número como precio con dos decimales
 * @param price - El precio a formatear
 * @returns El precio formateado con dos decimales (ej: 19.90, 23.00)
 */
export function formatPrice(price: number): string {
  return price.toFixed(2);
}
