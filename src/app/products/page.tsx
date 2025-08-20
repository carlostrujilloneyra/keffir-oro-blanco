import { allProducts, ProductCarousel } from '@/features/products';

export default function ProductsPage() {
  return (
    <>
      <span>Página para productos</span>

      <ProductCarousel title='Todos los productos' products={allProducts} />
    </>
  );
}
