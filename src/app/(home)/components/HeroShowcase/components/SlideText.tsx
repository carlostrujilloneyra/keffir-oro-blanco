import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { CATALOG_URL } from '@/lib/routes';
import type { ResolvedHeroSlide } from '../lib/resolveHeroSlides';

/* Array y no fragmento: `Stagger` anima cada hijo directo por separado. */
export const getSlideText = (slide: ResolvedHeroSlide) => [
  <Eyebrow key='eyebrow' variant='light'>
    {slide.eyebrow}
  </Eyebrow>,
  <h2 key='headline' className='text-balance font-display text-display font-semibold text-papel'>
    {slide.headline}
  </h2>,
  <p key='description' className='max-w-[34rem] text-base leading-relaxed text-papel/80 tablet:text-lg'>
    {slide.description}
  </p>,
  <div key='actions' className='flex flex-wrap gap-3'>
    <Button asChild variant='primary'>
      <Link href={slide.url}>{slide.ctaLabel}</Link>
    </Button>
    <Button asChild variant='light'>
      <Link href={CATALOG_URL}>Ver todos los productos</Link>
    </Button>
  </div>,
];
