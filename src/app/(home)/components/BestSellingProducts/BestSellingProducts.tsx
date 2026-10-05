'use client';

import { bestSellersCollection } from '@/features/products';
import { ProductShowcaseCard } from '@/features/products/components/ProductShowcaseCard';
import { CoverflowCarousel } from '@/components/ui/CoverflowCarousel/CoverflowCarousel';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

export const BestSellingProducts = () => {
  return (
    <section aria-labelledby='mas-vendidos-titulo' className='w-full py-6 tablet:py-8 lg:py-10'>
      <div className='flex flex-col items-center'>
        <div className='mb-10 flex flex-col items-center gap-2 text-center lg:mb-12'>
          <Eyebrow>Favoritos de la casa</Eyebrow>

          <h2
            id='mas-vendidos-titulo'
            className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'
          >
            Productos más vendidos
          </h2>
        </div>

        <CoverflowCarousel
          products={bestSellersCollection}
          renderCard={(product, isCenter) => (
            <ProductShowcaseCard product={product} highlighted={isCenter} asLink={false} />
          )}
        />
      </div>
    </section>
  );
};
