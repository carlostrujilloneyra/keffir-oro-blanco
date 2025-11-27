/**
 * Genera un slug URL-friendly a partir de un texto
 * @param text - El texto a convertir en slug
 * @returns El slug generado en formato kebab-case
 *
 * @example
 * generateSlug("Kéfir de leche de Vaca 1 LT") // "kefir-de-leche-de-vaca-1-lt"
 * generateSlug("Sal rosada de Maras, Cusco") // "sal-rosada-de-maras-cusco"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase() // Convertir a minúsculas
    .normalize('NFD') // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales excepto espacios y guiones
    .trim() // Eliminar espacios al inicio y final
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Reemplazar múltiples guiones con uno solo
}
