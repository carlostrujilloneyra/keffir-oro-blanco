import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge/badge';
import { getProductUrl } from '@/lib/routes';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Button } from '@/components/ui/Button/Button';
import { cn } from '@/lib/utils';

export interface HeroSlideProps {
  eyebrow: string;
  title: string;
  description: string;
  /* Talla y precio del producto: "475 ml · S/ 18.50". */
  meta: string;
  image: string;
  /* Salpicado decorativo detrás de la botella. */
  splash?: string;
  /* Clase de color del halo, según el tono del slide. */
  glow: string;
  isNew?: boolean;
  slug: string;
}

export const HeroSlide = ({ eyebrow, title, description, meta, image, splash, glow, isNew, slug }: HeroSlideProps) => {
  const imageAlt = `Imagen de ${title}`;
  const titleId = `hero-slide-${slug}`;

  return (
    /*
      Cada slide promociona un producto completo (título, descripción, imagen y
      enlace): es contenido con sentido propio → <article>, nombrado por su H2.
    */
    <article
      aria-labelledby={titleId}
      className='relative grid h-full grid-cols-1 content-start items-center gap-6 pb-16 lg:grid-cols-[1.05fr_1fr] lg:content-center lg:gap-10 lg:pb-16'
    >
      {/* Texto */}
      <div className='hero-text order-2 flex flex-col items-start gap-4 px-6 pt-6 tablet:px-10 lg:order-1 lg:py-16 lg:pl-16 lg:pr-6'>
        <div className='flex items-center gap-3'>
          <Eyebrow variant='light'>{eyebrow}</Eyebrow>
          {isNew && <Badge variant='alert'>Nuevo</Badge>}
        </div>

        <h2 id={titleId} className='font-display text-display font-semibold leading-[1.02] text-papel'>
          {title}
        </h2>

        <p className='max-w-measure text-justify font-sans text-base leading-relaxed text-papel/75 tablet:text-lg lg:text-justify'>
          {description}
        </p>

        <p className='font-display text-lg font-semibold text-papel'>{meta}</p>

        <div className='mt-3'>
          <Button asChild variant='miel'>
            <Link href={getProductUrl(slug)}>Ver producto</Link>
          </Button>
        </div>
      </div>

      <div className='hero-media relative order-1 flex min-h-[340px] items-center justify-center lg:order-2 lg:min-h-[560px]'>
        <div
          aria-hidden
          className={cn(
            'absolute left-1/2 top-1/2 aspect-square w-[88%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]',
            glow,
          )}
        />
        <div
          aria-hidden
          className='absolute bottom-[10%] left-1/2 h-6 w-[52%] max-w-[300px] -translate-x-1/2 rounded-[50%] bg-black/45 blur-xl'
        />
        {/* Girado -90° para que el borde recortado quede abajo; la máscara lo funde con el fondo. */}
        {splash && (
          <div className='absolute left-1/2 top-1/2 aspect-square h-[78%] -translate-x-1/2 -translate-y-1/2 [mask-image:linear-gradient(to_top,transparent_8%,black_45%)]'>
            <Image
              src={splash}
              alt=''
              aria-hidden
              fill
              sizes='(min-width: 1024px) 40vw, 80vw'
              className='-rotate-90 object-contain opacity-40'
            />
          </div>
        )}

        {/* Mismo alto relativo en todos los slides: la escala no depende del encuadre de cada foto. */}
        <div className='absolute inset-x-0 top-1/2 h-[78%] -translate-y-1/2'>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes='(min-width: 1024px) 44vw, 90vw'
            className='object-contain object-bottom px-4 pt-6 drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)]'
            priority
          />
        </div>
      </div>
    </article>
  );
};
