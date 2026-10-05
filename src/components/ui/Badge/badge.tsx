import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/* Etiquetas tipo sticker de frasco: texto normal, sin borde.
    neutral  → atributo descriptivo (default)
    category → curaduría (más vendido, recomendado)
    alert    → fucsia sólido para "Nuevo" / urgencia, con moderación */
const badgeVariants = cva(
  'inline-flex items-center rounded-[4px] px-2.5 py-1 font-sans text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-verde focus-visible:ring-offset-1 focus-visible:ring-offset-papel',
  {
    variants: {
      variant: {
        neutral: 'bg-papel-hueso text-tinta-media',
        category: 'bg-verde/15 text-bosque',
        alert: 'bg-fucsia text-white',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
