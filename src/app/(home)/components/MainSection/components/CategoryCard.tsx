import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, type ButtonVariant } from '@/components/ui/Button/Button';

type Theme = 'verde' | 'miel';

const themes: Record<Theme, { tile: string; button: ButtonVariant; ring: string }> = {
  verde: {
    tile: 'bg-gradient-to-br from-verde/20 via-verde/10 to-transparent',
    button: 'primary',
    ring: 'group-hover:border-verde/30',
  },
  miel: {
    tile: 'bg-gradient-to-br from-miel/30 via-miel/12 to-transparent',
    button: 'miel',
    ring: 'group-hover:border-miel/40',
  },
};

interface CategoryCardProps {
  eyebrow: string;
  title: string;
  linkUrl: string;
  imageSrc: string;
  imageAlt: string;
  theme?: Theme;
  ctaLabel?: string;
}

export const CategoryCard = ({
  eyebrow,
  title,
  linkUrl,
  imageSrc,
  imageAlt,
  theme = 'verde',
  ctaLabel = 'Ver productos',
}: CategoryCardProps) => {
  const t = themes[theme];

  return (
    <Link
      href={linkUrl}
      className={cn(
        'ease-[cubic-bezier(0.32,0.72,0,1)] group flex flex-col gap-2 overflow-hidden rounded-[24px] border border-papel-sombra bg-papel p-3 transition-all duration-500 hover:-translate-y-1 tablet:min-h-[300px] tablet:flex-row tablet:items-stretch',
        t.ring,
      )}
    >
      {/* Texto */}
      <div className='flex flex-1 flex-col justify-center gap-4 p-5'>
        <span className='text-sm font-medium text-tinta-suave'>{eyebrow}</span>

        <h3 className='font-display text-2xl font-semibold leading-[1.05] tracking-tight text-tinta xl:text-[30px]'>
          {title}
        </h3>

        {/* Solo visual: el enlace es la card entera. */}
        <Button asChild variant={t.button} className='mt-2'>
          <span>{ctaLabel}</span>
        </Button>
      </div>

      {/* Producto sobre tile de acento (doble-bisel) */}
      <div
        className={cn(
          'relative order-first h-60 w-full shrink-0 overflow-hidden rounded-[16px] tablet:order-none tablet:h-auto tablet:w-[44%]',
          t.tile,
        )}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes='(min-width: 1024px) 320px, (min-width: 600px) 45vw, 90vw'
          className='ease-[cubic-bezier(0.32,0.72,0,1)] object-contain p-3 transition-transform duration-500 group-hover:scale-105 tablet:p-5'
        />
      </div>
    </Link>
  );
};
