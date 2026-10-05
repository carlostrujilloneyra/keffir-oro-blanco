'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ProductShowcaseCard } from '@/features/products/components/ProductShowcaseCard';
import { type Product } from '@/features/products';

const EASE = [0.32, 0.72, 0, 1] as const;

export const ProductGrid = ({ products }: { products: Product[] }) => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.06 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

  return (
    <motion.ul
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-60px' }}
      className='grid grid-cols-2 gap-4 tablet:gap-5 md:grid-cols-3 lg:grid-cols-4'
    >
      {products.map((product) => (
        <motion.li key={product.id} variants={item} className='h-full'>
          <ProductShowcaseCard product={product} />
        </motion.li>
      ))}
    </motion.ul>
  );
};
