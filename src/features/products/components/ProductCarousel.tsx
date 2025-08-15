'use client';

import { ProductCard, type Product } from '@/features/products';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderNextButton, SliderPrevButton } from './SliderButtons';
import { useEffect, useState } from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { CardContent, CardFooter } from '@/components/ui/Card/card';
import {
  ProductCardAction,
  ProductCardCategory,
  ProductCardImage,
  ProductCardPresentations,
  ProductCardTitle,
} from './ProductCard';
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

  if (!products) return null;

  return (
    <section className='lg:container-max w-full max-w-full px-6 py-4 tablet:px-10 tablet:py-9 lg:w-full lg:px-18 lg:py-12'>
      <h2 className='mb-5 text-center text-3xl text-[32px] font-bold text-gray-700 tablet:text-[40px] lg:text-[42px]'>
        {title}
      </h2>

      <div className='relative'>
        <Swiper
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
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
                <SwiperSlide key={`skeleton-${index}`} className='max-w-64 flex-shrink-0 pr-4 tablet:pr-6'>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className='max-w-64 flex-shrink-0 pr-4 tablet:pr-6'>
                  <ProductCard>
                    <ProductCardImage src={product.thumbnailImage} alt={product.title} />

                    <CardContent className='mb-3 flex flex-grow flex-col pt-3'>
                      <ProductCardCategory category={product.category} />
                      <ProductCardTitle title={product.title} />

                      <div className='flex-grow'>
                        <ProductCardPresentations presentations={product?.presentations} />
                      </div>
                    </CardContent>

                    <CardFooter>
                      <ProductCardAction href={product.linkUrl} />
                    </CardFooter>
                  </ProductCard>
                </SwiperSlide>
              ))}

          <SwiperNavButtons />
        </Swiper>
      </div>
    </section>
  );
};
