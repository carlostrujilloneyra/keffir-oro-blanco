import type { Metadata } from 'next';
import { allProducts, ProductCarousel } from '@/features/products';

export const metadata: Metadata = {
  title: 'Nuestros productos',
  description:
    'Catálogo completo de TRIALFERI: kéfir de leche, kéfires frutados, kéfir de agua, kombucha, chucrut y mermeladas artesanales. Sin conservantes.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <div className='container-max px-6 py-10 tablet:px-10 lg:px-18 lg:py-14'>
      <h1 className='mb-8 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'>
        Nuestros productos
      </h1>

      <ProductCarousel title='Todos los productos' products={allProducts} />
    </div>
  );
}
