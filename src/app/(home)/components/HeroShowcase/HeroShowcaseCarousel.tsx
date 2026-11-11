'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE_SUAVE, Stagger } from '@/components/ui/Motion/Motion';
import { CarouselControls } from './components/CarouselControls';
import { FlavorCard } from './components/FlavorCard';
import { BOTTLE_SIZES, MOBILE_MEDIA_HEIGHT, PHOTO_SIZES, SlideBackground } from './components/SlideBackground';
import { getSlideText } from './components/SlideText';
import { useHeroCarousel } from './hooks/useHeroCarousel';
import type { ResolvedHeroSlide } from './lib/resolveHeroSlides';

const TEXT_CLASS = 'flex flex-col items-start gap-5';

export const HeroShowcaseCarousel = ({ slides }: { slides: ResolvedHeroSlide[] }) => {
  const carousel = useHeroCarousel(slides.length);
  const { activeIndex, paused } = carousel;
  const cardsRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  /* scrollTo y no scrollIntoView: el autoplay no debe mover la página. */
  useEffect(() => {
    const list = cardsRef.current;
    const card = list?.children[activeIndex] as HTMLElement | undefined;
    if (list && card) list.scrollTo({ left: card.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
  }, [activeIndex, reduce]);

  if (slides.length === 0) return null;

  const slide = slides[activeIndex];
  const nextSlide = slides[(activeIndex + 1) % slides.length];
  const nextPhoto = nextSlide.photo?.src;

  return (
    <section
      aria-roledescription='carrusel'
      aria-label='Sabores destacados'
      {...carousel.regionHandlers}
      className='relative -mx-4 w-auto overflow-x-clip tablet:mx-0 tablet:w-full tablet:pt-6 lg:pb-10 lg:pt-4'
    >
      <div className='relative overflow-hidden bg-tinta tablet:rounded-panel'>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_SUAVE }}
            className='absolute inset-0'
          >
            <SlideBackground slide={slide} priority={activeIndex === 0} videoPaused={carousel.userPaused} />
          </motion.div>
        </AnimatePresence>

        {/* Precarga el fondo siguiente para que el fundido no muestre un hueco. */}
        <div aria-hidden className='absolute h-px w-px overflow-hidden opacity-0'>
          <Image
            src={nextPhoto ?? nextSlide.bottles[0].src}
            alt=''
            fill
            loading='eager'
            sizes={nextPhoto ? PHOTO_SIZES : BOTTLE_SIZES}
          />
        </div>

        <div className='relative flex flex-col gap-8 pb-6 lg:min-h-[47rem] lg:justify-between lg:gap-10 lg:p-12'>
          <div aria-hidden className={`${MOBILE_MEDIA_HEIGHT} lg:hidden`} />

          <div
            role='group'
            aria-roledescription='diapositiva'
            aria-label={`${activeIndex + 1} de ${slides.length}`}
            aria-live={paused ? 'polite' : 'off'}
            className='px-6 tablet:px-10 lg:my-auto lg:max-w-[min(38rem,50%)] lg:px-0'
          >
            {/* Todos los textos en la misma celda: el panel mide lo que el más largo y no salta al cambiar. */}
            <div className='grid [&>*]:col-start-1 [&>*]:row-start-1'>
              {slides.map((item) =>
                item === slide ? (
                  <Stagger key={item.id} skipInitial={!carousel.hasChanged} className={TEXT_CLASS}>
                    {getSlideText(item)}
                  </Stagger>
                ) : (
                  <div key={item.id} aria-hidden className={`invisible ${TEXT_CLASS}`}>
                    {getSlideText(item)}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <CarouselControls
              activeIndex={activeIndex}
              total={slides.length}
              paused={paused}
              userPaused={carousel.userPaused}
              onTogglePause={carousel.toggleUserPaused}
              onPrevious={carousel.previous}
              onNext={carousel.next}
              onAutoAdvance={carousel.advance}
            />

            <ul
              ref={cardsRef}
              className='relative flex snap-x scroll-pl-6 gap-3 overflow-x-auto px-6 pb-2 scrollbar-none tablet:px-10 lg:grid lg:auto-cols-fr lg:grid-flow-col lg:overflow-visible lg:px-0'
            >
              {slides.map((item, index) => (
                <li key={item.id} className='w-44 shrink-0 snap-start lg:w-auto'>
                  <FlavorCard
                    flavor={item.flavor}
                    thumbnail={item.thumbnail}
                    priceLabel={item.priceLabel}
                    url={item.url}
                    linkLabel={item.cardLinkLabel}
                    tone={item.tone}
                    active={index === activeIndex}
                    onSelect={() => carousel.goTo(index)}
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
