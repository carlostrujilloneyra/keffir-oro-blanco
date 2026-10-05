'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  src: string;
}

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  // Rotación leve y estable por card (no aleatoria en cada render).
  const rotateFor = (index: number) => [-4, 3, -2, 5, -3][index % 5];

  return (
    <div className='container-max mx-auto pt-12 antialiased'>
      <div className='relative grid grid-cols-1 items-center gap-10 min-[900px]:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
        {/* Pila de fotos */}
        <div className='flex justify-center'>
          <div className='relative h-[320px] w-60 tablet:h-[380px] tablet:w-72 lg:h-[460px] lg:w-[360px]'>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, rotate: rotateFor(index) }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.6,
                    scale: isActive(index) ? 1 : 0.94,
                    rotate: isActive(index) ? 0 : rotateFor(index),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -16, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, rotate: rotateFor(index) }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  className='absolute inset-0 origin-bottom'
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className='h-full w-full rounded-[24px] object-cover object-center shadow-hard'
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Contenido */}
        <div className='flex flex-col justify-center gap-8'>
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <span aria-hidden className='block font-display text-7xl leading-[0.4] text-verde/25'>
              &ldquo;
            </span>

            <motion.p className='mt-5 text-justify text-base leading-relaxed text-tinta-media lg:text-lg'>
              {testimonials[active].quote.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.015 * index }}
                  className='inline-block'
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            <div className='mt-6'>
              <h3 className='font-display text-xl font-semibold tracking-tight text-tinta lg:text-2xl'>
                {testimonials[active].name}
              </h3>
              <div className='mt-1.5 flex gap-0.5'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className='h-4 w-4 fill-miel text-miel' />
                ))}
              </div>
            </div>
          </motion.div>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium tabular-nums text-tinta-suave'>
              {active + 1} / {testimonials.length}
            </span>

            <div className='flex gap-3'>
              <button
                type='button'
                aria-label='Testimonio anterior'
                onClick={handlePrev}
                className='flex h-11 w-11 items-center justify-center rounded-full bg-bosque text-papel transition-colors duration-200 hover:bg-tinta'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
              <button
                type='button'
                aria-label='Testimonio siguiente'
                onClick={handleNext}
                className='flex h-11 w-11 items-center justify-center rounded-full bg-bosque text-papel transition-colors duration-200 hover:bg-tinta'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
