import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge/badge';
import { getProductUrl } from '@/lib/routes';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Button } from '@/components/ui/Button/Button';

export interface HeroSlideProps {
  description: string;
  image: string;
  isNew?: boolean;
  slug: string;
  title: string;
}

export const HeroSlide = ({ description, image, isNew, slug, title }: HeroSlideProps) => {
  const imageAlt = `Imagen de ${title}`;
  const titleId = `hero-slide-${slug}`;

  return (
    /*
      Cada slide promociona un producto completo (título, descripción, imagen y
      enlace): es contenido con sentido propio → <article>, nombrado por su H2.
    */
    <article
      aria-labelledby={titleId}
      className='relative grid grid-cols-1 items-center gap-6 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-16'
    >
      {/* Texto */}
      <div className='hero-text order-2 flex flex-col items-start gap-4 px-6 pt-6 tablet:px-10 lg:order-1 lg:py-16 lg:pl-16 lg:pr-6'>
        <div className='flex items-center gap-3'>
          <Eyebrow variant='light'>Artesanal · Fermento vivo</Eyebrow>
          {isNew && <Badge variant='alert'>Nuevo</Badge>}
        </div>

        <h2 id={titleId} className='font-display text-display font-semibold leading-[1.02] text-papel'>
          {title}
        </h2>

        <p className='max-w-measure text-justify font-sans text-base leading-relaxed text-papel/75 tablet:text-lg lg:text-justify'>
          {description}
        </p>

        <div className='mt-3'>
          <Button asChild variant='miel'>
            <Link href={getProductUrl(slug)}>Ver producto</Link>
          </Button>
        </div>
      </div>

      <div className='hero-media relative order-1 flex min-h-[340px] items-center justify-center lg:order-2 lg:min-h-[560px]'>
        <div
          aria-hidden
          className='absolute left-1/2 top-1/2 aspect-square w-[88%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-verde/25 blur-[70px]'
        />
        <div
          aria-hidden
          className='absolute bottom-[10%] left-1/2 h-6 w-[52%] max-w-[300px] -translate-x-1/2 rounded-[50%] bg-black/45 blur-xl'
        />
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes='(min-width: 1024px) 44vw, 90vw'
          className='object-contain p-4 drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)] lg:p-2'
          priority
        />
      </div>
    </article>
  );
};
