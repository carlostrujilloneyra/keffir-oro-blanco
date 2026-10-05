import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { getProductUrl } from '@/lib/routes';
import { inlineMarkdown } from '@/lib/inlineMarkdown';
import { categoryDetails } from '../data/categories';
import { type Product } from '../types/product.type';
import { accentFor, toneStyles } from '../lib/productAccent';

const MAX_BENEFITS = 3;

export const PromoProductCard = ({ product }: { product: Product }) => {
  const tone = toneStyles[accentFor(product)];
  const category = categoryDetails[product.category]?.title ?? 'Producto';
  const benefits = (product.benefits ?? []).slice(0, MAX_BENEFITS);

  return (
    <Link
      href={getProductUrl(product.slug)}
      className={cn(
        'ease-[cubic-bezier(0.32,0.72,0,1)] group flex h-full flex-col overflow-hidden rounded-[20px] border border-papel-sombra bg-papel transition-all duration-500 hover:-translate-y-1 hover:border-tinta/20',
        tone.shadow,
      )}
    >
      <div className='relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-papel-hueso to-papel'>
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-2/5 w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-transform duration-500 ease-out group-hover:scale-110',
            tone.halo,
          )}
        />
        <Image
          src={product.thumbnailImage}
          alt={product.title}
          fill
          sizes='(min-width: 1024px) 360px, 90vw'
          className='ease-[cubic-bezier(0.32,0.72,0,1)] object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]'
        />
        <span className='absolute left-4 top-4 rounded-[6px] bg-tinta px-2.5 py-1 font-display text-sm font-semibold tracking-tight text-papel'>
          S/ {formatPrice(product.price)}
        </span>
      </div>

      <div className='flex flex-1 flex-col gap-3 p-5'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs font-medium text-tinta-suave'>{category}</span>
          <h3 className='font-display text-xl font-semibold leading-[1.1] tracking-tight text-tinta'>
            {product.title}
          </h3>
        </div>

        {benefits.length > 0 && (
          <ul className='flex flex-col gap-2'>
            {benefits.map((benefit, i) => (
              <li key={i} className='flex items-start gap-2 text-sm leading-snug text-tinta-media'>
                <span className='mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-verde/15 text-verde'>
                  <Check className='h-3 w-3' />
                </span>
                <span className='[&_strong]:font-semibold [&_strong]:text-tinta'>{inlineMarkdown(benefit)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className='mt-auto flex items-center justify-between gap-2 pt-3'>
          <span className='text-sm font-medium text-tinta-media transition-colors duration-200 group-hover:text-tinta'>
            Ver producto
          </span>
          <span
            className={cn(
              'ease-[cubic-bezier(0.32,0.72,0,1)] flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45',
              tone.arrow,
            )}
          >
            <ArrowUpRight className='h-4 w-4' />
          </span>
        </div>
      </div>
    </Link>
  );
};
