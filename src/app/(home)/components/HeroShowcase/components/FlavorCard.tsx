import Image from 'next/image';
import Link from 'next/link';
import { toneStyles, type Tone } from '@/features/products';
import { cn } from '@/lib/utils';
import type { ResolvedHeroSlide } from '../lib/resolveHeroSlides';
import styles from './FlavorCard.module.scss';

type Props = {
  flavor: string;
  thumbnail: ResolvedHeroSlide['thumbnail'];
  priceLabel: string;
  url: string;
  linkLabel: string;
  tone: Tone;
  active: boolean;
  onSelect: () => void;
};

export const FlavorCard = ({ flavor, thumbnail, priceLabel, url, linkLabel, tone, active, onSelect }: Props) => (
  <div
    className={cn(
      'relative flex h-full items-center gap-2.5 rounded-card p-2.5 transition-colors duration-300 ease-suave',
      /* La inactiva lleva borde de 1px (vidrio): la activa reserva el mismo espacio para no saltar. */
      active
        ? cn('border border-transparent bg-papel text-tinta', toneStyles[tone].shadowStatic)
        : cn('text-papel', styles.glass),
    )}
  >
    <div
      className={cn(
        'relative shrink-0 overflow-hidden',
        thumbnail.fit === 'cover' ? 'h-12 w-12 rounded-[8px] lg:h-16 lg:w-16' : 'h-20 w-12',
      )}
    >
      <Image
        src={thumbnail.src}
        alt=''
        fill
        sizes='64px'
        style={{ objectPosition: thumbnail.position }}
        className={thumbnail.fit === 'cover' ? 'object-cover' : 'object-contain'}
      />
    </div>

    <div className='flex min-w-0 flex-col items-start gap-0.5'>
      <button
        type='button'
        onClick={onSelect}
        aria-current={active ? 'true' : undefined}
        className="text-left font-display text-sm font-semibold leading-tight after:absolute after:inset-0 after:rounded-card after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-miel"
      >
        {flavor}
      </button>
      <span className='text-xs'>{priceLabel}</span>
      <Link
        href={url}
        aria-label={`${linkLabel}: ${flavor}`}
        className='relative z-10 py-1 text-xs font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel'
      >
        {linkLabel}
      </Link>
    </div>
  </div>
);
