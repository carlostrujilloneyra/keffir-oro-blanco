import { ProductCarousel, recommendedCollection } from '@/features/products';

export default function ProductsPage() {
  return (
    <>
      <span>Página para productos</span>

      <ProductCarousel title='Productos recomendados' products={recommendedCollection} />
    </>
  );
}
