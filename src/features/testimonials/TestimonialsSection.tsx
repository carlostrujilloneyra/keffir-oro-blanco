import { AnimatedTestimonials } from '@/components/ui/AnimatedTestimonials/animated-testimonials';
import { testimonialsArray } from './data/testimonials.data';

export const TestimonialsSection = () => {
  return (
    <section className='w-full px-6 py-8 tablet:p-10 lg:p-18'>
      <h2 className='text-center text-[32px] font-semibold text-gray-800 tablet:text-[40px]'>
        Historias que nos inspiran
      </h2>
      <AnimatedTestimonials testimonials={testimonialsArray} />
    </section>
  );
};
