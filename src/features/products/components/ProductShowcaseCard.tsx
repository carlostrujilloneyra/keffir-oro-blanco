import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { getProductUrl } from '@/lib/routes';
import { keepUnitsTogether } from '@/lib/keepUnitsTogether';
import { ShimmerBadge } from '@/components/ui/Badge/ShimmerBadge';
import { badgeConfig, getDisplayTags } from '../data/badgeConfig';
import { categoryDetails } from '../data/categories';
import { getSizeVariants } from '../data/collections';
import { type Product } from '../types/product.type';
import { accentFor, toneStyles } from '../lib/productAccent';
import { getProductSplash, type SplashLayer } from '../lib/productSplash';
import { getProductBaseTitle, getProductShortName } from '../lib/productDisplay';
import { ToneHalo } from './ToneHalo';
import { COMING_SOON_PRICE_CLASS, ComingSoonArt, isPhotoPending } from './ComingSoonArt';
import styles from './ProductShowcaseCard.module.scss';

/*
  'category': dentro de su categoría o subcategoría el contexto ya lo da la página:
  título corto (shortName), debajo solo la talla o tallas y sin la etiqueta de categoría.
*/
export type ProductCardContext = 'general' | 'category';

type Props = {
  product: Product;
  /* Resalta la card (p. ej. la central del coverflow): sombra de acento fija. */
  highlighted?: boolean;
  /* true = toda la card es un enlace al detalle; false = no navega (el padre decide). */
  asLink?: boolean;
  /* Card que representa todas las tallas: el sello dice "Desde S/ X". */
  fromPrice?: number;
  /* Quita la talla del final del título. Con context 'category', lista todas las tallas del producto. */
  hideSize?: boolean;
  context?: ProductCardContext;
};

const IMAGE_SIZES = '(min-width: 768px) 300px, 60vw';
/* `cq-sm:` responde al ancho de la card, no de la pantalla: < 13rem = versión compacta. */
const FOOTER_CLASS = 'mt-auto flex items-center border-t border-papel-sombra/70 pt-3';

const HOVER_FADE = '[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100';

/*
  Salpicado del sabor. Aparece al hover, o fijo cuando la card está destacada
  (centro del coverflow); en táctil (sin hover) se ve siempre. Decorativo.
*/
const SplashLayers = ({ layers, highlighted }: { layers: SplashLayer[]; highlighted: boolean }) =>
  layers.map((layer) => (
    <div
      key={layer.src}
      aria-hidden
      style={{ transitionDelay: layer.delay }}
      className={
        layer.motion
          ? cn(
              'pointer-events-none absolute transition-all duration-500',
              layer.motion.ease,
              layer.className,
              highlighted ? 'opacity-100' : cn('opacity-100', HOVER_FADE, layer.motion.enter),
            )
          : cn(
              'pointer-events-none absolute transition-all duration-500 ease-out',
              layer.className,
              highlighted
                ? 'scale-100 opacity-100'
                : 'scale-100 opacity-100 [@media(hover:hover)]:scale-90 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100',
            )
      }
    >
      <Image src={layer.src} alt='' aria-hidden fill sizes={IMAGE_SIZES} className='object-contain' />
    </div>
  ));

export const ProductShowcaseCard = ({
  product,
  highlighted = false,
  asLink = true,
  fromPrice,
  hideSize = false,
  context = 'general',
}: Props) => {
  const accent = accentFor(product);
  const tone = toneStyles[accent];
  const category = categoryDetails[product.category]?.title ?? 'Producto';
  const url = getProductUrl(product.slug);
  const splashes = getProductSplash(product);
  const comingSoon = getDisplayTags(product)[0] === 'coming-soon';
  const photoPending = isPhotoPending(product);

  // "Ver producto" es enlace real solo cuando la card no navega entera pero está centrada.
  const ctaIsLink = !asLink && highlighted;

  const rootClass = cn(
    'group cq flex h-full w-full flex-col overflow-hidden rounded-card bg-papel-hueso transition-all duration-300 ease-out',
    highlighted
      ? cn(tone.shadowStatic, styles.ring)
      : cn(asLink && 'hover:-translate-x-1 hover:-translate-y-1', tone.shadow),
  );

  const backdrop = (
    <>
      <ToneHalo tone={accent} />
      <SplashLayers layers={splashes.filter((layer) => layer.placement !== 'front')} highlighted={highlighted} />
    </>
  );

  const cta = (
    <span className='text-sm font-semibold text-tinta underline decoration-tinta/30 underline-offset-4 transition-colors duration-200 group-hover:decoration-tinta'>
      Ver producto
    </span>
  );

  const titleClass =
    'font-display text-[15px] font-semibold leading-[1.2] tracking-tight text-tinta cq-sm:text-lg cq-sm:leading-[1.1]';

  const sizes = hideSize ? getSizeVariants(product).map((p) => p.size) : [product.size];
  const sizeLine = sizes.filter(Boolean).join(' · ');

  const header =
    context === 'category' ? (
      <div className='flex flex-col gap-1'>
        <h3 className={titleClass}>{getProductShortName(product)}</h3>
        {sizeLine && <p className='text-xs font-medium text-tinta-suave cq-sm:text-sm'>{sizeLine}</p>}
      </div>
    ) : (
      <>
        <span className='hidden text-xs font-medium text-tinta-suave cq-sm:block'>{category}</span>

        <h3 className={cn(titleClass, 'cq-sm:min-h-[2.6em]')}>
          {keepUnitsTogether(hideSize ? getProductBaseTitle(product) : product.title)}
        </h3>
      </>
    );

  const inner = (
    <>
      {/* Panel de imagen con halo de fermento y sello de precio */}
      <div className='relative aspect-square overflow-hidden'>
        {/* PROVISIONAL: sin foto propia, el color del sabor en vez de la botella (ver ComingSoonArt). */}
        {photoPending ? (
          <ComingSoonArt product={product} />
        ) : (
          <>
            {backdrop}
            <Image
              src={product.thumbnailImage}
              alt={product.title}
              fill
              sizes={IMAGE_SIZES}
              className='object-contain px-4 pb-3 pt-9 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04] cq-sm:p-6'
            />
            <SplashLayers layers={splashes.filter((layer) => layer.placement === 'front')} highlighted={highlighted} />
          </>
        )}
        {/* Sello de precio y, debajo, "Próximamente": apilados para no chocar en cards angostas. */}
        <div className='absolute left-2 top-2 flex flex-col items-start gap-1 cq-sm:left-3 cq-sm:top-3'>
          <span
            className={cn(
              'rounded-[4px] px-2 py-0.5 font-display text-xs font-semibold tracking-tight cq-sm:px-2.5 cq-sm:py-1 cq-sm:text-sm',
              photoPending ? COMING_SOON_PRICE_CLASS : 'bg-tinta text-papel',
            )}
          >
            {fromPrice !== undefined ? `Desde ${formatPrice(fromPrice)}` : formatPrice(product.price)}
          </span>
          {comingSoon && (
            <ShimmerBadge variant={badgeConfig['coming-soon'].variant} className='px-2 py-0.5 cq-sm:px-2.5 cq-sm:py-1'>
              {badgeConfig['coming-soon'].label}
            </ShimmerBadge>
          )}
        </div>
      </div>

      <div className='flex flex-grow flex-col gap-2 p-3 cq-sm:p-4'>
        {header}

        {ctaIsLink ? (
          <Link href={url} onClick={(e) => e.stopPropagation()} className={FOOTER_CLASS}>
            {cta}
          </Link>
        ) : (
          <div className={FOOTER_CLASS}>{cta}</div>
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
