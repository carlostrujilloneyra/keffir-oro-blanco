import Link from 'next/link';
import { getProductUrl } from '@/lib/routes';
import { formatPrice } from '@/lib/formatPrice';
import { cn } from '@/lib/utils';
import { type Product } from '@/features/products';

interface Props {
  /** Tallas hermanas (mismo grupo), incluida la actual. */
  variants: Product[];
  currentSlug: string;
}

/*
  Selector de talla visible (chips): la talla actual queda resaltada; las demás
  enlazan a su propia ficha (cada talla es un SKU). Sustituye al acordeón de
  "Presentaciones disponibles" para que la decisión de tamaño sea inmediata.
*/
export const SizeSelector = ({ variants, currentSlug }: Props) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div>
      <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-tinta-suave'>Presentación</p>

      <div className='mt-3 flex flex-wrap gap-2.5'>
        {variants.map((variant) => {
          const isActive = variant.slug === currentSlug;
          const label = variant.size ?? variant.title;

          const body = (
            <>
              <span className='font-display text-base font-semibold leading-none'>{label}</span>
              <span className={cn('mt-1 text-xs', isActive ? 'text-papel/80' : 'text-tinta-suave')}>
                S/ {formatPrice(variant.price)}
              </span>
            </>
          );

          return isActive ? (
            <span
              key={variant.id}
              aria-current='true'
              className='flex min-w-[112px] flex-col items-center rounded-[10px] border-2 border-verde bg-verde px-5 py-3 text-papel'
            >
              {body}
            </span>
          ) : (
            <Link
              key={variant.id}
              href={getProductUrl(variant.slug)}
              className='flex min-w-[112px] flex-col items-center rounded-[10px] border-2 border-papel-sombra px-5 py-3 text-tinta transition-colors duration-200 hover:border-verde hover:bg-verde/5'
            >
              {body}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
