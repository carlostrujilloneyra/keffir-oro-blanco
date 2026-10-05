import { ProductShowcaseCard } from '@/features/products/components/ProductShowcaseCard';
import { type Product } from '@/features/products';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

interface RelatedProductsProps {
  products: Product[];
}

/* Productos relacionados al final de la ficha (misma categoría). */
export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section
      aria-labelledby='relacionados-titulo'
      className='mt-16 border-t border-papel-sombra pt-12 lg:mt-24 lg:pt-16'
    >
      <div className='mb-8 flex flex-col gap-2 lg:mb-10'>
        <Eyebrow className='text-xs tracking-[0.18em]' dotClassName='h-2 w-2'>
          También te puede gustar
        </Eyebrow>
        <h2
          id='relacionados-titulo'
          className='font-display text-3xl font-semibold tracking-tight text-tinta lg:text-4xl'
        >
          Descubre más
        </h2>
      </div>

      {/* Colección de productos → <ul>: el lector de pantalla anuncia cuántos hay. */}
      <ul className='grid grid-cols-2 gap-4 tablet:gap-5 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <li key={product.id}>
            <ProductShowcaseCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
