import Image from 'next/image';
import Link from 'next/link';
import { toneStyles, type Tone } from '@/features/products';
import { cn } from '@/lib/utils';

type Props = {
  flavor: string;
  image: string;
  priceLabel: string;
  url: string;
  tone: Tone;
  active: boolean;
  onSelect: () => void;
};

export const FlavorCard = ({ flavor, image, priceLabel, url, tone, active, onSelect }: Props) => (
  /*
    Enlace estirado: el ::after del botón cubre la card y elige el sabor. "Ver
    producto" queda encima (z-10) porque un <button> no puede contener un enlace.
  */
  <div
    className={cn(
      'relative flex h-full items-center gap-2.5 rounded-card p-2.5 transition-colors duration-300 ease-suave',
      active ? cn('bg-papel text-tinta', toneStyles[tone].shadowStatic) : 'bg-papel/10 text-papel hover:bg-papel/20',
    )}
  >
    <div className='relative h-20 w-12 shrink-0'>
      <Image src={image} alt='' fill sizes='48px' className='object-contain' />
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
        aria-label={`Ver producto: ${flavor}`}
        className='relative z-10 py-1 text-xs font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel'
      >
        Ver producto
      </Link>
    </div>
  </div>
);
