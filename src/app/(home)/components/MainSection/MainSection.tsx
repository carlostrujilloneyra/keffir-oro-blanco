'use client';

import { motion } from 'motion/react';
import { useStaggerVariants } from '@/components/ui/Motion/Motion';
import { getProductById, promotedCollection } from '@/features/products';
import { ProductShelfItem } from '@/features/products/components/ProductShelfItem';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

const shelf = [getProductById('manteca-1l'), ...promotedCollection];

export const MainSection = () => {
  const { container, item } = useStaggerVariants({ stagger: 0.12, delay: 0.05, y: 28, duration: 0.6 });

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

      <ul className='grid gap-3 tablet:grid-cols-2 tablet:gap-4 lg:grid-cols-3'>
        {shelf.map((product) => (
          <motion.li key={product.id} variants={item}>
            <ProductShelfItem product={product} />
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
};
