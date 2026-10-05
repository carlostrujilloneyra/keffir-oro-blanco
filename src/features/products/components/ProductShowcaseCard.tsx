import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { getProductUrl } from '@/lib/getProductUrl';
import { keepUnitsTogether } from '@/lib/keepUnitsTogether';
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

  // "Ver producto" es enlace real solo cuando la card no navega entera pero está centrada.
  const ctaIsLink = !asLink && highlighted;

  const rootClass = cn(
    'group cq flex h-full w-full flex-col overflow-hidden rounded-[6px] border bg-papel transition-all duration-300 ease-out',
    highlighted
      ? cn('border-tinta/25', tone.shadowStatic)
      : cn(
          'border-papel-sombra hover:border-tinta/25',
          asLink && 'hover:-translate-x-1 hover:-translate-y-1',
          tone.shadow,
        ),
  );

  /* `cq-sm:` responde al ancho de la card, no de la pantalla: < 13rem = versión compacta. */
  const footerClass = 'mt-auto flex items-center justify-between gap-2 border-t border-papel-sombra/70 pt-3';

  const cta = (
    <>
      <span className='whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.06em] text-tinta-media transition-colors duration-200 group-hover:text-tinta cq-sm:text-xs cq-sm:tracking-[0.12em]'>
        Ver producto
      </span>
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover:rotate-45 cq-sm:h-9 cq-sm:w-9',
          tone.arrow,
        )}
      >
        <ArrowUpRight className='h-3.5 w-3.5 cq-sm:h-4 cq-sm:w-4' />
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
          className='object-contain px-4 pb-3 pt-9 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04] cq-sm:p-6'
        />
        <span className='absolute left-2 top-2 rounded-[4px] bg-tinta px-2 py-0.5 font-display text-xs font-semibold tracking-tight text-papel cq-sm:left-3 cq-sm:top-3 cq-sm:px-2.5 cq-sm:py-1 cq-sm:text-sm'>
          S/ {formatPrice(product.price)}
        </span>
      </div>

      {/* Contenido */}
      <div className='flex flex-grow flex-col gap-2 p-3 cq-sm:p-4'>
        <span className='hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-tinta-suave cq-sm:inline-flex'>
          <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
          {category}
        </span>

        <h3 className='font-display text-[15px] font-semibold leading-[1.2] tracking-tight text-tinta cq-sm:min-h-[2.6em] cq-sm:text-lg cq-sm:leading-[1.1]'>
          {keepUnitsTogether(product.title)}
        </h3>

        {ctaIsLink ? (
          <Link href={url} onClick={(e) => e.stopPropagation()} className={footerClass}>
            {cta}
          </Link>
        ) : (
          <div className={footerClass}>{cta}</div>
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
