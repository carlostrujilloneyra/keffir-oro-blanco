import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge/badge';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { testimonialsArray, type Testimonial } from './data/testimonials.data';

const TestimonialNote = ({ testimonial, featured = false }: { testimonial: Testimonial; featured?: boolean }) => (
  <figure
    className={cn(
      'flex h-full flex-col justify-between gap-6 rounded-card bg-papel-hueso',
      featured ? 'p-6 tablet:p-8 lg:p-10' : 'p-6',
    )}
  >
    <blockquote>
      <p
        className={cn(
          'leading-relaxed text-tinta',
          featured
            ? 'font-display text-lg font-medium tracking-tight tablet:text-xl lg:text-2xl lg:leading-snug'
            : 'text-sm tablet:text-[15px]',
        )}
      >
        “{testimonial.quote}”
      </p>
    </blockquote>

    <figcaption className='flex flex-col gap-3'>
      <div className='flex items-center gap-3'>
        <Image
          src={testimonial.src}
          alt=''
          width={56}
          height={56}
          className={cn('shrink-0 rounded-[8px] object-cover', featured ? 'h-14 w-14' : 'h-11 w-11')}
        />
        <span className='font-display text-base font-semibold text-tinta lg:text-lg'>{testimonial.name}</span>
      </div>

      {testimonial.mentions && (
        <ul aria-label='Productos que menciona' className='flex flex-wrap gap-1.5'>
          {testimonial.mentions.map((product) => (
            <li key={product}>
              <Badge variant='category'>{product}</Badge>
            </li>
          ))}
        </ul>
      )}
    </figcaption>
  </figure>
);

export const TestimonialsSection = () => (
  <section aria-labelledby='testimonios-titulo' className='w-full bg-papel py-8 md:py-12'>
    <div className='mb-8 flex flex-col items-center gap-2 text-center lg:mb-12'>
      <Eyebrow>Testimonios</Eyebrow>
      <h2
        id='testimonios-titulo'
        className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'
      >
        Historias que nos inspiran
      </h2>
    </div>

    {/* Móvil: fila deslizable (scroll-snap, sin JS) para no apilar una torre.
      Desktop: grilla con el primero destacado a la izquierda. */}
    <ul className='-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-none lg:mx-0 lg:grid lg:grid-cols-[1.2fr_1fr] lg:grid-rows-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0'>
      {testimonialsArray.map((testimonial, index) => (
        <li
          key={testimonial.name}
          className={cn('w-[85%] shrink-0 snap-start tablet:w-[60%] lg:w-auto', index === 0 && 'lg:row-span-2')}
        >
          <TestimonialNote testimonial={testimonial} featured={index === 0} />
        </li>
      ))}
    </ul>
  </section>
);
