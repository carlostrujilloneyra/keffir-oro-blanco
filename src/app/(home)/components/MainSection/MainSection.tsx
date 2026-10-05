'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { getProductById, promotedCollection } from '@/features/products';
import { ProductShelfItem } from '@/features/products/components/ProductShelfItem';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { FeaturedCard } from './components/FeaturedCard';

const EASE = [0.32, 0.72, 0, 1] as const;
const shelf = [getProductById('manteca-1l'), ...promotedCollection];

export const MainSection = () => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.05 } },
  };

  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };

  return (
    <motion.section
      aria-labelledby='destacados-titulo'
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-80px' }}
      className='w-full py-6 tablet:py-8 lg:py-10'
    >
      <motion.div variants={item} className='mb-6 flex flex-col gap-2 tablet:mb-8 lg:mb-10'>
        <Eyebrow>Nuestra selección</Eyebrow>

        <h2
          id='destacados-titulo'
          className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta tablet:text-4xl lg:text-5xl'
        >
          Por dónde empezar
        </h2>
      </motion.div>

      {/* 1 destacado (el punto de partida) + estante de 3 productos. */}
      <div className='grid gap-5 tablet:gap-6 lg:grid-cols-[1.15fr_1fr]'>
        <motion.div variants={item}>
          <FeaturedCard
            eyebrow='Probióticos'
            title='Descubre si el Kéfir es para ti'
            linkUrl='#faq'
            ctaLabel='Conoce el kéfir'
            imageSrc='/assets/images/content/products/kefir-de-leche/featured.webp'
            imageAlt='Kéfir de leche artesanal'
          />
        </motion.div>

        <ul className='grid gap-3 tablet:gap-4'>
          {shelf.map((product) => (
            <motion.li key={product.id} variants={item}>
              <ProductShelfItem product={product} />
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};
