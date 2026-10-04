'use client';

import { type Product } from '@/features/products';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderNextButton, SliderPrevButton } from './SliderButtons';
import { useEffect, useState } from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { ProductShowcaseCard } from './ProductShowcaseCard';
import 'swiper/css';
import 'swiper/css/navigation';

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const SwiperNavButtons = () => {
  return (
    <>
      <SliderPrevButton />
      <SliderNextButton />
    </>
  );
};

export const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulamos la carga
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!products || products.length === 0) return null;

  const titleId = `carrusel-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <section aria-labelledby={titleId} className='w-full'>
      <h2 id={titleId} className='mb-8 font-display text-4xl leading-[1.05] tracking-tight text-tinta lg:text-5xl'>
        {title}
      </h2>

      <div className='relative'>
        <Swiper
          loop
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={550}
          className='transition-all duration-300 ease-in-out lg:!static'
          modules={[Navigation, FreeMode, Pagination, Autoplay]}
          slidesPerView={'auto'} // El ancho de cada slide lo define su CSS
          freeMode
          navigation={{
            prevEl: `.${title.replace(/\s+/g, '-')}-prev`,
            nextEl: `.${title.replace(/\s+/g, '-')}-next`,
          }}
          breakpoints={{
            600: {
              slidesPerView: 'auto',
            },

            1024: {
              slidesPerView: 'auto',
            },
          }}
        >
          {isLoading
            ? products.map((_, index) => (
                <SwiperSlide
                  key={`skeleton-${index}`}
                  className='max-w-64 flex-shrink-0 pr-4 tablet:max-w-[270px] tablet:pr-6'
                >
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className='max-w-64 flex-shrink-0 pr-4 tablet:max-w-[270px] tablet:pr-6'>
                  <ProductShowcaseCard product={product} />
                </SwiperSlide>
              ))}

          <SwiperNavButtons />
        </Swiper>
      </div>
    </section>
  );
};
