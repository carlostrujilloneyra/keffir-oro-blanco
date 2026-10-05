import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { inlineMarkdown } from '@/lib/inlineMarkdown';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

export type CategoryTone = 'verde' | 'miel';

const toneStyles: Record<CategoryTone, { gradient: string; halo: string }> = {
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
  tone: CategoryTone;
  /* Miga intermedia. Solo la usan las subcategorías: Inicio › Padre › Actual. */
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
      className='relative flex flex-col gap-4 overflow-hidden rounded-panel px-4 py-5 tablet:p-4 md:p-8 lg:block lg:px-8 lg:py-12'
    >
      <div
        className={cn(
          'pointer-events-none absolute right-4 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full blur-3xl lg:block',
          t.halo,
        )}
      />

      {/* Panel glass con el contenido */}
      <div className='relative z-10 flex min-h-[320px] max-w-full flex-col justify-center gap-3 rounded-[24px] border border-white/15 bg-white/[0.07] px-4 py-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl tablet:px-10 tablet:py-12 lg:min-h-[380px] lg:max-w-[600px] lg:gap-4 lg:px-14 lg:py-16'>
        {/* Migas de pan */}
        <nav
          aria-label='Migas de pan'
          className='mb-4 flex items-center gap-1.5 text-xs text-papel/70 md:mb-6 md:text-sm'
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

        <h1 className='font-display text-3xl font-semibold leading-[1.03] tracking-tight text-papel lg:text-6xl'>
          {title}
        </h1>

        <p className='max-w-xl text-[13px] text-papel/80 md:text-base lg:text-lg'>{inlineMarkdown(description)}</p>

        {shortcuts && shortcuts.length > 0 ? (
          <nav aria-label={`Tipos de ${title}`} className='mt-2 flex flex-col gap-2'>
            <p className='text-xs font-medium text-papel/70 md:text-sm'>Elige por tipo · {count} productos</p>
            {/* Móvil: fila deslizable (sin barra visible) que se desvanece a la derecha para
              indicar que hay más. El ::after es un espaciador final: deja el último acceso
              fuera del desvanecido al llegar al final (el padding no siempre suma al scroll). */}
            <ul className="flex snap-x gap-2 overflow-x-auto scrollbar-none [mask-image:linear-gradient(to_right,black_80%,transparent)] after:w-16 after:shrink-0 after:content-[''] tablet:flex-wrap tablet:overflow-visible tablet:[mask-image:none] tablet:after:hidden">
              {shortcuts.map(({ label, href, fromPrice }) => (
                <li key={href} className='shrink-0 snap-start'>
                  <Link
                    href={href}
                    className='flex flex-col rounded-[8px] border border-white/15 bg-white/10 px-3 py-2 transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-papel'
                  >
                    <span className='text-sm font-semibold text-papel'>{label}</span>
                    <span className='text-xs text-papel/70'>desde S/ {formatPrice(fromPrice)}</span>
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
      </div>

      {/* Va después del texto en el DOM; en móvil se muestra arriba con order-first. */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={460}
        height={460}
        priority
        sizes='(min-width: 1280px) 340px, (min-width: 1024px) 280px, 300px'
        className='pointer-events-none order-first mx-auto h-60 w-auto select-none object-contain tablet:h-72 lg:absolute lg:right-6 lg:top-1/2 lg:z-0 lg:h-[85%] lg:w-auto lg:max-w-[280px] lg:-translate-y-1/2 xl:right-16 xl:max-w-[340px]'
      />
    </div>
  );
};
