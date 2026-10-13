'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from './components/HeroSlide';
import { getProductById } from '@/features/products';
import { EASE_SUAVE } from '@/components/ui/Motion/Motion';
import { formatPrice } from '@/lib/formatPrice';
import rawSlides from './data/slidesData.json';
import 'swiper/css';
import 'swiper/css/pagination';

const AUTOPLAY_MS = 6500;

type HeroTone = 'verde' | 'miel' | 'frutos' | 'guisante';

/* Fondo de cada slide (glow arriba-derecha + glow abajo-izquierda + base oscura) y halo detrás de la botella. */
const HERO_TONES: Record<HeroTone, { background: string; glow: string }> = {
  verde: {
    background:
      'radial-gradient(120% 120% at 88% 12%, rgba(47,125,82,0.38), rgba(30,58,47,0) 55%),' +
      'radial-gradient(90% 110% at 0% 100%, rgba(242,183,5,0.12), rgba(22,32,26,0) 60%),' +
      '#1B3227',
    glow: 'bg-verde/25',
  },
  miel: {
    background:
      'radial-gradient(120% 120% at 88% 12%, rgba(242,183,5,0.30), rgba(201,134,14,0) 55%),' +
      'radial-gradient(90% 110% at 0% 100%, rgba(201,134,14,0.18), rgba(22,32,26,0) 60%),' +
      '#241B0E',
    glow: 'bg-miel/20',
  },
  frutos: {
    background:
      'radial-gradient(120% 120% at 88% 12%, rgba(209,30,130,0.34), rgba(163,20,95,0) 55%),' +
      'radial-gradient(90% 110% at 0% 100%, rgba(163,20,95,0.20), rgba(22,32,26,0) 60%),' +
      '#2A1220',
    glow: 'bg-fucsia/25',
  },
  /* Violeta de la kombucha de flor de guisante: solo para ese slide. */
  guisante: {
    background:
      'radial-gradient(120% 120% at 88% 12%, rgba(112,64,204,0.42), rgba(64,40,150,0) 55%),' +
      'radial-gradient(90% 110% at 0% 100%, rgba(64,40,150,0.24), rgba(22,32,26,0) 60%),' +
      '#1A1430',
    glow: 'bg-[#7040CC]/30',
  },
};

const isHeroTone = (tone: string | undefined): tone is HeroTone => !!tone && tone in HERO_TONES;

/*
  El JSON enlaza por productId: si el producto cambia o desaparece, falla el build y no la web.
  Precio, talla y "Nuevo" (tag 'new') salen del producto, no del JSON.
  TODO: manteca-1l → foto nueva con etiqueta TRIALFERI.
  TODO: kombucha-flor-de-guisante → foto real (hoy usa el placeholder del kéfir de agua).
*/
const slides = rawSlides.map(({ productId, tone, ...slide }) => {
  const product = getProductById(productId);
  const { background, glow } = HERO_TONES[isHeroTone(tone) ? tone : 'verde'];

  return {
    ...slide,
    slug: product.slug,
    isNew: product.tags?.includes('new') ?? false,
    meta: [product.size, formatPrice(product.price)].filter(Boolean).join(' · '),
    glow,
    background,
  };
});

const arrowClass =
  'flex h-11 w-11 items-center justify-center rounded-[10px] bg-papel/10 text-papel backdrop-blur-sm transition duration-200 hover:bg-papel/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel active:scale-90 active:bg-papel active:text-bosque';

export const HeroCarousel = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const reduce = useReducedMotion();

  return (
    <motion.section
      aria-roledescription='carrusel'
      aria-label='Productos destacados'
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 120 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.3 : 1.0, ease: EASE_SUAVE }}
      className='relative -mx-4 w-auto overflow-x-clip pt-4 tablet:mx-0 tablet:w-full tablet:pt-6 lg:py-10'
    >
      <div
        className='relative overflow-hidden rounded-none tablet:rounded-panel'
        style={{ background: HERO_TONES.verde.background }}
      >
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
          {/* h-auto: todos los slides se estiran al más alto y el fondo cubre el panel completo. */}
          {slides.map(({ background, ...slide }) => (
            <SwiperSlide key={slide.slug} style={{ background }} className='!h-auto'>
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
