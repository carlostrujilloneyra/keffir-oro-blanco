'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { EASE_SUAVE, Stagger } from '@/components/ui/Motion/Motion';
import {
  getProductBaseTitle,
  getProductById,
  getProductGroups,
  getProductImage,
  getProductUrlById,
  getSizeVariants,
  ProductCategory,
  type Tone,
} from '@/features/products';
import { ToneHalo } from '@/features/products/components/ToneHalo';
import { formatPrice } from '@/lib/formatPrice';
import { getCategoryUrl } from '@/lib/routes';
import { FlavorCard } from './components/FlavorCard';
import { heroSlides, type HeroSlide } from './data/heroSlides';

const PHOTO_SIZES = '(min-width: 1400px) 1400px, 100vw';
const BOTTLE_SIZES = '(min-width: 1024px) 40vw, 90vw';

/* Glow arriba a la derecha + glow abajo a la izquierda + base oscura. */
const TONE_BACKGROUNDS: Record<Tone, string> = {
  verde:
    'radial-gradient(120% 120% at 88% 12%, rgba(47,125,82,0.38), rgba(30,58,47,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(242,183,5,0.12), rgba(22,32,26,0) 60%),' +
    '#1B3227',
  fucsia:
    'radial-gradient(120% 120% at 88% 12%, rgba(209,30,130,0.34), rgba(163,20,95,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(163,20,95,0.20), rgba(22,32,26,0) 60%),' +
    '#2A1220',
  miel:
    'radial-gradient(120% 120% at 88% 12%, rgba(242,183,5,0.30), rgba(201,134,14,0) 55%),' +
    'radial-gradient(90% 110% at 0% 100%, rgba(201,134,14,0.18), rgba(22,32,26,0) 60%),' +
    '#241B0E',
};

/* Falla el build, no la web, si un producto cambia o desaparece. */
const slides = heroSlides.map((slide) => {
  const product = getProductById(slide.productId);
  const [{ fromPrice, sizes }] = getProductGroups(getSizeVariants(product));

  return {
    ...slide,
    eyebrow: product.tags?.includes('new') ? 'Nuevo' : slide.eyebrow,
    title: getProductBaseTitle(product),
    url: getProductUrlById(slide.productId),
    bottle: getProductImage(product),
    priceLabel: sizes > 1 ? `Desde ${formatPrice(fromPrice)}` : formatPrice(product.price),
  };
});

type ResolvedSlide = (typeof slides)[number];

const getPhoto = (slide: HeroSlide) => slide.image ?? slide.video?.poster;

const pad = (value: number) => String(value).padStart(2, '0');

const arrowClass =
  'flex h-11 w-11 items-center justify-center rounded-[10px] bg-papel/10 text-papel backdrop-blur-sm transition duration-200 hover:bg-papel/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel active:scale-90';

const HeroVideo = ({ video, paused }: { video: NonNullable<HeroSlide['video']>; paused: boolean }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (paused) ref.current?.pause();
    else ref.current?.play().catch(() => undefined);
  }, [paused]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload='metadata'
      poster={video.poster}
      aria-hidden
      className='absolute inset-0 h-full w-full object-cover'
    >
      <source src={video.webm} type='video/webm' />
      <source src={video.mp4} type='video/mp4' />
    </video>
  );
};

type SlideBackgroundProps = { slide: ResolvedSlide; priority: boolean; videoPaused: boolean };

const SlideBackground = ({ slide, priority, videoPaused }: SlideBackgroundProps) => {
  const reduce = useReducedMotion();
  const photo = getPhoto(slide);

  return (
    <>
      <div className='absolute inset-0' style={{ background: TONE_BACKGROUNDS[slide.tone] }} />

      {/* En mobile ocupa el 4:5 superior; el texto va debajo, sobre el degradado. */}
      <div className='absolute inset-x-0 top-0 aspect-[4/5] lg:inset-0 lg:aspect-auto'>
        {slide.video && !reduce ? (
          <HeroVideo video={slide.video} paused={videoPaused} />
        ) : photo ? (
          <Image src={photo} alt={slide.title} fill priority={priority} sizes={PHOTO_SIZES} className='object-cover' />
        ) : (
          <div className='absolute inset-x-0 inset-y-6 lg:bottom-56 lg:left-auto lg:right-[8%] lg:top-8 lg:w-2/5'>
            <ToneHalo tone={slide.tone} animated={false} />
            <Image
              src={slide.bottle}
              alt={slide.title}
              fill
              priority={priority}
              sizes={BOTTLE_SIZES}
              className='object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)]'
            />
          </div>
        )}
      </div>
    </>
  );
};

export const HeroShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const cardsRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  const slide = slides[activeIndex];
  const nextSlide = slides[(activeIndex + 1) % slides.length];
  const nextPhoto = getPhoto(nextSlide);
  const paused = hovered || focused || pageHidden || userPaused;

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
    setHasChanged(true);
  };

  useEffect(() => {
    const handleVisibility = () => setPageHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  /* scrollTo y no scrollIntoView: el autoplay no debe mover la página. */
  useEffect(() => {
    const list = cardsRef.current;
    const card = list?.children[activeIndex] as HTMLElement | undefined;
    if (list && card) list.scrollTo({ left: card.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
  }, [activeIndex, reduce]);

  return (
    // La región solo recibe eventos que burbujean de sus controles.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      aria-roledescription='carrusel'
      aria-label='Sabores destacados'
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      /* Solo el foco de teclado pausa: tras un clic el foco se queda dentro y el autoplay no volvería. */
      onFocus={(e) => e.target.matches(':focus-visible') && setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      onKeyDown={(e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        goTo(activeIndex + (e.key === 'ArrowRight' ? 1 : -1));
      }}
      className='relative -mx-4 w-auto overflow-x-clip pt-4 tablet:mx-0 tablet:w-full tablet:pt-6 lg:py-10'
    >
      <div className='relative overflow-hidden bg-tinta tablet:rounded-panel'>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.productId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_SUAVE }}
            className='absolute inset-0'
          >
            <SlideBackground slide={slide} priority={activeIndex === 0} videoPaused={userPaused} />
          </motion.div>
        </AnimatePresence>

        {/* Precarga el fondo siguiente para que el fundido no muestre un hueco. */}
        <div aria-hidden className='absolute h-px w-px overflow-hidden opacity-0'>
          <Image
            src={nextPhoto ?? nextSlide.bottle}
            alt=''
            fill
            loading='eager'
            sizes={nextPhoto ? PHOTO_SIZES : BOTTLE_SIZES}
          />
        </div>

        <div
          aria-hidden
          className='absolute inset-0 hidden bg-gradient-to-r from-tinta/90 via-tinta/60 via-45% to-transparent lg:block'
        />

        <div className='relative flex flex-col gap-8 pb-6 lg:min-h-[44rem] lg:justify-between lg:gap-10 lg:p-12'>
          <div aria-hidden className='aspect-[4/5] lg:hidden' />

          <div
            role='group'
            aria-roledescription='diapositiva'
            aria-label={`${activeIndex + 1} de ${slides.length}`}
            aria-live={paused ? 'polite' : 'off'}
            className='px-6 tablet:px-10 lg:max-w-[38rem] lg:px-0'
          >
            <Stagger key={slide.productId} skipInitial={!hasChanged} className='flex flex-col items-start gap-5'>
              <Eyebrow variant='light'>{slide.eyebrow}</Eyebrow>
              <h2 className='text-balance font-display text-display font-semibold text-papel'>{slide.headline}</h2>
              <div className='flex flex-wrap gap-3'>
                <Button asChild variant='primary'>
                  <Link href={slide.url}>Ver producto</Link>
                </Button>
                <Button asChild variant='light'>
                  <Link href={getCategoryUrl(ProductCategory.PROBIOTICOS)}>Ver todos los kéfires</Link>
                </Button>
              </div>
            </Stagger>
          </div>

          <div className='flex flex-col gap-4 lg:ml-auto lg:w-full lg:max-w-[50rem]'>
            <div className='flex items-center justify-between gap-4 px-6 tablet:px-10 lg:px-0'>
              <div aria-hidden className='flex items-center gap-3 font-display text-sm font-semibold text-papel'>
                <span className='tabular-nums'>{pad(activeIndex + 1)}</span>
                <span className='h-0.5 w-24 overflow-hidden rounded-full bg-papel/25'>
                  {/* Único temporizador del autoplay. Sin animación (reduced motion) no hay autoplay y la barra indica la posición. */}
                  <span
                    key={activeIndex}
                    onAnimationEnd={() => goTo(activeIndex + 1)}
                    style={{
                      transform: `scaleX(${(activeIndex + 1) / slides.length})`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                    className='block h-full origin-left bg-miel motion-safe:animate-hero-progress'
                  />
                </span>
                <span className='tabular-nums'>{pad(slides.length)}</span>
              </div>

              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  aria-label={userPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
                  onClick={() => setUserPaused(!userPaused)}
                  className={`${arrowClass} motion-reduce:hidden`}
                >
                  {userPaused ? <Play className='h-5 w-5' /> : <Pause className='h-5 w-5' />}
                </button>
                <button
                  type='button'
                  aria-label='Sabor anterior'
                  onClick={() => goTo(activeIndex - 1)}
                  className={arrowClass}
                >
                  <ChevronLeft className='h-5 w-5' />
                </button>
                <button
                  type='button'
                  aria-label='Sabor siguiente'
                  onClick={() => goTo(activeIndex + 1)}
                  className={arrowClass}
                >
                  <ChevronRight className='h-5 w-5' />
                </button>
              </div>
            </div>

            <ul
              ref={cardsRef}
              className='relative flex snap-x scroll-pl-6 gap-3 overflow-x-auto px-6 pb-2 scrollbar-none tablet:px-10 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0'
            >
              {slides.map((item, index) => (
                <li key={item.productId} className='w-44 shrink-0 snap-start lg:w-auto'>
                  <FlavorCard
                    flavor={item.flavor}
                    image={item.bottle}
                    priceLabel={item.priceLabel}
                    url={item.url}
                    tone={item.tone}
                    active={index === activeIndex}
                    onSelect={() => goTo(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
