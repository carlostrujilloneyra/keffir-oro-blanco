/**
 * Configuración de badges para productos
 * Define las etiquetas en español y variantes de estilo para cada badge
 */

export type BadgeType =
  | 'new'
  | 'best-seller'
  | 'recommended'
  | 'main-product'
  | 'discover'
  | 'fresh'
  | 'probiotic'
  | 'healthy'
  | 'natural'
  | 'organic'
  | 'sugar-free'
  | 'lactose-free'
  | 'vegan'
  | 'artisan'
  | 'local'
  | 'limited'
  | 'seasonal';

export interface BadgeConfig {
  label: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'stone';
  description?: string;
}

export const badgeConfig: Record<BadgeType, BadgeConfig> = {
  // Badges de popularidad - Colores cálidos
  new: {
    label: 'Nuevo',
    variant: 'default', // Naranja
    description: 'Producto recién agregado',
  },
  'best-seller': {
    label: 'Más vendido',
    variant: 'default', // Ámbar
    description: 'Uno de nuestros productos más populares',
  },
  recommended: {
    label: 'Recomendado',
    variant: 'secondary', // Verde esmeralda
    description: 'Recomendado por nuestros expertos',
  },
  'main-product': {
    label: 'Destacado',
    variant: 'default', // Naranja
    description: 'Producto destacado',
  },
  discover: {
    label: 'Descubre',
    variant: 'outline', // Borde verde
    description: 'Descubre este producto',
  },

  // Badges de salud y beneficios - Colores frescos
  fresh: {
    label: 'Producto Fresco',
    variant: 'secondary', // Cyan
    description: 'Producto fresco y de calidad',
  },
  probiotic: {
    label: 'Alto en Probióticos',
    variant: 'secondary', // Azul
    description: 'Rico en probióticos beneficiosos',
  },
  healthy: {
    label: 'Saludable',
    variant: 'secondary', // Verde
    description: 'Opción saludable y nutritiva',
  },
  natural: {
    label: '100% Natural',
    variant: 'stone', // Lima
    description: 'Sin aditivos ni conservantes',
  },
  organic: {
    label: 'Orgánico',
    variant: 'stone', // Verde oscuro
    description: 'Certificado orgánico',
  },
  'sugar-free': {
    label: 'Sin Azúcar Añadida',
    variant: 'outline', // Rosa suave
    description: 'Sin azúcares añadidos',
  },
  'lactose-free': {
    label: 'Sin Lactosa',
    variant: 'outline', // Púrpura suave
    description: 'Apto para intolerantes a la lactosa',
  },
  vegan: {
    label: 'Vegano',
    variant: 'stone', // Verde esmeralda oscuro
    description: 'Producto 100% vegano',
  },

  // Badges de características - Colores tierra
  artisan: {
    label: 'Artesanal',
    variant: 'stone', // Ámbar oscuro
    description: 'Elaborado artesanalmente',
  },
  local: {
    label: 'Producto Local',
    variant: 'outline', // Amarillo
    description: 'Producido localmente',
  },
  limited: {
    label: 'Edición Limitada',
    variant: 'destructive', // Rojo
    description: 'Disponibilidad limitada',
  },
  seasonal: {
    label: 'De Temporada',
    variant: 'outline', // Naranja suave
    description: 'Producto de temporada',
  },
};

/**
 * Obtiene la configuración de un badge
 */
export function getBadgeConfig(type: BadgeType): BadgeConfig {
  return badgeConfig[type];
}

/**
 * Obtiene la etiqueta en español de un badge
 */
export function getBadgeLabel(type: BadgeType): string {
  return badgeConfig[type]?.label || type;
}
