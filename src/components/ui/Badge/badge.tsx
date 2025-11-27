import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs tablet:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Variantes base
        default: 'border-transparent bg-orange-500 text-white shadow-md hover:bg-orange-600',
        secondary: 'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
        destructive: 'border-transparent bg-red-500 text-white shadow-md hover:bg-red-600',
        outline: 'border-emerald-300 text-emerald-700 hover:bg-emerald-50',
        stone: 'border-transparent bg-stone-100 text-stone-700 hover:bg-stone-200',

        // Badges de popularidad - Colores cálidos y llamativos
        bestseller: 'border-transparent bg-amber-500 text-white shadow-md hover:bg-amber-600',
        recommended: 'border-transparent bg-emerald-600 text-white shadow-md hover:bg-emerald-700',
        new: 'border-transparent bg-orange-500 text-white shadow-md hover:bg-orange-600',

        // Badges de salud - Colores frescos y naturales
        fresh: 'border-transparent bg-cyan-500 text-white shadow-md hover:bg-cyan-600',
        probiotic: 'border-transparent bg-blue-600 text-white shadow-md hover:bg-blue-700',
        healthy: 'border-transparent bg-green-600 text-white shadow-md hover:bg-green-700',

        // Badges de naturaleza - Verdes vibrantes
        natural: 'border-transparent bg-lime-600 text-white shadow-md hover:bg-lime-700',
        organic: 'border-transparent bg-green-700 text-white shadow-md hover:bg-green-800',
        vegan: 'border-transparent bg-emerald-700 text-white shadow-md hover:bg-emerald-800',

        // Badges de características - Colores tierra y artesanales
        artisan: 'border-transparent bg-amber-700 text-white shadow-md hover:bg-amber-800',
        local: 'border-transparent bg-yellow-600 text-white shadow-md hover:bg-yellow-700',

        // Badges especiales - Colores suaves
        'sugar-free': 'border-transparent bg-pink-100 text-pink-800 hover:bg-pink-200',
        'lactose-free': 'border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200',
        limited: 'border-transparent bg-red-600 text-white shadow-md hover:bg-red-700',
        seasonal: 'border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
