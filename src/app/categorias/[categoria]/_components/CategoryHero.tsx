import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { inlineMarkdown } from '@/lib/inlineMarkdown';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Stagger } from '@/components/ui/Motion/Motion';
import type { SectionTone } from '@/features/products';
import styles from './CategoryHero.module.scss';

const toneStyles: Record<SectionTone, { gradient: string; halo: string }> = {
  verde: {
    gradient:
      'radial-gradient(75% 120% at 100% 0%, rgba(47,125,82,0.55), rgba(47,125,82,0.26) 36%, rgba(22,32,26,0) 74%),' +
      'radial-gradient(90% 140% at 0% 100%, rgba(47,125,82,0.36), rgba(30,58,47,0.20) 44%, rgba(22,32,26,0) 82%),' +
      '#16201A',
    halo: 'bg-verde/40',
  },
  miel: {
    gradient:
      'radial-gradient(75% 120% at 100% 0%, rgba(242,183,5,0.42), rgba(242,183,5,0.22) 36%, rgba(22,32,26,0) 74%),' +
      'radial-gradient(90% 140% at 0% 100%, rgba(201,134,14,0.34), rgba(201,134,14,0.18) 44%, rgba(22,32,26,0) 82%),' +
      '#16201A',
    halo: 'bg-miel/35',
  },
};

type Props = {
  title: string;
  eyebrow: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  count: number;
  tone: SectionTone;
  parent?: { title: string; href: string };
  /* Accesos a las subcategorías con su precio "desde". Si faltan, se muestra solo el contador. */
  shortcuts?: { label: string; href: string; fromPrice: number }[];
};

export const CategoryHero = ({
  title,
  eyebrow,
  description,
  imageUrl,
  imageAlt,
  count,
  tone,
  parent,
  shortcuts,
}: Props) => {
  const t = toneStyles[tone];

  return (
    <div
      style={{ background: t.gradient }}
      className='relative mt-4 flex flex-col gap-2 overflow-hidden rounded-panel px-4 py-5 tablet:mt-0 tablet:gap-4 tablet:p-4 md:p-8 lg:block lg:px-8 lg:py-12'
    >
      <div
        className={cn(
          'pointer-events-none absolute right-4 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full blur-3xl lg:block xl:left-[calc(50%+140px)] xl:right-auto',
          styles.halo,
          t.halo,
        )}
      />

      {/* Panel glass con el contenido */}
      <Stagger
        delay={0.15}
        className='relative z-10 flex max-w-full flex-col justify-center gap-3 px-1 pb-2 tablet:min-h-[320px] tablet:rounded-[24px] tablet:border tablet:border-white/15 tablet:bg-white/[0.07] tablet:px-10 tablet:py-12 tablet:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] tablet:backdrop-blur-xl lg:min-h-[380px] lg:max-w-[600px] lg:gap-4 lg:px-14 lg:py-16'
      >
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
              desde tablet, con su precio "desde". */}
            <ul className='flex flex-wrap gap-2'>
              {shortcuts.map(({ label, href, fromPrice }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className='flex min-h-11 flex-col justify-center rounded-[8px] border border-white/15 bg-white/10 px-3 py-1.5 transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-papel tablet:py-2'
                  >
                    <span className='text-[13px] font-semibold text-papel tablet:text-sm'>{label}</span>
                    <span className='hidden text-xs text-papel/70 tablet:block'>desde {formatPrice(fromPrice)}</span>
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

      {/* Va después del texto en el DOM; en móvil se muestra arriba con order-first. */}
      <div
        className={cn(
          styles.stage,
          'pointer-events-none relative order-first mt-5 h-52 w-full tablet:mt-6 tablet:h-72 lg:absolute lg:right-6 lg:top-1/2 lg:z-0 lg:mt-0 lg:h-[86%] lg:w-[340px] lg:-translate-y-1/2 xl:left-[656px] xl:right-14 xl:w-auto',
        )}
      >
        <span aria-hidden className={styles.shadow} />
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={460}
          height={460}
          priority
          sizes='(min-width: 1280px) 560px, (min-width: 1024px) 340px, 300px'
          className={cn(styles.float, 'h-full w-full select-none object-contain object-bottom')}
        />
      </div>
    </div>
  );
};
