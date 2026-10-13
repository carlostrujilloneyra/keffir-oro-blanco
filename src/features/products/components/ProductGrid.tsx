'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ProductShowcaseCard } from '@/features/products/components/ProductShowcaseCard';
import { type Product, type ProductGroup } from '@/features/products';

const EASE = [0.32, 0.72, 0, 1] as const;

type Props = { products: Product[]; groups?: never } | { groups: ProductGroup[]; products?: never };

export const ProductGrid = ({ products, groups }: Props) => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.06 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

  const cards = groups
    ? groups.map(({ product, fromPrice, sizes }) => ({
        product,
        fromPrice: sizes > 1 ? fromPrice : undefined,
        hideSize: sizes > 1,
      }))
    : products.map((product) => ({ product, fromPrice: undefined, hideSize: false }));

  return (
    <motion.ul
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-60px' }}
      className='grid grid-cols-2 gap-4 tablet:gap-5 md:grid-cols-3 lg:grid-cols-4'
    >
      {cards.map(({ product, fromPrice, hideSize }) => (
        <motion.li key={product.id} variants={item} className='h-full'>
          <ProductShowcaseCard product={product} fromPrice={fromPrice} hideSize={hideSize} />
        </motion.li>
      ))}
    </motion.ul>
  );
};
