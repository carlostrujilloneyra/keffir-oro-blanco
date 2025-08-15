'use client';

import { ProductCard, type Product } from '@/features/products';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderNextButton, SliderPrevButton, useSwiperNavButtons } from './SliderButtons';
import { useEffect, useState } from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import 'swiper/css';
import 'swiper/css/navigation';

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const SwiperNavButtons = () => {
  const { isBeginning, isEnd } = useSwiperNavButtons();
  return (
    <>
      <SliderPrevButton isBeginning={isBeginning} />
      <SliderNextButton isEnd={isEnd} />
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

  if (!products) return null;

  return (
    <section className='lg:container-max w-full max-w-full px-6 py-4 tablet:px-10 tablet:py-9 lg:w-full lg:px-18 lg:py-12'>
      <h2 className='mb-5 text-center text-3xl text-[32px] font-bold text-gray-700 tablet:text-[40px] lg:text-[42px]'>
        {title}
      </h2>

      <div className='relative'>
        <Swiper
          autoplay={{
            delay: 2000,
          }}
          className='transition-all duration-300 ease-in-out lg:!static'
          modules={[Navigation, FreeMode, Pagination, Autoplay]}
          slidesPerView={'auto'} // El ancho de cada slide lo define su CSS
          freeMode={true}
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
                <SwiperSlide key={`skeleton-${index}`} className='max-w-64 flex-shrink-0 pr-4 tablet:pr-6'>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className='max-w-64 flex-shrink-0 pr-4 tablet:pr-6'>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}

          <SwiperNavButtons />
        </Swiper>
      </div>
    </section>
  );
};
