import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { getSubcategoryUrl } from '@/lib/routes';
import { getSubcategoryImage, type SubcategoryDetail } from '@/features/products';
import { toneStyles } from '@/features/products/lib/productAccent';

type Props = {
  subcategory: SubcategoryDetail;
  fromPrice: number;
  count: number;
};

const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

export const SubcategoryCard = ({ subcategory, fromPrice, count }: Props) => {
  const tone = toneStyles[subcategory.tone];

  return (
    <Link
      href={getSubcategoryUrl(subcategory.category, subcategory.slug)}
      className={cn(
        'group flex h-full overflow-hidden rounded-card bg-papel-hueso transition-all duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 tablet:flex-col',
        tone.shadow,
      )}
    >
      <div className='relative min-h-28 w-28 shrink-0 tablet:h-52 tablet:min-h-0 tablet:w-full'>
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-transform duration-500 ease-out group-hover:scale-110',
            tone.halo,
          )}
        />
        <Image
          src={getSubcategoryImage(subcategory)}
          alt=''
          fill
          sizes='(min-width: 1024px) 300px, (min-width: 600px) 45vw, 112px'
          className='object-contain p-3 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04] tablet:p-6'
        />
      </div>

      <div className='flex flex-1 flex-col gap-1.5 p-4 tablet:gap-2'>
        <h3 className='font-display text-lg font-semibold leading-[1.1] tracking-tight text-tinta tablet:text-xl'>
          {subcategory.title}
        </h3>

        <p className='line-clamp-2 text-sm text-tinta-media'>{firstSentence(subcategory.description)}</p>

        <div className='mt-auto flex items-center justify-between gap-3 border-t border-papel-sombra/70 pt-3 text-sm'>
          <span className='font-display font-semibold text-tinta'>Desde S/ {formatPrice(fromPrice)}</span>
          <span className='text-tinta-media'>
            {count} {count === 1 ? 'producto' : 'productos'}
          </span>
        </div>
      </div>
    </Link>
  );
};
