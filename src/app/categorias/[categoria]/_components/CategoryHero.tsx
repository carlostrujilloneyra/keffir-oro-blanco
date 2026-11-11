import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { withAlpha } from '@/lib/color';
import { inlineMarkdown } from '@/lib/inlineMarkdown';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Stagger } from '@/components/ui/Motion/Motion';
import type { SubcategoryPanel } from '@/features/products';
import styles from './CategoryHero.module.scss';

/* Accesos del hero: subcategorías (categoría) o productos (subcategoría). */
const CHIP_CLASS =
  'flex min-h-11 flex-col justify-center rounded-[8px] border border-white/15 bg-white/10 px-3 py-1.5 transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-papel tablet:py-2';

const CONTENT_CLASS =
  'relative z-10 flex max-w-full flex-col justify-center gap-3 px-1 pb-2 tablet:min-h-[320px] tablet:px-6 tablet:py-8 lg:min-h-[380px] lg:gap-4 lg:px-6 lg:py-10';

type Props = {
  title: string;
  eyebrow: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  /* Escala de la imagen desde lg, anclada abajo (grupos de varias botellas). */
  imageScale?: number;
  count: number;
  /* Fondo y luz con los colores de la etiqueta del producto. */
  panel: SubcategoryPanel;
  /* Subcategorías: un acceso por producto en vez del contador. */
  productLinks?: { title: string; items: { label: string; priceLabel: string; href: string }[] };
  parent?: { title: string; href: string };
  /* Accesos a las subcategorías con su precio "Desde" (sin él, nada disponible aún). Si faltan, se muestra solo el contador. */
  shortcuts?: { label: string; href: string; fromPrice?: number }[];
};

export const CategoryHero = ({
  title,
  eyebrow,
  description,
  imageUrl,
  imageAlt,
  imageScale = 1,
  count,
  panel,
  productLinks,
  parent,
  shortcuts,
}: Props) => {
  /* Luz del sabor arriba a la izquierda (14%) sobre el fondo de la etiqueta. */
  const background = `radial-gradient(70% 90% at 12% 18%, ${withAlpha(panel.glow, 0.14)}, ${withAlpha(panel.glow, 0)} 70%), ${panel.backdrop}`;

  return (
    <div
      style={{ background }}
      className='relative mt-4 flex flex-col gap-2 overflow-hidden rounded-panel px-4 py-5 tablet:mt-6 tablet:gap-4 tablet:p-4 md:p-8 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-8 lg:px-8 lg:py-12'
    >
      <div aria-hidden className={styles.grain} />

      <Stagger delay={0.15} className={CONTENT_CLASS}>
        {/* Migas de pan */}
        <nav
          aria-label='Migas de pan'
          className='mb-1 flex items-center gap-1.5 text-xs text-papel/70 tablet:mb-4 md:mb-6 md:text-sm'
        >
          <Link href='/' className='transition-colors hover:text-papel'>
            Inicio
          </Link>

          {parent && (
            <>
              <ChevronRight className='h-3.5 w-3.5 text-papel/40 md:h-4 md:w-4' />
              <Link href={parent.href} className='transition-colors hover:text-papel'>
                {parent.title}
              </Link>
            </>
          )}

          <ChevronRight className='h-3.5 w-3.5 text-papel/40 md:h-4 md:w-4' />
          <span className='font-medium text-papel'>{title}</span>
        </nav>

        <Eyebrow variant='light'>{eyebrow}</Eyebrow>

        <h1 className='font-display text-3xl font-semibold leading-[1.03] tracking-tight text-papel lg:text-5xl'>
          {title}
        </h1>

        <p className='max-w-xl text-[13px] text-papel/80 md:text-base'>{inlineMarkdown(description)}</p>

        {shortcuts && shortcuts.length > 0 ? (
          <nav aria-label={`Tipos de ${title}`} className='mt-2 flex flex-col gap-3'>
            <p className='text-xs font-medium text-papel/70 md:text-sm'>Elige por tipo · {count} productos</p>
            {/* Sin scroll: todos visibles. En móvil, chips compactos solo con el nombre;
              desde tablet, con su precio "Desde". El ancho máximo reparte 4 chips en 2 + 2
              en vez de dejar una sola en la última fila. */}
            <ul className='flex max-w-[35rem] flex-wrap gap-2'>
              {shortcuts.map(({ label, href, fromPrice }) => (
                <li key={href}>
                  <Link href={href} className={CHIP_CLASS}>
                    <span className='text-[13px] font-semibold text-papel tablet:text-sm'>{label}</span>
                    {fromPrice !== undefined && (
                      <span className='hidden text-xs text-papel/70 tablet:block'>Desde {formatPrice(fromPrice)}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : productLinks ? (
          <nav aria-label={`Productos de ${title}`} className='mt-2 flex flex-col gap-3'>
            <p className='text-xs font-medium text-papel/70 md:text-sm'>{productLinks.title}</p>
            {/* Se envuelven en varias filas: sin scroll horizontal. */}
            <ul className='flex flex-wrap gap-2'>
              {productLinks.items.map(({ label, priceLabel, href }) => (
                <li key={href}>
                  <Link href={href} className={CHIP_CLASS}>
                    <span className='text-[13px] font-semibold text-papel tablet:text-sm'>{label}</span>
                    <span className='text-xs text-papel/70'>{priceLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span className='inline-flex w-fit items-center self-start rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-papel/85 md:text-base'>
            {count} {count === 1 ? 'producto' : 'productos'}
          </span>
        )}
      </Stagger>

      {/* Va después del texto en el DOM; en móvil se muestra arriba con order-first. Desde lg es la segunda columna:
          la imagen va en absoluto para que el alto lo marque el panel de texto, no la foto. */}
      <div
        className={cn(
          styles.stage,
          'pointer-events-none relative order-first mt-5 h-52 w-full tablet:mt-6 tablet:h-72 lg:order-none lg:mt-0 lg:h-auto lg:min-h-[340px] lg:self-stretch',
        )}
      >
        {/* Luz del sabor detrás del producto: se funde con el fondo, sin bordes. */}
        <div
          aria-hidden
          style={{
            background: `radial-gradient(closest-side, ${withAlpha(panel.glow, 0.3)}, ${withAlpha(panel.glow, 0)})`,
          }}
          className={cn(
            'absolute left-1/2 top-1/2 h-[120%] w-[120%] max-w-[36rem] -translate-x-1/2 -translate-y-1/2',
            styles.halo,
          )}
        />
        <span aria-hidden className={cn(styles.shadow, styles.grounded)} />
        {/*
          La escala va en un contenedor: la imagen ya usa transform para flotar. Solo desde lg:
          en mobile/tablet la imagen ya llena el alto del escenario y escalarla la cortaría arriba.
        */}
        <div
          className='absolute inset-0 origin-bottom lg:scale-[var(--image-scale)]'
          style={{ '--image-scale': imageScale } as React.CSSProperties}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={460}
            height={460}
            priority
            sizes='(min-width: 1024px) 45vw, 300px'
            className={cn(
              styles.float,
              'absolute inset-0 h-full w-full select-none object-contain object-bottom lg:inset-y-6 lg:h-[calc(100%-3rem)]',
            )}
          />
        </div>
      </div>
    </div>
  );
};
