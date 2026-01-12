import { bestSellersCollection, ProductCarousel } from '@/features/products';

export const BestSellingProducts = () => {
  return (
    <section className='lg:container-max mt-20 w-full max-w-full px-6 py-8 tablet:p-10 lg:mt-1 lg:w-full lg:p-18'>
      <ProductCarousel title='Productos más vendidos' products={bestSellersCollection} />
    </section>
  );
};
