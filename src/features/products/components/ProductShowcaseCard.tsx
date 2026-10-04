import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { getProductUrl } from '@/lib/getProductUrl';
import { categoryDetails } from '../data/categories';
import { type Product } from '../types/product.type';
import { accentFor, toneStyles } from '../lib/productAccent';
import { getProductSplash } from '../lib/productSplash';

type Props = {
  product: Product;
  /** Resalta la card (p. ej. la central del coverflow): sombra de acento fija. */
  highlighted?: boolean;
  /** true = toda la card es un enlace al detalle; false = no navega (el padre decide). */
  asLink?: boolean;
};

export const ProductShowcaseCard = ({ product, highlighted = false, asLink = true }: Props) => {
  const tone = toneStyles[accentFor(product)];
  const category = categoryDetails[product.category]?.title ?? 'Producto';
  const url = getProductUrl(product.slug);
  const splashes = getProductSplash(product);

  // "Ver ficha" es enlace real solo cuando la card no navega entera pero está centrada.
  const ctaIsLink = !asLink && highlighted;

  const rootClass = cn(
    'group flex h-full w-full flex-col overflow-hidden rounded-[6px] border bg-papel transition-all duration-300 ease-out',
    highlighted
      ? cn('border-tinta/25', tone.shadowStatic)
      : cn(
          'border-papel-sombra hover:border-tinta/25',
          asLink && 'hover:-translate-x-1 hover:-translate-y-1',
          tone.shadow,
        ),
  );

  const cta = (
    <>
      <span className='text-sm font-medium text-tinta-media transition-colors duration-200 group-hover:text-tinta'>
        Ver ficha
      </span>
      <span
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover:rotate-45',
          tone.arrow,
        )}
      >
        <ArrowUpRight className='h-4 w-4' />
      </span>
    </>
  );

  const inner = (
    <>
      {/* Panel de imagen con halo de fermento y sello de precio */}
      <div className='relative aspect-square overflow-hidden bg-gradient-to-b from-papel-hueso to-papel'>
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-transform duration-500 ease-out group-hover:scale-110',
            tone.halo,
          )}
        />

        {/* Salpicado del sabor: capas izq/der que enmarcan la botella. Aparecen al
            hover, o de forma fija cuando la card está destacada (centro del coverflow). */}
        {splashes.map((layer, i) => (
          <div
            key={i}
            style={{ transitionDelay: layer.delay }}
            className={cn(
              'pointer-events-none absolute transition-all duration-500 ease-out',
              layer.className,
              highlighted
                ? 'scale-100 opacity-100'
                : // Táctil (sin hover): visible siempre. Con hover (desktop): aparece al pasar el mouse.
                  'scale-100 opacity-100 [@media(hover:hover)]:scale-90 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100',
            )}
          >
            <Image
              src={layer.src}
              alt=''
              aria-hidden
              fill
              sizes='(min-width: 768px) 300px, 60vw'
              className='object-contain'
            />
          </div>
        ))}

        <Image
          src={product.thumbnailImage}
          alt={product.title}
          fill
          sizes='(min-width: 768px) 300px, 60vw'
          className='object-contain p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]'
        />
        <span className='absolute left-3 top-3 rounded-[4px] bg-tinta px-2.5 py-1 font-display text-sm font-semibold tracking-tight text-papel'>
          S/ {formatPrice(product.price)}
        </span>
      </div>

      {/* Contenido */}
      <div className='flex flex-grow flex-col gap-2 p-4'>
        <span className='inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-tinta-suave'>
          <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
          {category}
        </span>

        <h3 className='line-clamp-2 min-h-[2.6em] font-display text-lg font-semibold leading-[1.1] tracking-tight text-tinta'>
          {product.title}
        </h3>

        {ctaIsLink ? (
          <Link
            href={url}
            onClick={(e) => e.stopPropagation()}
            className='mt-auto flex items-center justify-between pt-2'
          >
            {cta}
          </Link>
        ) : (
          <div className='mt-auto flex items-center justify-between pt-2'>{cta}</div>
        )}
      </div>
    </>
  );

  if (asLink) {
    return (
      <Link href={url} className={rootClass}>
        {inner}
      </Link>
    );
  }

  return <div className={rootClass}>{inner}</div>;
};
