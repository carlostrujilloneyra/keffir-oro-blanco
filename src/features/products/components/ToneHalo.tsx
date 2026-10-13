import { cn } from '@/lib/utils';
import { toneStyles, type Tone } from '../lib/productAccent';

type Props = {
  tone: Tone;
  /* Crece al hacer hover sobre el `group` padre. */
  animated?: boolean;
};

/* Halo difuso detrás de la foto del producto, del color de su acento. */
export const ToneHalo = ({ tone, animated = true }: Props) => (
  <div
    className={cn(
      'absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl',
      animated && 'transition-transform duration-500 ease-out group-hover:scale-110',
      toneStyles[tone].halo,
    )}
  />
);
