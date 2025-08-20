'use client';

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

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

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className='mx-auto px-4 pt-9 antialiased tablet:px-8 lg:px-12'>
      <div className='relative grid grid-cols-1 gap-7 min-[900px]:grid-cols-2 lg:gap-9'>
        <div className='flex justify-center'>
          <div className='relative h-[400px] w-80 lg:h-[480px] lg:w-[360px]'>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,

                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  className='absolute inset-0 origin-bottom'
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className='h-full w-full rounded-3xl object-cover object-center'
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className='flex flex-col justify-center gap-6 tablet:gap-8'>
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            <h3 className='text-[28px] font-bold text-gray-700 tablet:text-[32px] lg:mb-2 lg:text-4xl'>
              {testimonials[active].name}
            </h3>

            <motion.p className='text-justify text-sm leading-[1.4] text-gray-600 lg:text-[15px]'>
              {testimonials[active].quote.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 0.02 * index,
                  }}
                  className='inline-block'
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className='flex items-center justify-between'>
            <Button asChild theme='primary'>
              <Link className='flex max-w-max items-center gap-2 px-7 py-3 uppercase' href={''} target='_blank'>
                <span>Ver tiktok</span>
                <ExternalLink className='h-4 w-4' />
              </Link>
            </Button>

            <div className='order-5 flex gap-4'>
              <button
                onClick={handlePrev}
                className='group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-800'
              >
                <IconArrowLeft className='h-5 w-5 text-light-200 transition-transform duration-300' />
              </button>

              <button
                onClick={handleNext}
                className='group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-800'
              >
                <IconArrowRight className='h-5 w-5 text-light-200 transition-transform duration-300' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
