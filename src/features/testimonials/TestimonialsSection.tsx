import { AnimatedTestimonials } from '@/components/ui/AnimatedTestimonials/animated-testimonials';
import { testimonialsArray } from './data/testimonials.data';

export const TestimonialsSection = () => {
  return (
    <section className='w-full overflow-hidden px-6 py-8 tablet:p-10 lg:p-18 lg:pb-24'>
      <h2 className='text-center text-[32px] font-semibold leading-[1.1] text-gray-800 tablet:text-[40px] lg:mb-5'>
        Historias que nos inspiran
      </h2>

      <AnimatedTestimonials testimonials={testimonialsArray} />
    </section>
  );
};
