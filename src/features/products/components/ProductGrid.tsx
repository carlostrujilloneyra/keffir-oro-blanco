'use client';

import { motion } from 'motion/react';
import { useStaggerVariants } from '@/components/ui/Motion/Motion';
import { ProductShowcaseCard } from './ProductShowcaseCard';
import type { Product } from '../types/product.type';
import type { ProductGroup } from '../data/collections';

type Props = { products: Product[]; groups?: never } | { groups: ProductGroup[]; products?: never };

export const ProductGrid = ({ products, groups }: Props) => {
  const { container, item } = useStaggerVariants({ stagger: 0.1, delay: 0.06, y: 28, duration: 0.7 });

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
