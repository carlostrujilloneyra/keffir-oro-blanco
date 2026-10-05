'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide, HeroSlideProps } from './components/HeroSlide';
import rawSlides from './data/slidesData.json';
import 'swiper/css';
import 'swiper/css/pagination';

const AUTOPLAY_MS = 2800;

const HERO_BG =
  'radial-gradient(120% 120% at 88% 12%, rgba(47,125,82,0.38), rgba(30,58,47,0) 55%),' +
  'radial-gradient(90% 110% at 0% 100%, rgba(242,183,5,0.12), rgba(22,32,26,0) 60%),' +
  '#1B3227';

const arrowClass =
  'flex h-11 w-11 items-center justify-center rounded-full border border-papel/30 bg-papel/10 text-papel backdrop-blur-sm transition duration-200 hover:bg-papel/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel active:scale-90 active:bg-papel active:text-bosque';

const EASE = [0.32, 0.72, 0, 1] as const;

export const HeroCarousel = () => {
  const slides: HeroSlideProps[] = rawSlides;
  const swiperRef = useRef<SwiperClass | null>(null);
  const reduce = useReducedMotion();

  return (
    <motion.section
      aria-roledescription='carrusel'
      aria-label='Productos destacados'
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 120 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.3 : 1.0, ease: EASE }}
      className='relative -mx-4 w-auto overflow-x-clip pt-4 tablet:mx-0 tablet:w-full tablet:pt-6 lg:py-10'
    >
      <div className='relative overflow-hidden rounded-none tablet:rounded-panel' style={{ background: HERO_BG }}>
        <Swiper
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          loop
          slidesPerView={1}
          speed={950}
          autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: true }}
          threshold={8}
          simulateTouch={false}
          pagination={{ clickable: true }}
          a11y={{ paginationBulletMessage: 'Ir al producto {{index}}' }}
          modules={[A11y, Autoplay, Pagination]}
          className='h-full w-full [--swiper-pagination-bottom:1.25rem] [--swiper-pagination-bullet-inactive-color:#F7F5EF] [--swiper-pagination-bullet-inactive-opacity:0.35] [--swiper-pagination-color:#F2B705]'
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.slug}>
              <HeroSlide {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className='absolute bottom-5 right-6 z-20 hidden items-center gap-2 lg:flex'>
          <button
            type='button'
            aria-label='Producto anterior'
            onClick={() => swiperRef.current?.slidePrev()}
            className={arrowClass}
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            type='button'
            aria-label='Producto siguiente'
            onClick={() => swiperRef.current?.slideNext()}
            className={arrowClass}
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </div>
      </div>
    </motion.section>
  );
};
