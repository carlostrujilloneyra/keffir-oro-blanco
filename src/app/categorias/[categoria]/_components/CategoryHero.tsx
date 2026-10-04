import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

export type CategoryTone = 'verde' | 'miel';

const toneStyles: Record<CategoryTone, { gradient: string; halo: string; dot: string }> = {
  verde: {
    gradient:
      'radial-gradient(75% 120% at 100% 0%, rgba(47,125,82,0.55), rgba(47,125,82,0.26) 36%, rgba(22,32,26,0) 74%),' +
      'radial-gradient(90% 140% at 0% 100%, rgba(47,125,82,0.36), rgba(30,58,47,0.20) 44%, rgba(22,32,26,0) 82%),' +
      '#16201A',
    halo: 'bg-verde/40',
    dot: 'bg-miel',
  },
  miel: {
    gradient:
      'radial-gradient(75% 120% at 100% 0%, rgba(242,183,5,0.42), rgba(242,183,5,0.22) 36%, rgba(22,32,26,0) 74%),' +
      'radial-gradient(90% 140% at 0% 100%, rgba(201,134,14,0.34), rgba(201,134,14,0.18) 44%, rgba(22,32,26,0) 82%),' +
      '#16201A',
    halo: 'bg-miel/35',
    dot: 'bg-miel',
  },
};

type Props = {
  title: string;
  eyebrow: string;
  description: string;
  imageUrl: string;
  count: number;
  tone: CategoryTone;

  /* Miga intermedia. Solo la usan las subcategorías: Inicio › Padre › Actual. */
  parent?: { title: string; href: string };
};

export const CategoryHero = ({ title, eyebrow, description, imageUrl, count, tone, parent }: Props) => {
  const t = toneStyles[tone];

  return (
    <div
      style={{ background: t.gradient }}
      className='relative overflow-hidden rounded-[32px] px-4 py-5 tablet:p-4 md:p-8 lg:px-8 lg:py-12'
    >
      <div
        className={cn(
          'pointer-events-none absolute right-4 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full blur-3xl lg:block',
          t.halo,
        )}
      />

      <Image
        src={imageUrl}
        alt=''
        aria-hidden
        width={460}
        height={460}
        className='pointer-events-none absolute right-6 top-1/2 z-0 hidden w-[280px] -translate-y-1/2 select-none object-contain lg:block xl:right-16 xl:w-[340px]'
      />

      {/* Panel glass con el contenido */}
      <div className='relative z-10 flex min-h-[320px] max-w-full flex-col justify-center gap-3 rounded-[24px] border border-white/15 bg-white/[0.07] px-4 py-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl tablet:px-10 tablet:py-12 lg:min-h-[380px] lg:max-w-[600px] lg:gap-4 lg:px-14 lg:py-16'>
        {/* Migas de pan */}
        <nav aria-label='Migas de pan' className='mb-4 flex items-center gap-1.5 text-xs text-papel/70 md:mb-6'>
          <Link href='/' className='transition-colors hover:text-papel'>
            Inicio
          </Link>

          {parent && (
            <>
              <ChevronRight className='h-3.5 w-3.5 text-papel/40' />
              <Link href={parent.href} className='transition-colors hover:text-papel'>
                {parent.title}
              </Link>
            </>
          )}

          <ChevronRight className='h-3.5 w-3.5 text-papel/40' />
          <span className='font-medium text-papel'>{title}</span>
        </nav>

        <Eyebrow tone='miel' className='tracking-[0.18em] text-papel/80'>
          {eyebrow}
        </Eyebrow>

        <h1 className='font-display text-3xl font-semibold leading-[1.03] tracking-tight text-papel lg:text-6xl'>
          {title}
        </h1>

        <p className='max-w-xl text-[13px] text-papel/80 md:text-base lg:text-lg'>{description}</p>

        <span className='inline-flex w-fit items-center self-start rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-papel/85 md:text-base'>
          {count} {count === 1 ? 'producto' : 'productos'}
        </span>
      </div>
    </div>
  );
};
