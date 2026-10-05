import { badgeVariants } from '@/components/ui/Badge/badge';
import type { VariantProps } from 'class-variance-authority';

// Inferir el tipo de variante desde el Badge component para sincronización automática
type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

export interface BadgeConfig {
  label: string;
  variant?: BadgeVariant;
  description?: string;
}

/* Variantes (ver Badge): 'alert' para urgencia/novedad, 'category' para
  curaduría, 'neutral' para atributos descriptivos. */
export const badgeConfig = {
  // Novedad / urgencia → alert (fucsia, con moderación)
  new: {
    label: 'Nuevo',
    variant: 'alert',
    description: 'Producto recién agregado',
  },
  limited: {
    label: 'Edición limitada',
    variant: 'alert',
    description: 'Disponibilidad limitada',
  },

  // Curaduría / categoría → category (acento verde)
  'best-seller': {
    label: 'Más vendido',
    variant: 'category',
    description: 'Uno de nuestros productos más populares',
  },
  recommended: {
    label: 'Recomendado',
    variant: 'category',
    description: 'Recomendado por nuestros expertos',
  },
  'main-product': {
    label: 'Destacado',
    variant: 'category',
    description: 'Producto destacado',
  },
  discover: {
    label: 'Descubre',
    variant: 'category',
    description: 'Descubre este producto',
  },

  // Atributos descriptivos → neutral (chip discreto)
  fresh: {
    label: 'Producto fresco',
    variant: 'neutral',
    description: 'Producto fresco y de calidad',
  },
  probiotic: {
    label: 'Alto en probióticos',
    variant: 'neutral',
    description: 'Rico en probióticos beneficiosos',
  },
  healthy: {
    label: 'Saludable',
    variant: 'neutral',
    description: 'Opción saludable y nutritiva',
  },
  natural: {
    label: '100% natural',
    variant: 'neutral',
    description: 'Sin aditivos ni conservantes',
  },
  organic: {
    label: 'Orgánico',
    variant: 'neutral',
    description: 'Certificado orgánico',
  },
  'sugar-free': {
    label: 'Sin azúcar añadida',
    variant: 'neutral',
    description: 'Sin azúcares añadidos',
  },
  'lactose-free': {
    label: 'Fácil digestión',
    variant: 'neutral',
    description: 'Apto para intolerantes a la lactosa',
  },
  vegan: {
    label: 'Vegano',
    variant: 'neutral',
    description: 'Producto 100% vegano',
  },
  artisan: {
    label: 'Artesanal',
    variant: 'neutral',
    description: 'Elaborado artesanalmente',
  },
  local: {
    label: 'Producto local',
    variant: 'neutral',
    description: 'Producido localmente',
  },
  seasonal: {
    label: 'De temporada',
    variant: 'neutral',
    description: 'Producto de temporada',
  },
} as const satisfies Record<string, BadgeConfig>;

// Inferir BadgeType automáticamente desde las keys de badgeConfig
export type BadgeType = keyof typeof badgeConfig;
