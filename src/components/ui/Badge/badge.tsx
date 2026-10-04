import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/* Sistema de badges reducido a 3 variantes visuales (Editorial Andino):
    neutral  → chip discreto para atributos secundarios (default)
    category → acento verde para curaduría / categoría
    alert    → fucsia sólido para "nuevo" / urgencia (con moderación)
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2.5 py-0.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-verde focus-visible:ring-offset-1 focus-visible:ring-offset-papel',
  {
    variants: {
      variant: {
        neutral: 'border border-papel-sombra bg-transparent text-tinta-media',
        category: 'border border-verde/40 bg-verde/10 text-bosque',
        alert: 'border-transparent bg-fucsia text-white',
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
