import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { getProductUrl } from '@/lib/routes';
import { inlineMarkdown } from '@/lib/inlineMarkdown';
import { keepUnitsTogether } from '@/lib/keepUnitsTogether';
import { categoryDetails } from '../data/categories';
import { type Product } from '../types/product.type';
import { accentFor, toneStyles } from '../lib/productAccent';

/* Fila compacta de "estante": foto, nombre, un beneficio y precio. */
export const ProductShelfItem = ({ product }: { product: Product }) => {
  const tone = toneStyles[accentFor(product)];
  const category = categoryDetails[product.category]?.title ?? 'Producto';
  const [benefit] = product.benefits ?? [];

  return (
    <Link
      href={getProductUrl(product.slug)}
      className='ease-[cubic-bezier(0.32,0.72,0,1)] group flex h-full items-center gap-4 rounded-card bg-papel-hueso p-3 transition-transform duration-300 hover:-translate-y-0.5 tablet:gap-5'
    >
      <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-[8px] bg-papel tablet:h-28 tablet:w-28'>
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl',
            tone.halo,
          )}
        />
        <Image
          src={product.thumbnailImage}
          alt={product.title}
          fill
          sizes='112px'
          className='object-contain p-2 transition-transform duration-300 group-hover:scale-105'
        />
      </div>

      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        <span className='text-xs font-medium text-tinta-suave'>{category}</span>
        <h3 className='font-display text-base font-semibold leading-tight tracking-tight text-tinta tablet:text-lg'>
          {keepUnitsTogether(product.title)}
        </h3>
        {benefit && (
          <p className='hidden text-sm leading-snug text-tinta-media tablet:block [&_strong]:font-semibold [&_strong]:text-tinta'>
            {inlineMarkdown(benefit)}
          </p>
        )}
        <div className='mt-1 flex items-center justify-between gap-3'>
          <span className='font-display text-base font-semibold text-tinta'>S/ {formatPrice(product.price)}</span>
          <span className='text-sm font-semibold text-tinta underline decoration-tinta/30 underline-offset-4 transition-colors duration-200 group-hover:decoration-tinta'>
            Ver producto
          </span>
        </div>
      </div>
    </Link>
  );
};
