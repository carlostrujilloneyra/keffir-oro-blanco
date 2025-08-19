import { bestSellersCollection, ProductCarousel } from '@/features/products';

export const BestSellingProducts = () => {
  return <ProductCarousel title='Productos más vendidos' products={bestSellersCollection} />;
};
