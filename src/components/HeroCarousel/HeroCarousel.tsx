import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { HeroSlide, HeroSlideProps } from './components/HeroSlide';
import rawSlides from './data/slidesData.json';
import 'swiper/css';

export const HeroCarousel = () => {
  const slides: HeroSlideProps[] = rawSlides;

  return (
    <section className='lg:container-max relative w-[calc(100%)] overflow-hidden bg-gradient-to-r from-black via-[#2a2a2a] to-[#2e2e2e] py-6 tablet:px-12 tablet:py-8 lg:w-full lg:py-12'>
      <Swiper
        loop
        autoplay={{ delay: 5000 }}
        speed={800}
        spaceBetween={20}
        slidesPerView={1}
        modules={[Autoplay]}
        className='h-full w-full transition-all duration-100 ease-in-out'
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.description}>
              <HeroSlide {...slide} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
