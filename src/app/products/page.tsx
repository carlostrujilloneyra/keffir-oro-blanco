import { ProductCard, recommendedCollection } from '@/features/products';
import { ProductCarousel } from '@/features/products/components/ProductCarousel';

export default function ProductsPage() {
  return (
    <>
      <span>Página para productos</span>
      {/* <ProductCard /> */}
      <ProductCarousel title='Productos recomendados' products={recommendedCollection} />
    </>
  );
}
