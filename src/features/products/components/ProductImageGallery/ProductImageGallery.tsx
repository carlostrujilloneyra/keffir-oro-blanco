'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

interface ProductImageGalleryProps {
  images: string[];
  productTitle: string;
}

export function ProductImageGallery({ images, productTitle }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Si no hay imágenes, no mostrar nada
  if (!images || images.length === 0) {
    return null;
  }

  // Si solo hay una imagen, mostrar sin carrusel
  if (images.length === 1) {
    return (
      <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
        <Image src={images[0]} alt={productTitle} fill className='object-contain' priority />
      </div>
    );
  }

  const handleThumbnailClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  return (
    <div className='flex flex-col gap-8 tablet:gap-10'>
      {/* Carrusel principal */}
      <div className='relative'>
        <Swiper
          loop
          autoplay={{
            delay: 3200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={520}
          modules={[Navigation, FreeMode, Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          slidesPerView={'auto'}
          className='product-image-gallery transition-all duration-300 ease-in-out lg:!static'
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
                <Image
                  src={image}
                  alt={`${productTitle} - imagen ${index + 1}`}
                  fill
                  className='rounded-md object-contain'
                  priority={index === 0}
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Flechas de navegación */}
        <button
          type='button'
          onClick={() => swiperInstance?.slidePrev()}
          className='absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-lg transition-all hover:scale-110 hover:bg-primary-hover active:scale-95 tablet:h-10 tablet:w-10'
          aria-label='Imagen anterior'
        >
          <ChevronLeft className='h-6 w-6 text-gray-100' />
        </button>

        <button
          type='button'
          onClick={() => swiperInstance?.slideNext()}
          className='absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-lg transition-all hover:scale-110 hover:bg-primary-hover active:scale-95 tablet:h-10 tablet:w-10'
          aria-label='Imagen siguiente'
        >
          <ChevronRight className='h-6 w-6 text-gray-100' />
        </button>
      </div>

      {/* Miniaturas clickeables */}
      <div className='hidden grid-cols-4 gap-2 p-3 tablet:grid tablet:grid-cols-6'>
        {images.map((image, index) => (
          <button
            key={index}
            type='button'
            className={`relative aspect-square h-18 w-18 overflow-hidden rounded-md bg-gray-100 transition-all ${
              activeIndex === index ? 'ring-2 ring-gray-800 ring-offset-2' : 'opacity-60 hover:opacity-100'
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={image}
              alt={`${productTitle} - miniatura ${index + 1}`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 25vw, 20vw'
            />
          </button>
        ))}
      </div>
    </div>
  );
}
