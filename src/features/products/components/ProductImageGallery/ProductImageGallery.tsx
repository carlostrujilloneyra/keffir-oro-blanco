'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

interface ProductImageGalleryProps {
  images: string[];
  productTitle: string;
}

// Panel oscuro (bosque + glow verde): la botella clara resalta como héroe.
const PANEL_BG = 'radial-gradient(80% 80% at 50% 30%, rgba(47,125,82,0.40), rgba(30,58,47,0) 70%), #1E3A2F';

const IMG_SIZES = '(max-width: 1024px) 100vw, 50vw';

const BlurBackdrop = ({ src }: { src: string }) => (
  <Image src={src} alt='' aria-hidden fill sizes={IMG_SIZES} className='scale-125 object-cover blur-2xl' />
);

const ProductPhoto = ({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) => (
  <Image
    src={src}
    alt={alt}
    fill
    sizes={IMG_SIZES}
    className='object-contain p-4 drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] tablet:p-6'
    priority={priority}
  />
);

const arrowClass =
  'absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 text-papel backdrop-blur-md transition-colors duration-200 hover:bg-black/45 tablet:flex';

export function ProductImageGallery({ images, productTitle }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className='relative aspect-[4/5] w-full overflow-hidden rounded-panel' style={{ background: PANEL_BG }}>
        <BlurBackdrop src={images[0]} />
        <div className='absolute inset-0 bg-bosque/60' />
        <ProductPhoto src={images[0]} alt={productTitle} priority />
      </div>
    );
  }

  return (
    <div className='flex w-full min-w-0 flex-col gap-3 tablet:gap-4'>
      <div
        className='relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-panel'
        style={{ background: PANEL_BG }}
      >
        {images.map((image, index) => (
          <div
            key={image}
            aria-hidden
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === activeIndex ? 'opacity-45' : 'opacity-0'
            }`}
          >
            <BlurBackdrop src={image} />
          </div>
        ))}
        <div className='absolute inset-0 bg-bosque/60' />

        <Swiper
          className='absolute inset-0 h-full w-full'
          loop
          slidesPerView={1}
          speed={420}
          /* threshold: un scroll vertical algo diagonal no debe cambiar de foto. */
          threshold={8}
          grabCursor
          keyboard={{ enabled: true }}
          a11y={{ prevSlideMessage: 'Imagen anterior', nextSlideMessage: 'Imagen siguiente' }}
          modules={[A11y, Keyboard]}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image} className='relative h-full'>
              <ProductPhoto src={image} alt={`${productTitle} — imagen ${index + 1}`} priority={index === 0} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type='button'
          onClick={() => swiper?.slidePrev()}
          className={`${arrowClass} left-3`}
          aria-label='Imagen anterior'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>
        <button
          type='button'
          onClick={() => swiper?.slideNext()}
          className={`${arrowClass} right-3`}
          aria-label='Imagen siguiente'
        >
          <ChevronRight className='h-5 w-5' />
        </button>

        {/* Contador: en móvil sustituye a los puntos y no tapa la foto. */}
        <span className='absolute bottom-3 right-3 z-10 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-xs font-medium text-papel backdrop-blur-md'>
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Miniaturas: también en móvil (fila con scroll), no solo en tablet. */}
      <div className='-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        {images.map((image, index) => (
          <button
            key={image}
            type='button'
            onClick={() => swiper?.slideToLoop(index)}
            aria-label={`Ver imagen ${index + 1}`}
            aria-current={activeIndex === index}
            /* En móvil ancho fijo + scroll; desde tablet se reparten el ancho. */
            className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-papel-hueso transition-all duration-200 tablet:w-auto tablet:min-w-0 tablet:flex-1 tablet:shrink ${
              activeIndex === index ? 'border-verde' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={image}
              alt=''
              aria-hidden
              fill
              className='object-cover'
              sizes='(max-width: 768px) 64px, 100px'
            />
          </button>
        ))}
      </div>
    </div>
  );
}
