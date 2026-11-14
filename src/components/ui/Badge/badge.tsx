import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/* Etiquetas tipo sticker de frasco: texto normal, sin borde.
    neutral  → atributo descriptivo (default)
    category → curaduría (más vendido, recomendado), en tinta
    alert    → fucsia sólido para "Nuevo" / urgencia, con moderación
    soon     → "Próximamente": contorno tinta, sobre fondos claros
    soon-inverse → "Próximamente" sobre paneles oscuros o de color (contorno papel) */
const badgeVariants = cva(
  'inline-flex items-center rounded-[4px] px-2.5 py-1 font-sans text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fucsia focus-visible:ring-offset-1 focus-visible:ring-offset-papel',
  {
    variants: {
      variant: {
        neutral: 'bg-papel-hueso text-tinta-media',
        category: 'bg-tinta text-papel',
        alert: 'bg-fucsia text-white',
        /* El borde de 1px se compensa en el padding para igualar la altura de los demás. */
        soon: 'border border-tinta px-[9px] py-[3px] text-tinta',
        'soon-inverse': 'border border-papel/70 bg-tinta/30 px-[9px] py-[3px] text-papel',
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
