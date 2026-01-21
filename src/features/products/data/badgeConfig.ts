import { badgeVariants } from '@/components/ui/Badge/badge';
import type { VariantProps } from 'class-variance-authority';

// Inferir el tipo de variante desde el Badge component para sincronización automática
type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

export interface BadgeConfig {
  label: string;
  variant?: BadgeVariant;
  description?: string;
}

export const badgeConfig = {
  // Badges de popularidad - Colores cálidos
  new: {
    label: 'Nuevo',
    variant: 'default', // Naranja
    description: 'Producto recién agregado',
  },
  'best-seller': {
    label: 'Más vendido',
    variant: 'default',
    description: 'Uno de nuestros productos más populares',
  },
  recommended: {
    label: 'Recomendado',
    variant: 'recommended', // Verde esmeralda
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
    variant: 'probiotic', // Azul
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
    variant: 'sugar-free', // Rosa suave
    description: 'Sin azúcares añadidos',
  },
  'lactose-free': {
    label: 'Fácil digestión',
    variant: 'secondary',
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
} as const satisfies Record<string, BadgeConfig>;

// Inferir BadgeType automáticamente desde las keys de badgeConfig
export type BadgeType = keyof typeof badgeConfig;

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
