import Image from 'next/image';
import { Badge } from '@/components/ui/Badge/badge';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Reveal, Stagger } from '@/components/ui/Motion/Motion';
import { testimonialsArray, type Testimonial } from './data/testimonials.data';

const TestimonialNote = ({ testimonial }: { testimonial: Testimonial }) => (
  <figure className='flex h-full flex-col gap-6 rounded-card bg-papel-hueso p-6 lg:p-7'>
    {/* La frase destacada guía la lectura; el testimonio completo queda debajo, más suave. */}
    <blockquote className='flex flex-col gap-3'>
      <p className='font-display text-xl font-semibold leading-snug tracking-tight text-tinta lg:text-2xl'>
        “{testimonial.highlight}”
      </p>
      <p className='text-sm leading-relaxed text-tinta-media lg:text-[15px]'>{testimonial.quote}</p>
    </blockquote>

    <figcaption className='mt-auto flex flex-col gap-3 border-t border-papel-sombra/70 pt-5'>
      <div className='flex items-center gap-3'>
        <Image
          src={testimonial.src}
          alt=''
          width={56}
          height={56}
          className='h-12 w-12 shrink-0 rounded-[8px] object-cover'
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
    <Stagger inView className='mb-8 flex flex-col items-center gap-2 text-center lg:mb-12'>
      <Eyebrow>Testimonios</Eyebrow>
      <h2
        id='testimonios-titulo'
        className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'
      >
        Historias que nos inspiran
      </h2>
    </Stagger>

    {/* Móvil: fila deslizable (scroll-snap, sin JS) para no apilar una torre. Desktop: 3 columnas. */}
    <Reveal inView y={24}>
      <ul className='-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-none lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0'>
        {testimonialsArray.map((testimonial) => (
          <li key={testimonial.name} className='w-[85%] shrink-0 snap-start tablet:w-[60%] lg:w-auto'>
            <TestimonialNote testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </Reveal>
  </section>
);
