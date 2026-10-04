import { AnimatedTestimonials } from '@/components/ui/AnimatedTestimonials/animated-testimonials';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { testimonialsArray } from './data/testimonials.data';

export const TestimonialsSection = () => {
  return (
    <section
      aria-labelledby='testimonios-titulo'
      className='w-full overflow-hidden bg-papel px-4 py-6 tablet:p-8 lg:px-12 lg:py-10'
    >
      <div className='container-max flex flex-col items-center gap-2 text-center'>
        <Eyebrow className='text-xs tracking-[0.18em]' dotClassName='h-2 w-2'>
          Testimonios
        </Eyebrow>
        <h2
          id='testimonios-titulo'
          className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'
        >
          Historias que nos inspiran
        </h2>
      </div>

      <AnimatedTestimonials testimonials={testimonialsArray} autoplay />
    </section>
  );
};
