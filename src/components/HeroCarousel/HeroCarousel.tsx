import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { HeroSlide, HeroSlideProps } from './components/HeroSlide';
import rawSlides from './data/slidesData.json';
import 'swiper/css';

export const HeroCarousel = () => {
  const slides: HeroSlideProps[] = rawSlides;

  return (
    <section className='lg:container-max h-[600px] w-[calc(100%)] bg-gradient-to-r from-black via-[#2a2a2a] to-[#2e2e2e] px-6 py-8 md:h-[660px] md:px-10 md:py-6 lg:w-full lg:px-20 lg:py-20'>
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
