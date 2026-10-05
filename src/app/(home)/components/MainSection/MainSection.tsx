'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { getProductById, promotedCollection } from '@/features/products';
import { getProductUrl } from '@/lib/getProductUrl';
import { PromoProductCard } from '@/features/products/components/PromoProductCard';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { CategoryCard } from './components/CategoryCard';

const EASE = [0.32, 0.72, 0, 1] as const;
const featuredLard = getProductById('manteca-1l');

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
        <Eyebrow className='text-xs tracking-[0.18em]' dotClassName='h-2 w-2'>
          Nuestra selección
        </Eyebrow>

        <h2
          id='destacados-titulo'
          className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta tablet:text-4xl lg:text-5xl'
        >
          Por dónde empezar
        </h2>
      </motion.div>

      <div className='grid gap-5 tablet:gap-6 lg:grid-cols-[1fr_.9fr]'>
        <ul className='grid gap-5 tablet:gap-6'>
          <motion.li variants={item}>
            <CategoryCard
              eyebrow='Probióticos'
              title='Descubre si el Kéfir es para ti'
              linkUrl='#faq'
              ctaLabel='Conoce el kéfir'
              imageSrc='/assets/images/content/products/kefir-de-leche/featured.webp'
              imageAlt='Kéfir de leche artesanal'
              theme='verde'
            />
          </motion.li>

          <motion.li variants={item}>
            <CategoryCard
              eyebrow='Tradicional'
              title='Sabor y tradición: Manteca de Cerdo Artesanal'
              linkUrl={getProductUrl(featuredLard.slug)}
              ctaLabel='Ver manteca'
              imageSrc='/assets/images/categories/manteca-de-cerdo.webp'
              imageAlt='Manteca de cerdo artesanal'
              theme='miel'
            />
          </motion.li>
        </ul>

        {/* Productos destacados (derecha) */}
        <ul className='grid gap-5 tablet:grid-cols-2 tablet:gap-6'>
          {promotedCollection.map((product) => (
            <motion.li key={product.id} variants={item} className='h-full'>
              <PromoProductCard product={product} />
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};
