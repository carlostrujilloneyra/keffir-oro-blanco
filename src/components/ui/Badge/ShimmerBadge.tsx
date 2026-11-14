'use client';

import { useRef } from 'react';
import { useInView } from 'motion/react';

import { cn } from '@/lib/utils';
import { badgeVariants, type BadgeProps } from './badge';
import styles from './ShimmerBadge.module.scss';

/* Badge con una franja de luz que lo cruza al entrar en pantalla (dos pasadas, sin bucle).
   Es un componente aparte para que `Badge` siga siendo de servidor. */
export const ShimmerBadge = ({ className, variant, ...props }: BadgeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), styles.shimmer, inView && styles.play, className)}
      {...props}
    />
  );
};
